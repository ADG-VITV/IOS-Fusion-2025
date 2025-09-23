"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Team {
  teamName: string;
  teamTagline: string;
  members: string[];
  createdAt: any;
}

export default function TeamPage() {
  const params = useParams();
  const teamId =
    params && "teamId" in params
      ? Array.isArray(params.teamId)
        ? params.teamId[0]
        : params.teamId
      : null;

  const { user } = useAuth();
  const router = useRouter();

  const [team, setTeam] = useState<Team | null>(null);
  const [memberNames, setMemberNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      if (!teamId) return;
      try {
        const teamRef = doc(db, "teams", teamId as string);
        const teamSnap = await getDoc(teamRef);

        if (teamSnap.exists()) {
          const teamData = teamSnap.data() as Team;
          setTeam(teamData);

          const names: string[] = [];
          for (const uid of teamData.members || []) {
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              const email = userSnap.data().email as string;
              if (email) {
                const emailPart = email.split("@")[0];
                const name = emailPart
                  .split(".")
                  .map(
                    (part) =>
                      part.charAt(0).toUpperCase() +
                      part.slice(1).toLowerCase()
                  )
                  .join(" ");
                names.push(name);
              }
            }
          }
          setMemberNames(names);
        } else {
          setTeam(null);
        }
      } catch (err) {
        console.error("Error fetching team:", err);
        setTeam(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  const handleLeaveTeam = async () => {
    if (!user || !teamId) return;

    try {
      const idToken = await user.getIdToken(); // get Firebase Auth token

      const res = await fetch("/api/leave-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId, idToken }),
      });

      if (res.ok) {
        alert("You left the team successfully.");
        router.push("/dashboard");
      } else {
        const { error } = await res.json();
        alert(`Error leaving team: ${error}`);
      }
    } catch (err) {
      console.error("Error leaving team:", err);
      alert("Unexpected error.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading team...
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Team not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br bg-[#1A1A1A] text-white flex justify-center items-center p-6 sm:p-12 pt-24">
      <div className="max-w-3xl w-full mx-auto bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] p-8 sm:p-12 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(0,0,0,0.8)]">
        
        <div className="mb-6 border-b border-white/10 pb-4 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
            {team.teamName}
          </h1>
          <p className="text-sm text-neutral-500">Team ID: {teamId}</p>
        </div>

        <p className="text-lg text-neutral-300 italic mb-8">
          “{team.teamTagline}”
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-400">Members</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300">
            {memberNames.map((name, idx) => (
              <li
                key={idx}
                className="px-3 py-2 bg-neutral-800/60 rounded-lg border border-white/5 hover:border-indigo-500/40 transition"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-white/10 pt-4">
          <p className="text-sm text-neutral-500">
            Created At:{" "}
            {team.createdAt?.toDate
              ? team.createdAt.toDate().toLocaleString()
              : new Date(team.createdAt).toLocaleString()}
          </p>

          {user && (
            <button
              onClick={handleLeaveTeam}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-red-900/40 transition"
            >
              Leave Team
            </button>
          )}
        </div>
      </div>
    </main>

  );
}
