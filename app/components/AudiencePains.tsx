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
const PAINS = [
  {
    num: "01",
    numTop: "24.2%",
    title: "Реклама работает в минус",
    titleTop: "23.3%",
    titleBold: true,
    desc: "Бюджет растёт, а ROI падает и непонятно, что чинить в первую очередь",
    descTop: "28.6%",
    descWidth: 369,
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
    title: "Рост упирается в потолок",
    titleTop: "80.6%",
    desc: "То, что работало при обороте в 5 млн, ломается при 50 млн",
    descTop: "85.9%",
    descWidth: 369,
  },
];

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
          <p className="absolute left-[32px] top-[22.4%] text-[18px] font-semibold leading-none tracking-[-0.72px] text-white">
            Кому будет полезно
          </p>
          <h2 className="font-display absolute left-[30px] top-[25.7%] w-[823px] text-[100px] font-bold leading-[0.81] tracking-[-4px] text-white">
            Для селлеров, которые выросли из ручного управления
          </h2>
        </div>

        {/* боли: заранее чуть видны ниже своего места, поднимаются и проявляются */}
        <div
          ref={painsRef}
          className="absolute inset-0 opacity-30 blur-[4px] will-change-transform"
        >
          {PAINS.map((pain) => (
            <div key={pain.num}>
              <p
                className="absolute left-[30px] text-[26px] font-bold leading-[1.2] tracking-[-1.04px] text-white"
                style={{ top: pain.numTop }}
              >
                {pain.num}
              </p>
              <p
                className={`absolute left-[50.35%] text-[38px] leading-none tracking-[-1.52px] text-white ${
                  pain.titleBold ? "font-bold" : "font-semibold"
                }`}
                style={{ top: pain.titleTop, width: pain.titleWidth }}
              >
                {pain.title}
              </p>
              <p
                className="absolute left-[50.35%] text-[18px] font-semibold leading-[1.2] tracking-[-0.72px] text-[rgba(255,255,255,0.77)]"
                style={{ top: pain.descTop, width: pain.descWidth }}
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
