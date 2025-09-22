'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, collection, addDoc } from 'firebase/firestore';

export default function SubmissionPage() {
    const [idea, setIdea] = useState('');
    const [team, setTeam] = useState(null);
    const [teamName, setTeamName] = useState('');
    const [teamTagline, setTeamTagline] = useState('');
    const [teamId, setTeamId] = useState('');
    const [action, setAction] = useState('submit'); // 'submit', 'create', 'join'
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
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
                setLoading(false);
            };
            fetchTeam();
        }
    }, [user, router]);

    const handleCreateTeam = async () => {
        if (!user) {
            alert('You must be logged in to create a team.');
            return;
        }

        if (!teamName || !teamTagline) {
            alert('Please enter a team name and tagline.');
            return;
        }

        const response = await fetch('/api/create-team', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.uid, teamName, teamTagline }),
        });

        if (response.ok) {
            alert('Team created successfully!');
            const newTeam = await response.json();
            setTeam(newTeam);
            setAction('submit');
        } else {
            alert('Error creating team.');
        }
    };

    const handleJoinTeam = async () => {
        if (!user) {
            alert('You must be logged in to join a team.');
            return;
        }

        if (!teamId) {
            alert('Please enter a team ID.');
            return;
        }

        const response = await fetch('/api/join-team', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.uid, teamId }),
        });

        if (response.ok) {
            alert('Joined team successfully!');
            const updatedTeam = await response.json();
            setTeam(updatedTeam);
            setAction('submit');
        } else {
            alert('Error joining team.');
        }
    };

    const handleSubmitIdea = async () => {
        if (!user || !team) {
            alert('You must be in a team to submit an idea.');
            return;
        }

        if (!idea) {
            alert('Please enter an idea.');
            return;
        }

        const response = await fetch('/api/submit-idea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ teamId: team.id, idea }),
        });

        if (response.ok) {
            alert('Idea submitted successfully!');
        } else {
            alert('Error submitting idea.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <div className="flex mb-8">
                <button onClick={() => setAction('create')} className={`px-4 py-2 ${action === 'create' ? 'bg-purple-500' : 'bg-gray-800'}`}>Create Team</button>
                <button onClick={() => setAction('join')} className={`px-4 py-2 ${action === 'join' ? 'bg-purple-500' : 'bg-gray-800'}`}>Join Team</button>
                <button onClick={() => setAction('submit')} className={`px-4 py-2 ${action === 'submit' ? 'bg-purple-500' : 'bg-gray-800'}`}>Submit Idea</button>
            </div>

            {action === 'create' && (
                <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                    <h1 className="text-4xl font-bold mb-8">Create Team</h1>
                    <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Enter your team name"
                        className="border border-gray-700 bg-gray-900 rounded px-4 py-2 w-full mb-4"
                    />
                    <input
                        type="text"
                        value={teamTagline}
                        onChange={(e) => setTeamTagline(e.target.value)}
                        placeholder="Enter your team tagline"
                        className="border border-gray-700 bg-gray-900 rounded px-4 py-2 w-full mb-4"
                    />
                    <button onClick={handleCreateTeam} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Create Team
                    </button>
                </div>
            )}

            {action === 'join' && (
                <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                    <h1 className="text-4xl font-bold mb-8">Join Team</h1>
                    <input
                        type="text"
                        value={teamId}
                        onChange={(e) => setTeamId(e.target.value)}
                        placeholder="Enter team ID"
                        className="border border-gray-700 bg-gray-900 rounded px-4 py-2 w-full mb-4"
                    />
                    <button onClick={handleJoinTeam} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Join Team
                    </button>
                </div>
            )}

            {action === 'submit' && (
                <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                    {team ? (
                        <>
                            <h1 className="text-4xl font-bold mb-8">Submit Your Idea</h1>
                            <h2 className="text-2xl font-bold mb-4">Team: {team.teamName}</h2>
                            <textarea
                                value={idea}
                                onChange={(e) => setIdea(e.target.value)}
                                placeholder="Enter your idea"
                                className="border border-gray-700 bg-gray-900 rounded px-4 py-2 w-full h-40"
                            />
                            <button onClick={handleSubmitIdea} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4">
                                Submit Idea
                            </button>
                        </>
                    ) : (
                        <div>You are not in a team. Please create or join a team first.</div>
                    )}
                </div>
            )}
        </div>
    );
}