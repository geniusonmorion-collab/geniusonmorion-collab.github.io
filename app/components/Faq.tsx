"use client";

import { useState } from "react";
import { useReveal } from "./useReveal";

const ITEMS = [
  {
    q: "Нужно ли платить за участие?",
    a: "Нет, посещение конференции полностью бесплатное",
  },
  {
    q: "Будет ли трансляция или запись?",
    a: "Да, запись всех выступлений отправим на почту каждому зарегистрированному участнику",
  },
  {
    q: "Как я узнаю о переносе или отмене?",
    a: "Мы заранее сообщим об изменениях письмом на почту, указанную при регистрации",
  },
  {
    q: "Не пришло подтверждение на почту, что делать?",
    a: "Проверьте папку «Спам». Если письма нет и там — напишите нам, и мы отправим подтверждение вручную",
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 10 10"
      className={`mr-[2px] size-[10px] shrink-0 transition-transform duration-200 ${
        open ? "translate-y-[3px] rotate-45" : "-translate-y-[2px] -rotate-45 -scale-y-100"
      }`}
    >
      <path
        d="M9 0C9.55228 0 10 0.447715 10 1C10 1.55228 9.55228 2 9 2H4C2.89543 2 2 2.89543 2 4V9C2 9.55228 1.55228 10 1 10C0.447715 10 0 9.55228 0 9V2C0 0.89543 0.895431 0 2 0H9Z"
        fill="#D9D9D9"
      />
    </svg>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  const { ref, revealed } = useReveal<HTMLElement>();

  return (
    <section
      id="faq"
      ref={ref}
      className={`relative h-svh min-h-[780px] overflow-hidden bg-[#0c0c0c] ${
        revealed ? "revealed" : ""
      }`}
    >
      {/* градиент подсветки снизу — проявляется вместе с элементами */}
      <div
        className="reveal-fade absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(12, 12, 12) 0%, rgb(12, 12, 12) 55.769%, rgb(24, 73, 91) 72.402%, rgb(156, 200, 215) 100%)",
        }}
      />
      <p className="reveal-item absolute left-[41px] top-[22.4%] text-[20px] font-bold uppercase leading-none tracking-[-0.8px] text-white opacity-60">
        Кому будет полезно
      </p>
      <h2 className="reveal-item font-display absolute left-[41px] top-[27.8%] w-[608px] text-[90px] font-extrabold uppercase leading-[90.5px] tracking-[-3.6px] text-white">
        Частые вопросы
      </h2>

      <div
        className="reveal-item absolute left-[50.7%] right-[40px] top-[22.4%]"
        style={{ transitionDelay: "150ms" }}
      >
        {ITEMS.map((item, i) => (
          <div key={item.q} className={i === 0 ? "" : "border-t border-white/15"}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              className={`flex w-full cursor-pointer items-center justify-between pt-[31px] text-left transition-[padding] duration-300 ease-out ${
                open === i ? "pb-0" : "pb-[26px]"
              }`}
            >
              <span className="text-[20px] font-bold uppercase leading-[1.55] text-white">
                {item.q}
              </span>
              <Chevron open={open === i} />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="w-[514px] pb-[29px] pt-[7px] text-[16px] font-medium leading-[1.55] text-[#858585]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-white/15" />
      </div>

      <footer
        className="reveal-item absolute inset-x-[41px] bottom-[30px] flex items-start justify-between text-[16px] font-medium leading-[1.55] text-white"
        style={{ transitionDelay: "300ms" }}
      >
        <div className="flex gap-[37px]">
          <a href="#" className="transition-opacity hover:opacity-70">
            Пользовательское соглашение
          </a>
          <a href="#" className="transition-opacity hover:opacity-70">
            Политика обработки персональных данных
          </a>
        </div>
        <div className="flex gap-[30px]">
          <a href="#" className="transition-opacity hover:opacity-70">
            VK
          </a>
          <a href="#" className="transition-opacity hover:opacity-70">
            TG
          </a>
          <a href="#" className="transition-opacity hover:opacity-70">
            OK
          </a>
        </div>
      </footer>
    </section>
  );
}
