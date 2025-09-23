'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import GlassPopup from '@/components/PopUp';

export default function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const [teamTagline, setTeamTagline] = useState('');
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
      showPopup('You must be logged in to create a team.');
      return;
    }

    if (!teamName || !teamTagline) {
      showPopup('Please enter a team name and tagline.');
      return;
    }

    try {
      const response = await fetch('/api/create-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email, 
          teamName,
          teamTagline,
        }),
      });

      if (response.ok) {
        const { teamId } = await response.json();
        showPopup(`Team created successfully!`);
        router.push('/dashboard');
      } else {
        const { error } = await response.json();
        showPopup(`Error creating team: ${error}`);
      }
    } catch (err) {
      console.error('Error creating team:', err);
      showPopup('Unexpected error occurred.');
    }
  };

  const inputClass =
    "p-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:ring-2 w-full";

  return (
    <section
      id="create-team"
      className="relative flex justify-center items-center overflow-hidden text-white md:px-32 py-20 p-6 sm:p-10 min-h-screen"
      style={{ background: 'linear-gradient(to right, #1e1b4b 0%, #000000 65%, #000000 100%)' }}
    >
      <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-lg">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold custom-font text-center">Create Team</h1>
          <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500/70 to-fuchsia-400/70" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6 w-full">
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className={inputClass}
            style={{ "--tw-ring-color": "#5F2EEA" } as React.CSSProperties}
          />
          <input
            type="text"
            placeholder="Team Tagline"
            value={teamTagline}
            onChange={(e) => setTeamTagline(e.target.value)}
            className={inputClass}
            style={{ "--tw-ring-color": "#5F2EEA" } as React.CSSProperties}
          />

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
