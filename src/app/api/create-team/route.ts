import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/firebaseAdmin"; // admin SDK

export async function POST(req: NextRequest) {
  try {
    const { userId, teamName, teamTagline, email } = await req.json();

    if (!userId || !teamName || !teamTagline || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const teamId = uuidv4();

    // Write team document with UID
    await db.collection("teams").doc(teamId).set({
      members: [userId], // store UIDs only
      teamName,
      teamTagline,
      createdAt: new Date(),
    });

    // Ensure user doc contains email + teamId
    await db.collection("users").doc(userId).set(
      {
        email,
        teamId,
      },
      { merge: true }
    );

    return NextResponse.json({ teamId }, { status: 201 });
  } catch (err) {
    console.error("Error creating team:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
