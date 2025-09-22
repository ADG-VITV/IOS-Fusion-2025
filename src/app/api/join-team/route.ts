
import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userId, teamId } = await req.json();

        if (!userId || !teamId) {
            return NextResponse.json({ error: "User ID and Team ID are required" }, { status: 400 });
        }

        const teamRef = doc(db, "teams", teamId);
        const teamDoc = await getDoc(teamRef);

        if (!teamDoc.exists()) {
            return NextResponse.json({ error: "Team not found" }, { status: 404 });
        }

        await updateDoc(teamRef, {
            members: arrayUnion(userId),
        });

        const userDocRef = doc(db, "users", userId);
        await setDoc(userDocRef, { teamId }, { merge: true });

        return NextResponse.json({ message: "Successfully joined team" }, { status: 200 });
    } catch (error) {
        console.error("Error joining team:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
