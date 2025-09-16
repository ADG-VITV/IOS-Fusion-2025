import CountdownTimer from "@/components/Countdown";
import Image from "next/image";
import Navbar from "@/components/Navbar-mobile";
import ADGmobile from "@/components/ADG-mobile";

export default function Home() {
  const phoneNumber = "917007299680";
  const whatsappURL = `https://wa.me/${phoneNumber}`;
  return (
    <>
      <main className="bg-gradient-to-r from-indigo-950 to-black min-h-screen">
        <div className="p-4 h-full">
          <nav className="flex justify-between">
            <Image
              className="w-[6rem]"
              src="/adglogo.png"
              width={500}
              height={500}
              alt="Landing page"
            />
            <Navbar />
          </nav>
          <div className="mx-2 text-white">
            <div className="flex gap-2 my-2">
              <p className="text-3xl font-bold my-4 text-[#5F2EEA] custom-font">
                iOS
              </p>
              <p className="text-3xl font-bold my-4 custom-font">FUSION 8.0 </p>
            </div>
            <p className="text-base text-gray-400 sm:mt-8">
              iOS Fusion 8.0: Where the future of app development unfolds.
              Experience the power to innovate like never before, pushing the
              limits of iOS technology and unlocking a world of possibilities.
            </p>
            <div className="flex my-10 mx-0 z-10 text-xs">
              <button className="w-[10rem] text-base h-[2rem] shadow-md bg-[#5F2EEA] border-0 rounded-full mr-4">
                <a
                  target="_blank"
                  href="https://gravitas.vit.ac.in/events/af543ff7-0bd3-476f-ad5d-e37805869d2c"
                >
                  REGISTER
                </a>
              </button>
              <button className="w-[10rem] text-base h-[2rem] shadow-md border rounded-full mr-4">
                <a
                  target="_blank"
                  href={whatsappURL}
                >
                  REACH OUT
                </a>
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full mt-6">
            <div className="mt-10 text-3xl">
              <CountdownTimer targetDate="2025-09-26T10:00:00" />
            </div>
          </div>
          <ADGmobile />
        </div>
      </main>
    </>
  );
}