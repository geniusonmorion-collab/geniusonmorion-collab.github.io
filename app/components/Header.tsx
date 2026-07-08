import Image from "next/image";

const NAV = [
  { label: "О мероприятии", href: "#about" },
  { label: "Кому полезно", href: "#audience" },
  { label: "Спикеры", href: "#program" },
  { label: "Программа", href: "#program" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  return (
    <header className="hero-fade fixed inset-x-0 top-0 z-50">
      <a href="#about" className="absolute left-[40px] top-[30px] block">
        <Image src="/img/logo-white.svg" alt="RWB" width={90} height={30} />
      </a>
      <nav className="absolute left-[232px] top-[36px] flex items-center gap-[24px] text-[13px] font-semibold uppercase leading-[18px] tracking-[-0.26px] text-white">
        {NAV.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="transition-opacity hover:opacity-70"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <a
        href="#register"
        className="absolute right-[40px] top-[36px] flex items-center gap-[6px] text-[13px] font-bold uppercase leading-[18px] tracking-[-0.26px] text-white transition-opacity hover:opacity-70"
      >
        <span className="size-[10px] rounded-full bg-white" />
        зарегистрироваться
      </a>
    </header>
  );
}
