const COLUMNS = [
  { video: "/video/stats-2.mp4", poster: "/img/stats-2.png", left: "0%" },
  { video: "/video/stats-3.mp4", poster: "/img/stats-3.png", left: "33.333%" },
  { video: "/video/stats-1.mp4", poster: "/img/stats-1.png", left: "66.667%" },
];

const STATS = [
  { value: "6", caption: "часов живых кейсов", left: "40px" },
  { value: "10+", caption: "выступлений экспертов", left: "calc(33.333% + 20px)" },
  { value: "100+", caption: "участников конференции", left: "calc(66.667% + 20px)" },
];

export default function Stats() {
  return (
    <section className="relative h-svh min-h-[780px] overflow-hidden bg-[#001d2b]">
      {COLUMNS.map((col) => (
        <div
          key={col.video}
          className="absolute top-0 h-full w-1/3"
          style={{ left: col.left }}
        >
          <video
            src={col.video}
            poster={col.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 size-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(1,18,28,0.24) 0%, rgba(1,18,28,0.25) 55%, rgba(1,18,28,0.40) 100%)",
            }}
          />
        </div>
      ))}
      {STATS.map((stat) => (
        <div key={stat.value}>
          <p
            className="font-display absolute bottom-[84px] whitespace-nowrap text-[160px] font-semibold leading-[0.78] tracking-[-4.8px] text-white"
            style={{ left: stat.left }}
          >
            {stat.value}
          </p>
          <p
            className="absolute bottom-[29px] whitespace-nowrap text-[20px] font-bold uppercase leading-[1.2] tracking-[-0.8px] text-white"
            style={{ left: stat.left }}
          >
            {stat.caption}
          </p>
        </div>
      ))}
    </section>
  );
}
