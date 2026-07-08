"use client";

import { useEffect, useRef, useState } from "react";

// Однократное появление сцены: секция получает класс "revealed",
// элементы с .reveal-item / .reveal-fade фейдятся снизу (см. globals.css)
export function useReveal<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, revealed };
}
