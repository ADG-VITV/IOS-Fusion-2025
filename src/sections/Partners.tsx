import Image from "next/image";

export default function Partners() {
  return (
    <section id="partners" className="px-8 md:px-16 lg:px-32 py-16 bg-[#1A1A1A] text-white">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold m-4 text-center">PAST PARTNERS</h1>
      <div className="flex flex-wrap justify-center md:justify-around gap-8 m-4 my-20">
        <div className="w-[7rem] md:w-[10rem]">
          <Image src="/mcd.png" alt="McDonald's" width={500} height={500} className="w-full" />
        </div>
        <div className="w-[7rem] md:w-[10rem]">
          <Image src="/wss.png" alt="Wharf Street Strategies" width={500} height={500} className="w-full" />
        </div>
        <div className="w-[7rem] md:w-[10rem]">
          <Image src="/polygon.png" alt="Polygon" width={500} height={500} className="w-full" />
        </div>
      </div>
    </section>
  );
}