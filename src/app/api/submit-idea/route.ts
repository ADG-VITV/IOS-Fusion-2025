import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const teamId = formData.get('teamId') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const ppt = formData.get('ppt') as File;

        if (!teamId || !title || !description) {
            return NextResponse.json({ error: "Team ID, title, and description are required" }, { status: 400 });
        }

        const teamRef = doc(db, "teams", teamId);

        await updateDoc(teamRef, {
            idea: {
                title,
                description,
            },
        });

        if (ppt) {
            console.log('Received PPT file:', ppt.name, ppt.type, ppt.size);
            // Here you would typically upload the file to a storage service like Firebase Storage
        }

        return NextResponse.json({ message: "Idea submitted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error submitting idea:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}