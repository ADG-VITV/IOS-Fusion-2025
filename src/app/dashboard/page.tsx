'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { EvervaultCard, Icon } from '@/components/ui/evervault-card';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { motion } from "framer-motion";

const dashboardCards = [
    {
        title: 'Create Team',
        description: 'Create a new team and invite members.',
        tag: 'Create',
        route: '/CreateTeam',
    },
    {
        title: 'Join Team',
        description: 'Join an existing team using a team ID.',
        tag: 'Join',
        route: '/JoinTeam',
    },
    {
        title: 'Submit Idea',
        description: 'Submit your project idea for the hackathon.',
        tag: 'Submit',
        route: '/submission',
    },
];

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint is 768px
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [user, loading, router]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading...</div>;
    }

    if (user) {
        return (
            <main className="min-h-screen bg-black text-white p-4 sm:p-8 pt-24" style={{ background: 'linear-gradient(to right, #1e1b4b 0%, #000000 65%, #000000 100%)' }}>
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={async () => {
                            try {
                                await signOut(auth);
                                router.push('/login');
                            } catch (error) {
                                console.error('Logout failed:', error);
                            }
                        }}
                        className="absolute top-20 right-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl mt-12 font-bold custom-font text-center">Dashboard</h1>
                    <p className="mt-2 text-center text-neutral-400 mb-10 sm:mb-14 md:mb-20">
                        Logged in as: {user.email}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-8 md:gap-12">
                        {dashboardCards.map((card, index) => (
                            <Link key={index} href={card.route} className="w-full max-w-xs sm:max-w-sm mx-auto">
                                {isMobile ? (
                                    <div
                                        className="border border-white/[0.1] flex flex-col items-start p-4 sm:p-6 relative h-[25rem] sm:h-[30rem] rounded-2xl shadow-2xl bg-neutral-950 hover:bg-neutral-900 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_2rem_#1a0a3b]">
                                        <Icon className="absolute h-6 w-6 sm:h-8 sm:w-8 -top-3 sm:-top-4 -left-3 sm:-left-4 text-white" />
                                        <Icon className="absolute h-6 w-6 sm:h-8 sm:w-8 -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 text-white" />
                                        <Icon className="absolute h-6 w-6 sm:h-8 sm:w-8 -top-3 sm:-top-4 -right-3 sm:-right-4 text-white" />
                                        <Icon className="absolute h-6 w-6 sm:h-8 sm:w-8 -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 text-white" />
                                        <div className="w-full h-1/2">
                                            <EvervaultCard text={card.title} />
                                        </div>
                                        <div className="p-2 sm:p-4">
                                            <h2 className="text-white mt-4 text-xl sm:text-2xl font-bold">
                                                {card.title}
                                            </h2>
                                            <p className="text-neutral-300 mt-2 text-base sm:text-lg">
                                                {card.description}
                                            </p>
                                            <p className="text-sm sm:text-md border font-light border-white/[0.2] rounded-full mt-4 text-white px-3 py-1 w-fit">
                                                {card.tag}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="border border-white/[0.1] flex flex-col items-start p-4 sm:p-6 relative h-[30rem] sm:h-[45rem] rounded-2xl shadow-2xl bg-neutral-950 hover:bg-neutral-900 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_2rem_#1a0a3b]">
                                        <Icon className="absolute h-6 w-6 sm:h-8 sm:w-8 -top-3 sm:-top-4 -left-3 sm:-left-4 text-white" />
                                        <Icon className="absolute h-6 w-6 sm:h-8 sm:w-8 -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 text-white" />
                                        <Icon className="absolute h-6 w-6 sm:h-8 sm:w-8 -top-3 sm:-top-4 -right-3 sm:-right-4 text-white" />
                                        <Icon className="absolute h-6 w-6 sm:h-8 sm:w-8 -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 text-white" />
                                        <div className="w-full h-1/2">
                                            <EvervaultCard text={card.title} />
                                        </div>
                                        <div className="p-2 sm:p-4">
                                            <h2 className="text-white mt-4 text-xl sm:text-2xl font-bold">
                                                {card.title}
                                            </h2>
                                            <p className="text-neutral-300 mt-2 text-base sm:text-lg">
                                                {card.description}
                                            </p>
                                            <p className="text-sm sm:text-md border font-light border-white/[0.2] rounded-full mt-4 text-white px-3 py-1 w-fit">
                                                {card.tag}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        );
    }
    return null;
}