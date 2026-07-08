"use client";

import { createContext, useContext, useState } from "react";

// Выбранный спикер программы: от него зависят фон/фото/подпись экрана
// программы и цвет фона экрана регистрации (макеты: 1342:660 — Ким,
// 1338:591 — Иванова, 1332:514 — Галицкий).
export type ProgramSpeaker = "tk" | "marina" | "galitsky";

const Ctx = createContext<{
  speaker: ProgramSpeaker;
  setSpeaker: (s: ProgramSpeaker) => void;
}>({ speaker: "tk", setSpeaker: () => {} });

export function ProgramProvider({ children }: { children: React.ReactNode }) {
  const [speaker, setSpeaker] = useState<ProgramSpeaker>("tk");
  return <Ctx.Provider value={{ speaker, setSpeaker }}>{children}</Ctx.Provider>;
}

export const useProgramSpeaker = () => useContext(Ctx);
