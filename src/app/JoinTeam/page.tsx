"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import GlassPopup from "@/components/PopUp";
import { FiArrowLeft } from "react-icons/fi";
import NavBar from "../navbar/NavBar";

export default function JoinTeam() {
  const [teamId, setTeamId] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  const showPopup = (message: string) => {
    setPopupMessage(message);
    setPopupVisible(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showPopup("You must be logged in to join a team.");
      return;
    }

    if (!teamId.trim()) {
      showPopup("Please enter a team ID.");
      return;
    }

    try {
      const idToken = await user.getIdToken();

      const response = await fetch("/api/join-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId, idToken }),
      });

      const data = await response.json();

      if (response.ok) {
        showPopup("Successfully joined team!");
        router.push("/dashboard"); // redirect to team page
      } else {
        showPopup(`Error joining team: ${data.error}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Join team error:", err);
        showPopup(`Unexpected error: ${err.message}`);
      } else {
        console.error("Join team error:", err);
        showPopup("Unexpected error occurred. Check console.");
      }
    }
  };

  const inputClass =
    "p-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:ring-2 w-full";

  return (
    <section
      id="join-team"
      className="relative bg-[#1A1A1A] flex justify-center items-center overflow-hidden text-white md:px-32 py-20 p-6 sm:p-10 min-h-screen"
    >
      <NavBar />
      <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-lg">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold custom-font text-center">Join Team</h1>
          <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500/70 to-fuchsia-400/70" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6 w-full">
          <input
            type="text"
            placeholder="Enter Team ID"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            className={inputClass}
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:opacity-90 px-8 py-3 text-xl rounded-lg font-semibold transition self-center mt-4"
          >
            Join Team
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="bg-neutral-700 hover:bg-neutral-600 px-6 py-3 rounded-full text-white text-md font-semibold mx-10 sm:mx-35  flex items-center justify-center"
          >
            <FiArrowLeft className="text-3xl pr-2" />
            Back to Dashboard
          </button>
        </form>
      </div>
      {popupVisible && (
        <GlassPopup message={popupMessage} onClose={() => setPopupVisible(false)} />
      )}
    </section>
  );
}
