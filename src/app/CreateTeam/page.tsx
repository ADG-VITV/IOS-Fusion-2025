"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";

export default function CreateTeam() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [teamName, setTeamName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { firstName, lastName, regNo, email, teamName };
    console.log("Team Created:", formData);
    setFirstName("");
    setLastName("");
    setRegNo("");
    setEmail("");
    setTeamName("");
  };

  const inputClass =
    "p-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:ring-2";

  return (
    
    <section
      id="create-team"
      className="relative overflow-hidden text-white md:px-32 md:py-20 p-6 sm:p-10 min-h-screen "
      style={{ background: 'linear-gradient(to right, #1e1b4b 0%, #000000 65%, #000000 100%)' }}
    >
     
      <div className="relative z-10 flex flex-col items-center">
        {/* Heading */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-5xl font-bold custom-font">Create Team</h1>
          <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500/70 to-fuchsia-400/70" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 sm:gap-6 max-w-lg w-full"
        >
          {/* Name Inputs */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
              style={{ "--tw-ring-color": "#5F2EEA" } as React.CSSProperties}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClass}
              style={{ "--tw-ring-color": "#5F2EEA" } as React.CSSProperties}
            />
          </div>

          {/* Other Inputs */}
          <input
            type="text"
            placeholder="Reg. No"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            className={inputClass}
            style={{ "--tw-ring-color": "#5F2EEA" } as React.CSSProperties}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            style={{ "--tw-ring-color": "#3F51B5" } as React.CSSProperties}
          />
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className={inputClass}
            style={{ "--tw-ring-color": "#5F2EEA" } as React.CSSProperties}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:opacity-90 px-8 py-3 rounded-lg font-semibold transition self-center mt-4"
          >
            Create Team
          </button>
        </form>
      </div>
    </section>
  );
}
