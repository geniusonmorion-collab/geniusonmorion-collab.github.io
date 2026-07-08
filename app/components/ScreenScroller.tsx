"use client";

import { useEffect } from "react";

// Механика перелистывания экранов — порт с rwb.ru (их константы и функции)
const SCENE_SCROLL_MS = 1000;
const MANUAL_SCROLL_SNAP_MS = 500;
const SNAP_EPS_PX = 4;
const TABLET_MAX_WIDTH = 932;

function animateScrollTo(target: number, duration: number, done?: () => void) {
  const start = window.scrollY;
  const delta = target - start;
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    const eased = 0.5 - Math.cos(Math.PI * p) / 2;
    window.scrollTo(0, start + delta * eased);
    if (p < 1) requestAnimationFrame(step);
    else done?.();
  };
  requestAnimationFrame(step);
}

// Аккумулятор дельт колеса: мышь и тачпад имеют разные пороги;
// тачпад распознаётся по частым событиям с малой дельтой
function createWheelDirection({ mouseThreshold = 40, touchpadThreshold = 200 } = {}) {
  let isTouchpad = false;
  let lastTime = 0;
  let acc = 0;
  return {
    nextDirection(e: WheelEvent): number {
      const now = e.timeStamp;
      const dt = now - lastTime;
      lastTime = now;
      if (dt < 50 && Math.abs(e.deltaY) < 100) isTouchpad = true;
      else if (dt > 150) {
        isTouchpad = false;
        acc = 0;
      }
      acc += e.deltaY;
      if (Math.abs(acc) < (isTouchpad ? touchpadThreshold : mouseThreshold)) return 0;
      const dir = acc > 0 ? 1 : -1;
      acc = 0;
      return dir;
    },
  };
}

function closestIndex(y: number, points: number[]) {
  let best = 0;
  let dist = Math.abs(y - points[0]);
  for (let i = 1; i < points.length; i++) {
    const d = Math.abs(y - points[i]);
    if (d < dist) {
      dist = d;
      best = i;
    }
  }
  return best;
}

export default function ScreenScroller() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const mq = window.matchMedia(`(min-width: ${TABLET_MAX_WIDTH + 1}px)`);
    let destroy: (() => void) | null = null;
    let animating = false;
    let lastIndex = 0;

    const enable = () => {
      if (destroy) return;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main > section")
      );
      if (!sections.length) return;
      const dirTracker = createWheelDirection();
      // секция может быть выше экрана (сдвоенные сцены) — каждая полная
      // высота вьюпорта внутри неё становится отдельной точкой перелистывания
      const points = () => {
        const vh = window.innerHeight;
        const pts: number[] = [];
        for (const s of sections) {
          const steps = Math.max(1, Math.round(s.offsetHeight / vh));
          for (let k = 0; k < steps; k++) pts.push(s.offsetTop + k * vh);
        }
        return pts;
      };

      const go = (idx: number, ms: number, pts = points()) => {
        if (idx < 0 || idx >= pts.length) return;
        animating = true;
        animateScrollTo(pts[idx], ms, () => {
          animating = false;
          lastIndex = idx;
        });
      };

      const onWheel = (e: WheelEvent) => {
        if (e.ctrlKey) {
          // pinch-zoom не блокируем, кроме момента анимации
          if (animating) e.preventDefault();
          return;
        }
        if (animating) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        const dir = dirTracker.nextDirection(e);
        if (!dir) return;
        const pts = points();
        const cur = closestIndex(window.scrollY, pts);
        go(cur + dir, SCENE_SCROLL_MS, pts);
      };

      // Перетаскивание скроллбара: после отпускания — доснап к ближайшему экрану
      let draggingScrollbar = false;
      const onMouseDown = (e: MouseEvent) => {
        const sw = window.innerWidth - document.documentElement.clientWidth;
        if (sw > 0 && e.clientX >= window.innerWidth - sw) draggingScrollbar = true;
      };
      const onMouseUp = () => {
        if (!draggingScrollbar) return;
        draggingScrollbar = false;
        const pts = points();
        const cur = closestIndex(window.scrollY, pts);
        if (Math.abs(window.scrollY - pts[cur]) <= SNAP_EPS_PX) {
          lastIndex = cur;
          return;
        }
        go(cur, MANUAL_SCROLL_SNAP_MS, pts);
      };

      const onResize = () => {
        window.scrollTo(0, points()[lastIndex] ?? 0);
      };

      // Якорные ссылки листаем той же анимацией
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute("href")!.slice(1);
        const el = id ? document.getElementById(id) : null;
        if (!el) {
          // ссылки-заглушки href="#" не должны дёргать страницу к началу
          if (!id) e.preventDefault();
          return;
        }
        e.preventDefault();
        const pts = points();
        go(closestIndex(el.offsetTop, pts), SCENE_SCROLL_MS, pts);
      };

      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("resize", onResize, { passive: false });
      document.addEventListener("click", onClick);

      destroy = () => {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("click", onClick);
      };
    };

    const disable = () => {
      destroy?.();
      destroy = null;
    };

    const onChange = (e: MediaQueryListEvent) =>
      e.matches ? enable() : disable();

    if (mq.matches) enable();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      disable();
    };
  }, []);

  return null;
}
