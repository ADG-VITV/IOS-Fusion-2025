import ElectricBorder from "@/components/ElectricBorder";

export default function Description() {
    return (
    <section
        id="about"
        className="w-full bg-[#1A1A1A] py-16 md:py-24 lg:py-28 flex flex-col justify-center items-center"
    >
        <h1 className="text-white sm:mt-4 sm:mb-5 md:mb-15 text-3xl text-center md:text-4xl lg:text-5xl font-bold lg:mb-20">
        ABOUT
              <div className="mx-auto mt-4 mb-10 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500/70 to-fuchsia-400/70" />

      </h1>
        <ElectricBorder 
            color="#5F2EEA" 
            speed={2} 
            chaos={0.5} 
            thickness={3} 
            className="w-[92%] xs:w-[90%] m-4 mb-10 sm:mb-12 sm:m-8 sm:w-[75%] text-white p-6 sm:p-12 md:p-16 rounded-2xl bg-[#1A1A1A] z-10 ">
            <div className="flex flex-col items-center   sm:items-center text-left sm:text-center gap-2 sm:gap-3 pb-4 sm:pb-6">
                <p className="text-2xl xs:text-3xl sm:text-4xl font-semibold custom-font leading-tight">
                  <span className="text-[#5F2EEA]">iOS</span> FUSION
                </p>
                <p className="text-gray-400 text-sm sm:text-base tracking-wide uppercase">SUSTAINABLE TOMORROW, SHAPED TODAY!</p>
            </div>
            <div className="space-y-5 sm:space-y-6">
              <p className="text-gray-300 text-[0.95rem] sm:text-base leading-relaxed text-justify sm:text-center">
                  IOS Fusion 8.0, the flagship event of Advanced Developer Group (ADG), is
                  an unmissable opportunity for aspiring app developers to shine. Held
                  during Gravitas, VIT&apos;s premier Technical Fest, this two-day event is
                  designed to captivate and challenge participants as they dive into the
                  world of iOS development and Machine Learning.
              </p>
              <p className="text-gray-300 text-[0.95rem] sm:text-base leading-relaxed text-justify sm:text-center">
                  Join IOS Fusion 8.0 for a hands-on Swift and Machine Learning workshop where you&apos;ll learn app
                  development from expert mentors. Put your new skills to the test in an
                  Appathon, racing to create innovative iOS apps. This event combines
                  learning, creativity, and competition, offering a perfect start to your
                  journey as a top-tier app developer.
              </p>
            </div>
        </ElectricBorder>
    </section>
    );
}