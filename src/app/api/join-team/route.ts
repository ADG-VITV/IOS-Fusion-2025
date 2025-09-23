import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin"; 
import { getAuth } from "firebase-admin/auth";

export async function POST(req: NextRequest) {
  try {
    const { teamId, idToken } = await req.json();

    if (!teamId || !idToken) {
      return NextResponse.json({ error: "Team ID and ID token are required" }, { status: 400 });
    }

    // 1. Verify user identity
    const decoded = await getAuth().verifyIdToken(idToken);
    const userId = decoded.uid;
    const email = decoded.email;

    // 2. Get team
    const teamRef = db.collection("teams").doc(teamId);
    const teamSnap = await teamRef.get();

    if (!teamSnap.exists) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const teamData = teamSnap.data()!; // ✅ assert non-null since we already checked exists()

    // 3. Check capacity (max 5 members)
    if ((teamData.members?.length || 0) >= 5) {
      return NextResponse.json({ error: "Team is already full" }, { status: 400 });
    }

    // 4. Check if user already in a team
    const userRef = db.collection("users").doc(userId);
    const userSnap = await userRef.get();
    if (userSnap.exists && userSnap.data()?.teamId) {
      return NextResponse.json({ error: "You are already in a team" }, { status: 400 });
    }

    // 5. Add user to team + link teamId in user doc
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
