"use client";

import { useEffect, useRef } from "react";

// Сдвоенный экран «Кому полезно» → «Боли 01–04»: секция в 2 экрана скролла,
// но сцена закреплена (sticky) — экран визуально статичен, как intro на rwb.ru
// (у них фон position:fixed, а к скроллу привязан GSAP-scrub).
// Фон — их родной градиент .intro__bg: linear-gradient(#000 20%, #287a99 71%, #a9d0de 100%).
// При переходе: заголовок блюрится и приподнимается в «призрак» из макета
// (blur 9.3px, opacity 0.28, верх на −0.2vh); текст болей, как их
// intro__description, заранее чуть виден ниже своего места (opacity .3, blur 4px)
// и при переходе поднимается и проявляется.
// Боли согласованы с докладами программы: 01 → Галицкий (масштаб),
// 02 → Ким (процессы/контроль), 03 → Иванова (команда), 04 — универсальная,
// мостик к заголовку «выросли из ручного управления»
const PAINS = [
  {
    num: "01",
    numTop: "24.2%",
    title: "То, что работало на 5 млн, ломается на 50",
    titleTop: "23.3%",
    titleBold: true,
    titleWidth: 475,
    desc: "Процессы, которые вывезли старт, начинают разваливать бизнес при масштабе",
    descTop: "33.6%",
    descWidth: 430,
  },
  {
    num: "02",
    numTop: "40.1%",
    title: "Прибыль не растёт вслед за оборотом",
    titleTop: "40.1%",
    titleWidth: 475,
    desc: "Продажи есть, а маржа тает где-то между закупкой, логистикой и рекламой",
    descTop: "49.7%",
    descWidth: 369,
  },
  {
    num: "03",
    numTop: "61.2%",
    title: "Команда работает на пределе",
    titleTop: "61.2%",
    desc: 'Каждое решение всё ещё проходит через вас — делегировать страшно, потому что никто не сделает "как надо"',
    descTop: "66.6%",
    descWidth: 415,
  },
  {
    num: "04",
    numTop: "80.6%",
    title: "Вы — узкое место своего бизнеса",
    titleTop: "80.6%",
    titleWidth: 620,
    desc: "Закупки, реклама, поставки — всё через вас, и на стратегию времени не остаётся",
    descTop: "85.9%",
    descWidth: 400,
  },
];

// Вертикальный сдвиг правой колонки болей вниз относительно позиций макета
const PAINS_OFFSET_PX = 60;

// Направление фона сцены. "light-top" — светлый верх → тёмный низ (пробный
// вариант); ОТКАТ: поставить "dark-top" (тёмный верх → светлый низ, как intro
// rwb.ru) и в Program.tsx переключить SEAM_COLOR на "#287a99".
type BgDirection = "light-top" | "dark-top";
const BG_DIRECTION: BgDirection = "light-top";
const BG: Record<BgDirection, string> = {
  "dark-top":
    "linear-gradient(#000 20%, #287a99 71%, #a9d0de 90%, #287a99 100%)",
  "light-top": "linear-gradient(#287a99 0%, #000 80%)",
};

export default function AudiencePains() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const painsRef = useRef<HTMLDivElement>(null);
  const lastPainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const pains = painsRef.current;
    if (!section || !title || !pains) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const p = Math.min(
        1,
        Math.max(0, (window.scrollY - section.offsetTop) / vh)
      );
      title.style.transform = `translate3d(0, ${(-0.457 * vh * p).toFixed(1)}px, 0)`;
      title.style.filter = `blur(${(9.3 * p).toFixed(2)}px)`;
      title.style.opacity = String(1 - 0.72 * p);
      pains.style.opacity = String(0.3 + 0.7 * p);
      pains.style.filter = `blur(${(4 * (1 - p)).toFixed(2)}px)`;
      pains.style.transform = `translate3d(0, ${(0.36 * vh * (1 - p)).toFixed(1)}px, 0)`;
      // нижний блок 04 до скролла размыт сильнее остальных — «растворён»,
      // проявляется вместе с общим скраб-прогрессом
      const last = lastPainRef.current;
      if (last) {
        last.style.filter = `blur(${(12 * (1 - p)).toFixed(2)}px)`;
        last.style.opacity = String(0.35 + 0.65 * p);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="audience"
      ref={sectionRef}
      className="relative h-[200svh] min-h-[1560px]"
    >
      <div
        className="sticky top-0 h-svh min-h-[780px] overflow-hidden"
        style={{ background: BG[BG_DIRECTION] }}
      >
        {/* заголовок, уходящий в «призрак» */}
        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-0 will-change-transform"
        >
          {/* подпись: капс 20px bold, трекинг −4% (−0.8px), 60%;
              нижний край в 20px от верха большого заголовка */}
          <p
            className="absolute left-[32px] text-[20px] font-bold uppercase leading-none tracking-[-0.8px] text-white opacity-60"
            style={{ top: "calc(25.7% - 40px)" }}
          >
            Кому будет полезно
          </p>
          {/* типографика заголовка — из макета (нода 1291:576): 80/80 ExtraBold
              капсом, трекинг −2.4px, переносы фиксированные в 3 строки */}
          <h2 className="font-display absolute left-[30px] top-[25.7%] w-[1179px] text-[80px] font-extrabold uppercase leading-[80px] tracking-[-2.4px] text-white">
            Для селлеров,
            <br />
            которые выросли
            <br />
            из ручного управления
          </h2>
        </div>

        {/* боли: заранее чуть видны ниже своего места, поднимаются и проявляются */}
        <div
          ref={painsRef}
          className="absolute inset-0 opacity-30 blur-[4px] will-change-transform"
        >
          {PAINS.map((pain, i) => (
            // absolute inset-0: у последнего блока свой filter (containing
            // block для absolute-потомков), поэтому обёртка растянута на сцену
            <div
              key={pain.num}
              ref={i === PAINS.length - 1 ? lastPainRef : undefined}
              className="absolute inset-0"
            >
              <p
                className="absolute left-[30px] text-[26px] font-bold leading-[1.2] tracking-[-1.04px] text-white"
                style={{ top: `calc(${pain.numTop} + ${PAINS_OFFSET_PX}px)` }}
              >
                {pain.num}
              </p>
              <p
                className={`absolute left-[50.35%] text-[38px] leading-none tracking-[-1.52px] text-white ${
                  pain.titleBold ? "font-bold" : "font-semibold"
                }`}
                style={{
                  top: `calc(${pain.titleTop} + ${PAINS_OFFSET_PX}px)`,
                  width: pain.titleWidth,
                }}
              >
                {pain.title}
              </p>
              <p
                className="absolute left-[50.35%] text-[18px] font-semibold leading-[1.2] tracking-[-0.72px] text-[rgba(255,255,255,0.8)]"
                style={{
                  top: `calc(${pain.descTop} + ${PAINS_OFFSET_PX}px)`,
                  width: pain.descWidth,
                }}
              >
                {pain.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
