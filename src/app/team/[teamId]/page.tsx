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
    <main className="min-h-screen bg-black text-white p-6 sm:p-12 pt-24">
      <div className="max-w-3xl mx-auto bg-neutral-950 border border-white/[0.1] rounded-2xl shadow-2xl p-6 sm:p-10">
        <h1 className="text-4xl font-bold mb-2">{team.teamName}</h1>
        <p className="text-sm text-neutral-500 mb-6">Team ID: {teamId}</p>

        <p className="text-lg text-neutral-400 mb-6">{team.teamTagline}</p>

        <h2 className="text-2xl font-semibold mb-2">Members</h2>
        <ul className="list-disc pl-5 text-neutral-300">
          {memberNames.map((name, idx) => (
            <li key={idx} className="mb-1">
              {name}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-neutral-500">
          Created At:{" "}
          {team.createdAt?.toDate
            ? team.createdAt.toDate().toLocaleString()
            : new Date(team.createdAt).toLocaleString()}
        </p>

        {user && (
          <button
            onClick={handleLeaveTeam}
            className="mt-8 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-semibold"
          >
            Leave Team
          </button>
        )}
      </div>
    </main>
  );
}
