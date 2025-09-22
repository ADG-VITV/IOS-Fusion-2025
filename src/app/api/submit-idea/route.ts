
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { teamId, idea } = await req.json();

        if (!teamId || !idea) {
            return NextResponse.json({ error: "Team ID and idea are required" }, { status: 400 });
        }

        const teamRef = doc(db, "teams", teamId);

        await updateDoc(teamRef, {
            idea,
        });

        return NextResponse.json({ message: "Idea submitted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error submitting idea:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
