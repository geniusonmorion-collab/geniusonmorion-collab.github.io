"use client";

import Image from "next/image";
import { useReveal } from "./useReveal";
import { useProgramSpeaker, type ProgramSpeaker } from "./ProgramContext";

// Таймлайн программы (макет 1342:660): карточки — ГОТОВЫЕ рендеры нод из
// Figma (slot-*.png, 2x), пропорции совпадают с боксом 1:1 — никакого
// object-fit-кропа, искажения исключены; у 16:00 прогресс-бар запечён,
// 20:00 зеркалирована самой фигмой. Клик по 16:00/18:30 переключает спикера:
// плавно меняются фон (оранжевый ↔ бирюзовый), фото и подпись; экран
// регистрации ниже подстраивается по цвету (ProgramContext).
const SLOTS: {
  time: string;
  left: string;
  width: 95 | 210;
  img: string;
  speaker?: ProgramSpeaker;
}[] = [
  { time: "12:00", left: "40px", width: 95, img: "/img/slot-1200.png" },
  { time: "13:00", left: "calc(8.33% + 35px)", width: 210, img: "/img/slot-1300.png" },
  { time: "14:30", left: "calc(25% + 25px)", width: 95, img: "/img/slot-1430.png" },
  { time: "15:00", left: "calc(33.33% + 20px)", width: 95, img: "/img/slot-1500.png" },
  { time: "16:00", left: "calc(41.67% + 15px)", width: 210, img: "/img/slot-1600-nobar.png", speaker: "tk" },
  { time: "17:30", left: "calc(58.33% + 5px)", width: 95, img: "/img/slot-1730.png" },
  { time: "18:30", left: "66.67%", width: 210, img: "/img/slot-1830.png", speaker: "marina" },
  { time: "20:00", left: "calc(83.33% - 10px)", width: 210, img: "/img/slot-2000.png", speaker: "galitsky" },
];

const SPEAKERS: Record<
  ProgramSpeaker,
  { name: string; title: string }
> = {
  tk: { name: "татьяна ким", title: "CEO ВБ" },
  marina: { name: "марина иванова", title: "HRD Wildberries" },
  galitsky: { name: "сергей галицкий", title: "Предприниматель" },
};

