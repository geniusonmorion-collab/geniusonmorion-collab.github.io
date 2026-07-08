"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Hero с переключением спикеров (макет v2: фреймы 1305:778 / 1291:513 / 1305:676):
// клик по аватарке меняет фото, подпись, цвет кольца и фон
// (Ким — красный, Иванова — сине-бирюзовый без красной подложки,
// Галицкий — та же подложка, перекрашенная в фиолетовый через mix-blend-hue).
// Кольцо активной аватарки — таймер: заполняется за SLIDE_MS, по его окончании
// hero сам переключается на следующего спикера; клик по аватарке
// переключает вручную и перезапускает таймер.
const SLIDE_MS = 6000;

const SPEAKERS = [
  {
    id: "tk",
    name: "Татьяна Ким",
    title: "Ген. директор",
    avatar: "/img/av2-7887.png",
    ring: "#ff310c",
  },
  {
    id: "marina",
    name: "Марина Иванова",
    title: "HRD Wildberries",
    avatar: "/img/av2-7888.png",
    ring: "#54b3d9",
  },
  {
    id: "galitsky",
    name: "Сергей Галицкий",
    title: "Предприниматель",
    avatar: "/img/av2-7886.png",
    ring: "#790cff",
  },
];

// длина окружности кольца-таймера (r=37.5) — должна совпадать
// со stroke-dashoffset в @keyframes speaker-progress
const RING_CIRC = 2 * Math.PI * 37.5;

// инфокарточка слева (макет: фрейм «Frame 2136140862» + варианты 2136140886):
// смена синхронна со сменой спикера (единый таймер — кольцо аватарки, пилюля
// карточки лишь дублирует его визуально); значения меняются вертикальным
// слот-роллом — следующее значение ждёт под нижним краем карточки (как «21» в макете)
const CARDS = [
  { id: "date", label: "февраль", value: "14" },
  { id: "place", label: "ул. Петровка", value: "1А" },
  { id: "cases", label: "реальных кейсов", value: "12" },
];

// дистанция слот-ролла: расстояние между текущим (top 86) и ждущим (top 323) значением
const CARD_ROLL_PX = 237;
const CARD_ROLL_MS = 800;

const VIGNETTE =
  "linear-gradient(165deg, rgba(0, 0, 0, 0) 84.876%, rgba(0, 0, 0, 0.2) 87.157%, rgba(0, 0, 0, 0.3) 88.297%, rgba(0, 0, 0, 0.35) 88.867%, rgba(0, 0, 0, 0.4) 89.437%, rgba(0, 0, 0, 0.6) 91.718%, rgba(0, 0, 0, 0.7) 92.858%, rgba(0, 0, 0, 0.8) 93.998%)";

