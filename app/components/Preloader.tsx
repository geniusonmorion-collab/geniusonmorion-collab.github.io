"use client";

import { useEffect, useState } from "react";

// Прелоадер — порт с rwb.ru: логотип «заливается» белым через маску (1с),
// затем шторка clip-path уезжает вверх (1.5с). Тайминги — их константы
// LOADER_MS / INTRO_MS; скролл на время лоадера заблокирован (lockWheelScroll).
const LOADER_MS = 1000;
const INTRO_MS = 1500;

export default function Preloader() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const unlock = () => {
      document.body.style.overflow = "";
    };
    const t1 = setTimeout(() => {
      setHiding(true);
      // старт появления объектов hero — синхронно с подъёмом шторки
      document.body.classList.add("intro-revealed");
    }, LOADER_MS);
    const t2 = setTimeout(() => {
      setGone(true);
      unlock();
    }, LOADER_MS + INTRO_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      unlock();
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`loader-container ${hiding ? "is-hiding" : ""}`}>
      <div className="loader-gradient">
        <div className="logo_position logo-mask-bg" />
        <div className="logo_position logo-mask-gradient" />
      </div>
    </div>
  );
}
