"use client";

import Image from "next/image";
import { useProgramSpeaker } from "./ProgramContext";

export default function Registration() {
  const { speaker } = useProgramSpeaker();

  return (
    <section id="register" className="relative h-svh min-h-[780px] overflow-hidden bg-[#0c0c0c]">
      {/* бирюзовый фон (Иванова) — продолжение светлого низа программы */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(152, 205, 221) 0%, rgb(0, 134, 164) 25%, rgb(6, 60, 74) 55%, rgb(12, 12, 12) 88%)",
        }}
      />
      {/* оранжевый фон (Ким и Галицкий); % от секции — срез как в макете */}
      <div
        className={`absolute inset-x-0 top-[-147.89%] h-[273.12%] transition-opacity duration-[800ms] ease-in-out ${
          speaker === "marina" ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(255, 206, 239) 0%, rgb(183, 182, 244) 43.309%, rgb(255, 80, 0) 54.373%, rgb(105, 0, 23) 69.712%, rgb(12, 12, 12) 89.904%)",
        }}
      />
      {/* фиолетовая перекраска (Галицкий) */}
      <div
        className={`absolute inset-x-0 top-[-147.89%] h-[273.12%] bg-[#8356ee] mix-blend-hue transition-opacity duration-[800ms] ease-in-out ${
          speaker === "galitsky" ? "opacity-100" : "opacity-0"
        }`}
      />
      <p className="absolute left-[42px] top-[20.3%] text-[20px] font-bold uppercase leading-none tracking-[-0.8px] text-white opacity-60">
        Заполните форму
      </p>
      <h2 className="font-display absolute left-[40px] top-[25.7%] whitespace-nowrap text-[80px] font-extrabold uppercase leading-[80px] tracking-[-2.4px] text-white">
        Регистрация
      </h2>
      <p className="absolute left-[calc(50%-60px)] top-[27.2%] whitespace-nowrap text-[20px] font-semibold leading-none tracking-[-0.8px] text-white">
        14.02
      </p>
      <p className="absolute left-[calc(50%-60px)] top-[31.1%] whitespace-nowrap text-[20px] font-semibold leading-none tracking-[-0.8px] text-white">
        Центр событий РБК
      </p>

      <form className="absolute inset-x-[40px] bottom-[30px] flex flex-col gap-[31px]">
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-[20px]">
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              className="h-[70px] w-full border-b border-white bg-transparent px-[16px] text-[16px] font-semibold text-white outline-none placeholder:text-white placeholder:opacity-70"
            />
            <input
              type="email"
              name="email"
              placeholder="Ваша почта"
              className="h-[70px] w-full border-b border-white bg-transparent px-[16px] text-[16px] font-semibold text-white outline-none placeholder:text-white placeholder:opacity-70"
            />
            <input
              type="tel"
              name="phone"
              placeholder="+7 (906) 969-00-00"
              className="h-[70px] w-full border-b border-white bg-transparent px-[16px] text-[16px] font-semibold text-white outline-none placeholder:text-white placeholder:opacity-70"
            />
          </div>
          <p className="font-display w-[575px] text-[16px] font-medium leading-[1.2] text-[rgba(255,255,255,0.5)]">
            Нажимая «Зарегистрироваться», вы подтверждаете, что ознакомлены
            с&nbsp;<a href="#" className="font-semibold text-white">
              Политикой обработки персональных данных
            </a>{" "}
            и{" "}
            <span className="font-semibold text-white">
              принимаете{" "}
              <a href="#" className="font-semibold text-white">
                Условия обработки обращений
              </a>
            </span>
          </p>
        </div>
        <button
          type="submit"
          className="font-display flex h-[80px] w-full cursor-pointer items-center justify-center gap-[12px] rounded-[10px] bg-white p-[16px] text-[16px] font-bold uppercase text-[#26040b] transition-opacity hover:opacity-90"
        >
          <Image src="/img/btn-arrow.svg" alt="" width={27} height={19} />
          Зарегистрироваться
        </button>
      </form>
    </section>
  );
}
