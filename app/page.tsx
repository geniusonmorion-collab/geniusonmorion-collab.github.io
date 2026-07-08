import Header from "./components/Header";
import Preloader from "./components/Preloader";
import ScreenScroller from "./components/ScreenScroller";
import { ProgramProvider } from "./components/ProgramContext";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import AudiencePains from "./components/AudiencePains";
import Program from "./components/Program";
import Registration from "./components/Registration";
import Faq from "./components/Faq";

export default function Home() {
  return (
    <main className="min-w-[1280px] font-sans">
      <Preloader />
      <ScreenScroller />
      <Header />
      <Hero />
      <Stats />
      <AudiencePains />
      <ProgramProvider>
        <Program />
        <Registration />
      </ProgramProvider>
      <Faq />
    </main>
  );
}
