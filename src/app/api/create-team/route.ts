
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    try {
        const { userId, teamName, teamTagline } = await req.json();
        if (!userId || !teamName || !teamTagline) {
            return NextResponse.json({ error: "User ID, Team Name and Team Tagline are required" }, { status: 400 });
        }

        const teamId = uuidv4();

        const teamRef = doc(db, "teams", teamId);
        await setDoc(teamRef, {
            members: [userId],
            teamName,
            teamTagline,
            createdAt: new Date(),
        });

        const userDocRef = doc(db, "users", userId);
        await setDoc(userDocRef, { teamId }, { merge: true });

        return NextResponse.json({ teamId }, { status: 201 });
    } catch (error) {
        console.error("Error creating team:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
