
'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function Dashboard() {
    const [teamId, setTeamId] = useState('');
    const [teamName, setTeamName] = useState('');
    const [teamTagline, setTeamTagline] = useState('');
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            setLoading(false);
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
            const { teamId } = await response.json();
            alert(`Team created successfully! Your team ID is: ${teamId}`);
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
            alert('Successfully joined team!');
        } else {
            const { error } = await response.json();
            alert(`Error joining team: ${error}`);
        }
    };

    const handleSubmitIdea = () => {
        router.push('/SubmissionPage');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Create Team Card */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Create Team</h2>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="Team Name"
                            className="border border-gray-700 bg-gray-900 rounded px-4 py-2"
                        />
                        <input
                            type="text"
                            value={teamTagline}
                            onChange={(e) => setTeamTagline(e.target.value)}
                            placeholder="Team Tagline"
                            className="border border-gray-700 bg-gray-900 rounded px-4 py-2"
                        />
                        <button onClick={handleCreateTeam} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Create Team
                        </button>
                    </div>
                </div>

                {/* Join Team Card */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Join Team</h2>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            value={teamId}
                            onChange={(e) => setTeamId(e.target.value)}
                            placeholder="Enter Team ID"
                            className="border border-gray-700 bg-gray-900 rounded px-4 py-2"
                        />
                        <button onClick={handleJoinTeam} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Join Team
                        </button>
                    </div>
                </div>

                {/* Submit Idea Card */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Submit Idea</h2>
                    <button onClick={handleSubmitIdea} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                        Submit Idea
                    </button>
                </div>
            </div>
        </div>
    );
}