export default function Hero() {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const [card, setCard] = useState(0);
  const [rolling, setRolling] = useState(false);
  const speaker = SPEAKERS[active];
  // нижний слот карточки: во время ролла — целевая карточка (= активный спикер),
  // в покое — следующая по кругу, припаркованная под нижним краем
  const incoming = rolling ? active : (card + 1) % CARDS.length;

  // таймер первого спикера стартует только после подъёма шторки прелоадера
  // (body.intro-revealed), иначе часть его круга утекает под лоадер
  useEffect(() => {
    if (document.body.classList.contains("intro-revealed")) {
      setStarted(true);
      return;
    }
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains("intro-revealed")) {
        setStarted(true);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // карточка привязана к спикеру: любая смена active (авто по кольцу-таймеру
  // или клик по аватарке) запускает слот-ролл карточки к той же позиции —
  // спикер и карточка меняются в один бит
  useEffect(() => {
    if (active === card) {
      setRolling(false);
      return;
    }
    setRolling(true);
    const t = setTimeout(() => {
      setCard(active);
      setRolling(false);
    }, CARD_ROLL_MS);
    return () => clearTimeout(t);
  }, [active, card]);

  return (
    <section
      id="about"
      className="relative h-svh min-h-[780px] overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgb(152, 205, 221) 0%, rgb(32, 144, 172) 31.806%, rgb(0, 134, 164) 43.775%, rgb(0, 0, 0) 73.698%)",
      }}
    >
      {/* розово-оранжевая подложка (Ким и Галицкий); размеры в % от секции,
          чтобы видимый срез градиента совпадал с макетом на любой высоте экрана */}
      <div
        className={`absolute inset-x-0 top-[-8.67%] h-[233.34%] -scale-y-100 transition-opacity duration-[800ms] ease-in-out ${
          active === 1 ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(255, 206, 239) 0%, rgb(183, 182, 244) 43.309%, rgb(255, 80, 0) 53.465%, rgb(105, 0, 23) 69.712%, rgb(1, 1, 1) 89.904%)",
        }}
      />
      {/* фиолетовая перекраска подложки (Галицкий) */}
      <div
        className={`absolute inset-x-0 top-[-8.67%] h-[233.34%] bg-[#8356ee] mix-blend-hue transition-opacity duration-[800ms] ease-in-out ${
          active === 2 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* фото спикеров — прижаты к нижнему краю экрана; hero-fade на обёртке,
          чтобы не конфликтовать с кроссфейдом между спикерами */}
      <div className="hero-photo absolute inset-0" style={{ transitionDelay: "200ms" }}>
      {/* серая блюр-дымка у нижней кромки — ПОД фото, а не поверх: сверху она
          мелькала «непонятной серой полосой» в кроссфейдах автокарусели */}
      <div
        className="absolute bottom-0 right-0 h-[103px] bg-[#46404b] blur-[75px] transition-all duration-[800ms] ease-in-out"
        style={{ width: active === 1 ? 455 : 582 }}
      />
      <div
        className={`absolute bottom-[-377px] right-[-216px] transition-opacity duration-[800ms] ease-in-out ${
          active === 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/img/hero-kim.png"
          alt="Татьяна Ким"
          width={1144}
          height={1236}
          priority
          unoptimized
          className="h-[1236px] w-[1144px] max-w-none object-cover"
        />
      </div>
      <div
        className={`absolute bottom-0 right-0 h-[900px] w-[833px] overflow-hidden transition-opacity duration-[800ms] ease-in-out ${
          active === 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/img/hero-photo.png"
          alt="Марина Иванова"
          width={1305}
          height={1704}
          priority
          unoptimized
          className="absolute left-0 top-0 h-[151.98%] w-[125.71%] max-w-none"
        />
        <div className="absolute inset-0" style={{ backgroundImage: VIGNETTE }} />
      </div>
      <div
        className={`absolute bottom-0 right-[-11px] h-[978px] w-[951px] overflow-hidden transition-opacity duration-[800ms] ease-in-out ${
          active === 2 ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/img/hero-galitsky.png"
          alt="Сергей Галицкий"
          width={1024}
          height={1024}
          priority
          unoptimized
          className="absolute inset-0 size-full object-cover object-bottom"
        />
        <div className="absolute inset-0" style={{ backgroundImage: VIGNETTE }} />
      </div>
      </div>

      <h1 className="hero-item font-display absolute left-[40px] top-[13.9%] whitespace-nowrap text-[90px] font-extrabold uppercase leading-[90.5px] tracking-[-3.6px] text-white">
        архитектура
        <br />
        роста бизнеса
        <br />
        для селлеров
      </h1>
      <p
        className="hero-item absolute left-[40px] top-[46.8%] w-[547px] text-[20px] font-medium leading-[1.2] tracking-[-0.8px] text-white"
        style={{ transitionDelay: "100ms" }}
      >
        Конференция о решениях, после которых
        <br />
        бизнес начинает работать по-другому
      </p>

      {/* инфокарточка: автосмена дата → адрес → кейсы */}
      <div
        className="hero-item absolute bottom-[124px] left-[40px] h-[241px] w-[325px] overflow-clip rounded-[10px] bg-[rgba(0,0,0,0.1)]"
        style={{ transitionDelay: "200ms" }}
      >
        {/* подписи — кроссфейд на время ролла */}
        {[card, incoming].map((ci, pos) => (
          <p
            key={`card-label-${CARDS[ci].id}`}
            className="absolute left-1/2 top-[39px] -translate-x-1/2 whitespace-nowrap text-center text-[20px] font-bold uppercase leading-[0.9] tracking-[-0.4px] text-white"
            style={{
              opacity: pos === 0 ? (rolling ? 0 : 1) : rolling ? 1 : 0,
              transition: rolling
                ? `opacity ${CARD_ROLL_MS}ms ease-in-out`
                : "none",
            }}
          >
            {CARDS[ci].label}
          </p>
        ))}
        {/* значения — слот-ролл: текущее уезжает вверх, следующее приезжает
            из-под нижнего края; зона клипается ниже подписи, чтобы уходящее
            значение не проезжало сквозь неё; после ролла стейт меняется,
            обёртка возвращается в ноль без transition — визуально бесшовно */}
        <div className="absolute inset-x-0 bottom-0 top-[70px] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              transform: rolling
                ? `translateY(-${CARD_ROLL_PX}px)`
                : "translateY(0)",
              transition: rolling
                ? `transform ${CARD_ROLL_MS}ms ease-in-out`
                : "none",
            }}
          >
            <p
              key={`card-value-${CARDS[card].id}`}
              className="font-display absolute left-1/2 top-[16px] -translate-x-1/2 whitespace-nowrap text-center text-[160px] font-semibold leading-[0.78] tracking-[-4.8px] text-white"
            >
              {CARDS[card].value}
            </p>
            <p
              key={`card-value-${CARDS[incoming].id}`}
              className="font-display absolute left-1/2 top-[253px] -translate-x-1/2 whitespace-nowrap text-center text-[160px] font-semibold leading-[0.78] tracking-[-4.8px] text-white"
              style={{
                opacity: rolling ? 1 : 0.1,
                transition: rolling
                  ? `opacity ${CARD_ROLL_MS}ms ease-in-out`
                  : "none",
              }}
            >
              {CARDS[incoming].value}
            </p>
          </div>
        </div>
        {/* индикатор (порт date-tick.svg): пилюля дублирует кольцо-таймер
            спикера — ключ по спикеру, чтобы обе шкалы стартовали синхронно;
            сменой карточки управляет только animationend кольца */}
        <div className="absolute left-[312px] top-[94px] h-[54px] w-[6px]">
          <div className="absolute left-0 top-0 h-[16px] w-[6px] rounded-[3px] bg-white/20" />
          <div
            key={`card-pill-${speaker.id}`}
            className="animate-card-progress absolute left-0 top-0 w-[6px] rounded-[3px] bg-white"
            style={{
              animationDuration: `${SLIDE_MS}ms`,
              animationPlayState: started ? "running" : "paused",
            }}
          />
          <div className="absolute left-0 top-[21px] size-[6px] rounded-full bg-white/20" />
          <div className="absolute left-0 top-[32px] size-[6px] rounded-full bg-white/20" />
          <div className="absolute left-[1px] top-[43px] size-[4px] rounded-full bg-white/20" />
          <div className="absolute left-[2px] top-[52px] size-[2px] rounded-full bg-white/20" />
        </div>
      </div>

      <a
        href="#register"
        className="hero-item absolute bottom-[30px] left-[40px] flex h-[84px] w-[325px] items-center justify-center rounded-[10px] bg-[#131116] px-[40px] py-[20px] text-[20px] font-bold uppercase leading-[0.9] tracking-[-0.4px] text-white hover:opacity-90"
        style={{ transitionDelay: "300ms" }}
      >
        регистрация
      </a>

      {/* спикеры: клик по лицу переключает вариант */}
      <div
        className="hero-item absolute bottom-[27px] right-[40px] flex h-[78px] items-center gap-[8px]"
        style={{ transitionDelay: "400ms" }}
      >
        {SPEAKERS.map((s, i) =>
          i === active ? (
            <div key={s.id} className="flex items-center">
              <div
                key={`label-${s.id}`}
                className="animate-speaker-label ml-[12px] mr-[17px] flex flex-col items-end gap-[6px] whitespace-nowrap text-white"
              >
                <p className="text-[14px] font-semibold leading-none tracking-[-0.42px] opacity-60">
                  {speaker.title}
                </p>
                <p className="text-[20px] font-semibold leading-none tracking-[-0.6px]">
                  {speaker.name}
                </p>
              </div>
              <div className="relative flex size-[78px] items-center justify-center">
                <Image
                  src="/img/ring2-outer.png"
                  alt=""
                  width={78}
                  height={78}
                  className="absolute inset-0 size-[78px] -rotate-90 opacity-20"
                />
                {/* кольцо-таймер: заполняется по часовой с 12 часов (rotate -90),
                    по animationend переключаемся на следующего спикера */}
                <svg
                  key={`arc-${s.id}`}
                  viewBox="0 0 78 78"
                  className="absolute inset-0 size-[78px] -rotate-90"
                >
                  <circle
                    cx="39"
                    cy="39"
                    r="37.5"
                    fill="none"
                    stroke={s.ring}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRC}
                    className="animate-speaker-progress"
                    style={{
                      animationDuration: `${SLIDE_MS}ms`,
                      animationPlayState: started ? "running" : "paused",
                    }}
                    onAnimationEnd={() =>
                      setActive((a) => (a + 1) % SPEAKERS.length)
                    }
                  />
                </svg>
                <Image
                  src={s.avatar}
                  alt={s.name}
                  width={72}
                  height={72}
                  className="size-[72px] rounded-full"
                />
              </div>
            </div>
          ) : (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              className="cursor-pointer"
            >
              <Image
                src={s.avatar}
                alt={s.name}
                width={72}
                height={72}
                className="size-[72px] rounded-full opacity-60 transition-opacity hover:opacity-100"
              />
            </button>
          )
        )}
        <a
          href="#program"
          className="flex size-[72px] cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <span className="text-[20px] font-semibold leading-none tracking-[-0.6px] text-white opacity-40">
            +6
          </span>
        </a>
      </div>
    </section>
  );
}
