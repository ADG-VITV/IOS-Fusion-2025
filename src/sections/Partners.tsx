import Image from "next/image";

type Partner = {
  src: string;
  alt: string;
  glow: string; // rgba color used for the soft glow
};

const partners: Partner[] = [
  { src: "/mcd.png", alt: "McDonald's", glow: "rgba(239,68,68,0.55)" }, // red-500
  { src: "/wss.png", alt: "Wharf Street Strategies", glow: "rgba(56,189,248,0.55)" }, // sky-400
  { src: "/polygon.png", alt: "Polygon", glow: "rgba(147,51,234,0.55)" }, // purple-600
];

export default function Partners() {
  return (
    <section
      id="partners"
      className="scroll-mt-24 md:scroll-mt-28 px-8 md:px-16 lg:px-32 py-24 md:py-28 lg:py-32 bg-[#1A1A1A] text-white min-h-[80vh] flex flex-col justify-center"
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center tracking-wide">
        PAST PARTNERS
      </h1>
      <div className="mx-auto mt-4 mb-10 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500/70 to-fuchsia-400/70" />

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-12 place-items-center">
        {partners.map((p, idx) => (
          <div key={idx} className="relative group w-[9rem] md:w-[11.5rem] aspect-square">
            {/* soft colored glow */}
            <div
              className="absolute -inset-4 rounded-2xl blur-2xl opacity-70 group-hover:opacity-95 transition-opacity duration-300"
              style={{
                background: `radial-gradient(closest-side, ${p.glow}, transparent 70%)`,
              }}
              aria-hidden
            />

            {/* card */}
            <div className="relative h-full w-full rounded-2xl bg-[#222222] ring-1 ring-white/10 shadow-inner shadow-black/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:ring-white/20">
              <Image
                src={p.src}
                alt={p.alt}
                width={256}
                height={256}
                className="h-4/5 w-4/5 object-contain"
                priority={idx === 0}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
