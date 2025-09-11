import Image from "next/image";

export default function Partners() {
  return (
    <section id="partners" className="px-8 md:px-16 lg:px-32 py-16 bg-black text-white mt-5 pb-16 pt-16">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
        PAST PARTNERS
      </h1>
      <div className="flex flex-wrap justify-center md:justify-around gap-10">
        <div className="w-[7rem] md:w-[10rem] hover:scale-110 transition-transform duration-300">
          <Image src="/mcd.png" alt="McDonald's" width={500} height={500} className="w-full drop-shadow-[0_0_18px_rgba(239,68,68,0.7)]" />
        </div>
        <div className="w-[7rem] md:w-[10rem] hover:scale-110 transition-transform duration-300">
          <Image src="/wss.png" alt="Wharf Street Strategies" width={500} height={500} className="w-full drop-shadow-[0_0_18px_rgba(56,189,248,0.7)]" />
        </div>
        <div className="w-[7rem] md:w-[10rem] hover:scale-110 transition-transform duration-300">
          <Image src="/polygon.png" alt="Polygon" width={500} height={500} className="w-full drop-shadow-[0_0_18px_rgba(147,51,234,0.7)]" />
        </div>
      </div>
    </section>
  );
}
