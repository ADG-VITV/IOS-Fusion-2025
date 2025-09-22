'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import StarBorder from '@/components/StarBorder';

export default function SubmissionPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ppt, setPpt] = useState<File | null>(null);
    const [team, setTeam] = useState(null);
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        if (user) {
            const fetchTeam = async () => {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const teamId = userDoc.data().teamId;
                    if (teamId) {
                        const teamDocRef = doc(db, "teams", teamId);
                        const teamDoc = await getDoc(teamDocRef);
                        if (teamDoc.exists()) {
                            setTeam({ id: teamDoc.id, ...teamDoc.data() });
                        }
                    }
                }
            };
            fetchTeam();
        }
    }, [user, loading, router]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPpt(e.target.files[0]);
        }
    };

    const handleSubmitIdea = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !team) {
            alert('You must be in a team to submit an idea.');
            return;
        }

        if (!title || !description) {
            alert('Please enter a title and description.');
            return;
        }

        const formData = new FormData();
        formData.append('teamId', team.id);
        formData.append('title', title);
        formData.append('description', description);
        if (ppt) {
            formData.append('ppt', ppt);
        }

        const response = await fetch('/api/submit-idea', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Idea submitted successfully!');
        } else {
            alert('Error submitting idea.');
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading...</div>;
    }

    return (
        <section
            id="submission"
            className="min-h-screen w-full bg-black py-16 md:py-24 lg:py-28 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24"
        >
            <StarBorder
                as="div"
                color="#8b5cf6b3"
                speed="4s"
                thickness={10}
                className="w-full max-w-4xl p-6 sm:p-8 rounded-2xl shadow-xl text-white bg-neutral-900"
            >
                {team ? (
                    <form onSubmit={handleSubmitIdea} className="flex flex-col gap-6 w-full max-w-lg mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center custom-font text-violet-500/70">
                            Submit Your Idea
                        </h2>
                        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">Team: {team.teamName}</h3>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/70"
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={4}
                            className="w-full px-4 py-3 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/70 resize-none"
                        />
                        <input
                            type="file"
                            accept=".ppt, .pptx"
                            onChange={handleFileChange}
                            className="block w-full text-white p-2 bg-neutral-800 border border-neutral-700 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500/70"
                        />
                        <button
                            type="submit"
                            className="mt-4 bg-violet-500/70  transition rounded-md py-3 font-semibold custon-font hover:bg-violet-600/70"
                        >
                            Submit
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">You are not in a team</h2>
                        <p className="text-base sm:text-lg">Please create a team or join one to submit your idea.</p>
                    </div>
                )}
            </StarBorder>
        </section>
    );
}