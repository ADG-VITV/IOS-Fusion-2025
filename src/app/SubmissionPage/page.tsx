import React from 'react';
import StarBorder from '@/components/StarBorder';

export default function SubmissionPage() {
  return (
    <section
      id="submission"
      className="scroll-mt-24 md:scroll-mt-28 w-full bg-black py-16 md:py-24 lg:py-28 flex flex-col justify-center items-center"
    >
      <StarBorder
        as="div"
        color="#8b5cf6b3"
        speed="4s"
        thickness={10}
        className="w-[90%] max-w-4xl p-8 rounded-2xl shadow-xl text-white"
      >
        <h2 className="text-4xl font-bold mb-8 text-center custom-font text-violet-500/70">
          Upload Project PDF
        </h2>
        <form className="flex flex-col gap-6 w-full max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Project Name"
            required
            className="w-full px-4 py-3 rounded-md bg-neutral-900 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/70"
          />
          <textarea
            placeholder="Project Description"
            required
            rows={4}
            className="w-full px-4 py-3 rounded-md bg-neutral-900 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/70 resize-none"
          />
          <textarea
            placeholder="Problem Statement"
            required
            rows={4}
            className="w-full px-4 py-3 rounded-md bg-neutral-900 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/70 resize-none"
          />
          <input
            type="file"
            accept=".pdf"
            required
            className="block w-full text-white p-2 bg-neutral-900 border border-neutral-700 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500/70"
          />
          <button
            type="submit"
            className="mt-4 bg-violet-500/70  transition rounded-md py-3 font-semibold custon-font"
          >
            Submit
          </button>
        </form>
      </StarBorder>
    </section>
  );
}
