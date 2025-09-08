import Question from "@/components/Question";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="bg-gradient-to-r from-[#1e1b4b] to-black text-white md:px-32 md:py-20 p-6 sm:p-10"
    >
      <h1 className="text-4xl sm:text-5xl font-bold m-8 text-center">
        <span className="text-[#5F2EEA]">F</span>
        <span className="text-[#38bdf8]">A</span>
        <span className="text-[#5F2EEA]">Q</span>
      </h1>

      <div className="flex flex-col gap-4 sm:gap-8 m-4 items-center">
        <Question
          ques="Who can participate in iOS Fusion?"
          ans="The event is open to all students of VIT."
        />
        <Question
          ques="Do we need any prerequisite knowledge?"
          ans="None required, but basics help."
        />
        <Question
          ques="Do I need to bring my own device?"
          ans="Yes, you have to bring your own device."
        />
        <Question ques="What is the team size for the Appathon?" ans="1-3" />
        <Question
          ques="Will certificates be provided?"
          ans="Yes, all participants will receive certificates of participation."
        />
        <Question
          ques="Will OD be given during the course of the Appathon?"
          ans="The event is held on holidays. No worries for OD."
        />
      </div>
    </section>
  );
}
