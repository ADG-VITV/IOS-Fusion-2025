import ElectricBorder from "@/components/ElectricBorder";

export default function Description() {
    return (
    <section
        id="about"
        className="scroll-mt-24 md:scroll-mt-28 w-full bg-[#1A1A1A] py-16 md:py-24 lg:py-28 flex flex-col justify-center items-center"
    >
        <ElectricBorder 
            color="#5F2EEA" 
            speed={2} 
            chaos={0.5} 
            thickness={3} 
            className="w-[90%] m-4 mb-8 sm:m-8 sm:w-[75%]  text-white sm:p-12 md:p-16 text-center rounded-2xl bg-[#1A1A1A] z-10 ">
            <div className="flex-col hidden sm:flex items-center pb-5">
                <p className="sm:text-4xl custom-font">
                <span className="text-[#5F2EEA]">iOS</span> FUSION
                </p>
                <p className="text-gray-400">SUSTAINABLE TOMORROW, SHAPED TODAY!</p>
            </div>
            <p className="m-4 text-gray-300 text-justify sm:text-center">
                IOS Fusion 8.0, the flagship event of Advanced Developer Group (ADG), is
                an unmissable opportunity for aspiring app developers to shine. Held
                during Gravitas, VIT's premier Technical Fest, this two-day event is
                designed to captivate and challenge participants as they dive into the
                world of iOS development and Machine Learning.
            </p>
            <p className="m-4 text-gray-300 text-justify sm:text-center">
                Join IOS Fusion 8.0 for a hands-on Swift and Machine Learning workshop where you'll learn app
                development from expert mentors. Put your new skills to the test in an
                Appathon, racing to create innovative iOS apps. This event combines
                learning, creativity, and competition, offering a perfect start to your
                journey as a top-tier app developer.
            </p>
        </ElectricBorder>
    </section>
    );
}