export default function Program() {
  const { ref, revealed } = useReveal<HTMLElement>();
  const { speaker, setSpeaker } = useProgramSpeaker();
  const label = SPEAKERS[speaker];

  return (
    <section
      id="program"
      ref={ref}
      className={`relative h-svh min-h-[780px] overflow-hidden bg-black ${
        revealed ? "revealed" : ""
      }`}
    >
      {/* бирюзовый фон Ивановой (нижний слой) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgb(152, 205, 221) 0%, rgb(32, 144, 172) 31.806%, rgb(0, 134, 164) 43.775%, rgb(0, 0, 0) 73.698%)",
        }}
      />
      {/* оранжевая подложка (Ким и Галицкий); % от секции — срез как в макете */}
      <div
        className={`absolute inset-x-0 top-[-8.67%] h-[233.34%] -scale-y-100 transition-opacity duration-[800ms] ease-in-out ${
          speaker === "marina" ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(255, 206, 239) 0%, rgb(183, 182, 244) 43.309%, rgb(255, 80, 0) 53.465%, rgb(105, 0, 23) 69.712%, rgb(1, 1, 1) 89.904%)",
        }}
      />
      {/* фиолетовая перекраска подложки (Галицкий) */}
      <div
        className={`absolute inset-x-0 top-[-8.67%] h-[233.34%] bg-[#8356ee] mix-blend-hue transition-opacity duration-[800ms] ease-in-out ${
          speaker === "galitsky" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* фото спикеров — прижаты к низу экрана; reveal-fade на обёртке,
          чтобы не перебивать кроссфейд между спикерами */}
      <div className="reveal-fade absolute inset-0">
      <div
        className={`absolute bottom-[-240px] right-[-63px] h-[1140px] w-[1055px] transition-opacity duration-[800ms] ease-in-out ${
          speaker === "tk" ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/img/program-tk-photo.png"
          alt="Татьяна Ким"
          width={805}
          height={900}
          className="size-full object-cover"
        />
      </div>
      <div
        className={`absolute bottom-0 right-0 h-[900px] w-[833px] overflow-hidden transition-opacity duration-[800ms] ease-in-out ${
          speaker === "marina" ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/img/hero-photo.png"
          alt="Марина Иванова"
          width={1305}
          height={1704}
          className="absolute left-0 top-0 h-[151.98%] w-[125.71%] max-w-none"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(165deg, rgba(0, 0, 0, 0) 84.876%, rgba(0, 0, 0, 0.2) 87.157%, rgba(0, 0, 0, 0.3) 88.297%, rgba(0, 0, 0, 0.35) 88.867%, rgba(0, 0, 0, 0.4) 89.437%, rgba(0, 0, 0, 0.6) 91.718%, rgba(0, 0, 0, 0.7) 92.858%, rgba(0, 0, 0, 0.8) 93.998%)",
          }}
        />
      </div>
      <div
        className={`absolute bottom-0 right-0 h-[978px] w-[951px] overflow-hidden transition-opacity duration-[800ms] ease-in-out ${
          speaker === "galitsky" ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/img/hero-galitsky.png"
          alt="Сергей Галицкий"
          width={1024}
          height={1024}
          className="absolute inset-0 size-full object-cover object-bottom"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(165deg, rgba(0, 0, 0, 0) 84.876%, rgba(0, 0, 0, 0.2) 87.157%, rgba(0, 0, 0, 0.3) 88.297%, rgba(0, 0, 0, 0.35) 88.867%, rgba(0, 0, 0, 0.4) 89.437%, rgba(0, 0, 0, 0.6) 91.718%, rgba(0, 0, 0, 0.7) 92.858%, rgba(0, 0, 0, 0.8) 93.998%)",
          }}
        />
      </div>
      </div>

      <div className="reveal-item absolute left-[40px] top-[21.7%] flex w-[680px] flex-col gap-[30px]">
        <div
          key={speaker}
          className="animate-speaker-label flex items-center gap-[10px] text-[20px] font-bold uppercase leading-none tracking-[-0.7px] text-white"
        >
          <p>{label.name}</p>
          <span className="size-[5px] rounded-full bg-white/60" />
          <p className="opacity-60">{label.title}</p>
        </div>
        <h2 className="font-display text-[80px] font-extrabold uppercase leading-[80px] tracking-[-2.4px] text-white">
          Портал продавцов:
          <br />
          обновление
        </h2>
      </div>
      <p
        className="reveal-item absolute left-[40px] top-[60.1%] w-[599px] text-[20px] font-medium leading-[1.3] tracking-[-0.8px] text-white opacity-80"
        style={{ transitionDelay: "150ms" }}
      >
        Татьяна Ким расскажет про ключевые обновления WB Partners и на примере
        живого кейса покажет как выстроить процессы и контролировать бизнес без
        перегруза
      </p>

      {/* таймлайн */}
      {SLOTS.map((slot, i) => {
        const isActive = slot.speaker === speaker;
        const card = (
          <>
            <Image
              src={slot.img}
              alt=""
              width={slot.width * 2}
              height={190}
              className="absolute inset-0 size-full rounded-[10px]"
            />
            {isActive && (
              <>
                <div className="absolute left-0 top-0 h-[3px] w-full bg-white opacity-30" />
                <div className="absolute left-0 top-0 h-[3px] w-[138px] bg-white" />
              </>
            )}
          </>
        );
        const style = {
          left: slot.left,
          width: slot.width,
          transitionDelay: `${250 + i * 60}ms`,
        };
        return (
          <div key={slot.time}>
            <p
              className={`reveal-item absolute top-[81.6%] whitespace-nowrap text-[20px] font-bold leading-[0.9] tracking-[-0.7px] text-white transition-opacity duration-500 ${
                isActive ? "" : "opacity-50"
              }`}
              style={{ left: slot.left, transitionDelay: `${250 + i * 60}ms` }}
            >
              {slot.time}
            </p>
            {slot.speaker ? (
              <button
                type="button"
                onClick={() => setSpeaker(slot.speaker!)}
                className={`reveal-item group absolute top-[85%] h-[95px] cursor-pointer overflow-clip rounded-[10px] transition-shadow duration-500 ${
                  isActive ? "ring-2 ring-white/90" : ""
                }`}
                style={style}
              >
                <div
                  className={`absolute inset-0 transition-[filter,opacity] duration-500 ${
                    isActive ? "" : "opacity-50 grayscale group-hover:opacity-80"
                  }`}
                >
                  {card}
                </div>
              </button>
            ) : (
              <div
                className="reveal-item absolute top-[85%] h-[95px] overflow-clip rounded-[10px]"
                style={style}
              >
                {card}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
