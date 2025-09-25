import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { userId, teamId, title, description, fileLink } = await req.json();

    if (!userId || !teamId || !title || !description || !fileLink) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const submissionsRef = collection(db, "submissions");
    const q = query(submissionsRef, where("teamId", "==", teamId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return NextResponse.json(
        { error: "This team has already submitted an idea." },
        { status: 403 }
      );
    }

    const docRef = await addDoc(submissionsRef, {
      teamId,
      title,
      description,
      fileLink,
      createdBy: userId,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ message: "Idea submitted successfully!", submissionId: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error submitting idea:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
