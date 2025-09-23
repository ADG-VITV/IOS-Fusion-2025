import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin"; // your Admin SDK wrapper
import { getAuth } from "firebase-admin/auth";

export async function POST(req: NextRequest) {
  try {
    const { teamId, idToken } = await req.json();

    if (!teamId || !idToken) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Verify Firebase ID token
    const decoded = await getAuth().verifyIdToken(idToken);
    const userId = decoded.uid;

    const teamRef = db.collection("teams").doc(teamId);
    const userRef = db.collection("users").doc(userId);

    const teamSnap = await teamRef.get();
    if (!teamSnap.exists) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const teamData = teamSnap.data();
    if (!teamData?.members?.includes(userId)) {
      return NextResponse.json({ error: "You are not a member of this team" }, { status: 403 });
    }

    // Run everything in a batch
    const batch = db.batch();

    // Remove user from members
    batch.update(teamRef, {
      members: teamData.members.filter((m: string) => m !== userId),
    });

    // Clear user's teamId
    batch.update(userRef, { teamId: null });

    // If last member -> delete team
    if (teamData.members.length === 1 && teamData.members[0] === userId) {
      batch.delete(teamRef);
    }

    await batch.commit();

    return NextResponse.json({ message: "Left team successfully" }, { status: 200 });
  } catch (err: any) {
    console.error("Error in leave-team API:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
