"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

// You can customize the content for your three cards here
const dashboardCards = [
  {
    title: "Registrations",
    description: "View and manage all participant registrations for the event.",
    tag: "Manage Users",
    route: "/registrations",
  },
  {
    title: "Submissions",
    description: "Review all project submissions from participating teams.",
    tag: "View Projects",
    route: "/submission",
  },
  {
    title: "Analytics",
    description: "Check real-time event statistics and engagement metrics.",
    tag: "Event Data",
    route: "/analytics",
  },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading...</div>;
  }

  if (user) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={async () => {
              try {
                await signOut(auth);
                router.push("/login");
              } catch (error) {
                console.error("Logout failed:", error);
              }
            }}
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Logout
          </button>
          <h1 className="text-4xl md:text-5xl mt-7 font-bold text-center">Dashboard</h1>
          <p className="mt-2 text-center text-neutral-400 mb-14 md:mb-20">
            Logged in as: {user.email}
          </p>

          {/* This flex container arranges the cards */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
            {dashboardCards.map((card, index) => (
              <Link key={index} href={card.route} className="w-full max-w-sm">
                <div
                  className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
                  <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
                  <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
                  <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
                  <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />
                  <EvervaultCard text={card.title} />
                  <h2 className="text-white mt-4 text-sm font-light">
                    {card.description}
                  </h2>
                  <p className="text-sm border font-light border-white/[0.2] rounded-full mt-4 text-white px-2 py-0.5">
                    {card.tag}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    );
  }
  return null;
}