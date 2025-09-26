import CountdownTimer from "@/components/Countdown";
import Image from "next/image";
import Navbar from "@/components/Navbar-mobile";

export default function Home() {
  const phoneNumber = "919704967744";
  const whatsappURL = `https://wa.me/${phoneNumber}`;
  return (
    <>
      <main className="bg-[#1A1A1A]">
        <div className="p-4 h-full flex flex-col items-center gap-10 mb-10">
          <nav className="flex justify-between w-full max-w-md">
            <Image
              className="w-[8rem]"
              src="/adg_nav.png"
              width={500}
              height={800}
              alt="Landing page"
            />
            <Navbar />
          </nav>
          <div className="mx-2 text-white flex flex-col items-center text-center max-w-md space-y-6">
            <div className="flex gap-2 items-end justify-center">
              <p className="text-3xl font-bold text-[#5F2EEA] custom-font leading-none">
                iOS
              </p>
              <p className="text-3xl font-bold custom-font leading-none">FUSION 8.0 </p>
            </div>
            <p className="text-base text-gray-400">
              iOS Fusion 8.0: Where the future of app development unfolds.
              Experience the power to innovate like never before, pushing the
              limits of iOS technology and unlocking a world of possibilities.
            </p>
            <div className="flex z-10 text-xs justify-center gap-4">
              <button className="w-[10rem] text-base h-[2.4rem] shadow-md bg-[#5F2EEA] border-0 rounded-full hover:brightness-110 transition"> 
                <a
                  target="_blank"
                  href="https://gravitas.vit.ac.in/events/533637cb-ee55-4564-a10d-21edbd9c0c17"
                >
                  REGISTER
                </a>
              </button>
              <button className="w-[10rem] text-base h-[2.4rem] shadow-md border rounded-full hover:border-[#5F2EEA] hover:text-[#5F2EEA] transition">
                <a
                  target="_blank"
                  href={whatsappURL}
                >
                  REACH OUT
                </a>
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full space-y-8">
            
            <div className="text-3xl w-full flex justify-center">
              <div className="whitespace-nowrap">
                <CountdownTimer targetDate="2025-09-26T10:00:00" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}