import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin"; 
import { getAuth } from "firebase-admin/auth";

export async function POST(req: NextRequest) {
  try {
    const { teamId, idToken } = await req.json();

    if (!teamId || !idToken) {
      return NextResponse.json({ error: "Team ID and ID token are required" }, { status: 400 });
    }

    const decoded = await getAuth().verifyIdToken(idToken);
    const userId = decoded.uid;
    const email = decoded.email;

    const teamRef = db.collection("teams").doc(teamId);
    const teamSnap = await teamRef.get();

    if (!teamSnap.exists) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const teamData = teamSnap.data()!; 

    if ((teamData.members?.length || 0) >= 5) {
      return NextResponse.json({ error: "Team is already full" }, { status: 400 });
    }

    const userRef = db.collection("users").doc(userId);
    const userSnap = await userRef.get();
    if (userSnap.exists && userSnap.data()?.teamId) {
      return NextResponse.json({ error: "You are already in a team" }, { status: 400 });
    }

    const batch = db.batch();
    batch.update(teamRef, { members: [...(teamData.members || []), userId] });
    batch.set(userRef, { teamId, email }, { merge: true });

    await batch.commit();

    return NextResponse.json({ message: "Successfully joined team", teamId }, { status: 200 });
  } catch (error) {
    console.error("Error joining team:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
