"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function SubmissionPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [team, setTeam] = useState<any | null>(null);
  const [submission, setSubmission] = useState<any | null>(null); // 👈 store submission data
  const [ready, setReady] = useState(false);

  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      const fetchData = async () => {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const teamId = userDoc.data().teamId;
          if (teamId) {
            const teamDocRef = doc(db, "teams", teamId);
            const teamDoc = await getDoc(teamDocRef);

            if (teamDoc.exists()) {
              const teamData = { id: teamDoc.id, ...teamDoc.data() };
              setTeam(teamData);

              // 🔎 Check if submission exists
              const q = query(
                collection(db, "submissions"),
                where("teamId", "==", teamId)
              );
              const snapshot = await getDocs(q);
              if (!snapshot.empty) {
                setSubmission({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
              }
            }
          }
        }
        setReady(true);
      };
      fetchData();
    } else if (!loading && !user) {
      setReady(true);
    }
  }, [user, loading]);

  const handleSubmitIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !team) return;

    const docRef = await addDoc(collection(db, "submissions"), {
      teamId: team.id,
      title,
      description,
      fileLink,
      createdBy: user.uid,
      createdAt: serverTimestamp(),
    });

    setSubmission({
      id: docRef.id,
      teamId: team.id,
      title,
      description,
      fileLink,
    });
  };

  if (loading || !ready) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Please log in to submit an idea.
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        You are not in a team.
      </div>
    );
  }

  if (submission) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white flex-col px-6">
        <h2 className="text-2xl font-bold mb-4 text-green-400">
          Your team has already submitted an idea 🎉
        </h2>
        <div className="bg-neutral-900 p-6 rounded-xl shadow-lg w-full max-w-lg text-left">
          <h3 className="text-xl font-bold mb-2">{submission.title}</h3>
          <p className="text-neutral-300 mb-4">{submission.description}</p>
          <a
            href={submission.fileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 underline"
          >
            View Attached File
          </a>
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-lg text-white font-semibold"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmitIdea}
      className="flex flex-col gap-6 w-full max-w-lg mx-auto min-h-screen bg-black text-white pt-24 px-4"
    >
      <h2 className="text-3xl font-bold text-violet-500/70 text-center">
        Submit Your Idea
      </h2>
      <h3 className="text-xl font-bold text-center">Team: {team.teamName}</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="px-4 py-3 rounded-md bg-neutral-800 border border-neutral-700"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={4}
        className="px-4 py-3 rounded-md bg-neutral-800 border border-neutral-700"
      />

      <input
        type="url"
        placeholder="Paste file link"
        value={fileLink}
        onChange={(e) => setFileLink(e.target.value)}
        required
        className="px-4 py-3 rounded-md bg-neutral-800 border border-neutral-700"
      />

      <button
        type="submit"
        className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-lg text-white font-semibold"
      >
        Submit
      </button>
    </form>
  );
}
