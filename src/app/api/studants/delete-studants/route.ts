import { db } from "@/services/firebase-admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const studants = await db
      .collection("users")
      .where("teacherId", "==", body.uuid)
      .where("phone", "==", body.phone)
      .get();

    const studantsID = studants.docs[0].id;

    await db.collection("users").doc(studantsID).delete();

    return new NextResponse(null, {
      status: 200,
    });
  } catch (err) {
    console.log("não foi possivel achar alunos", err);
  }
}
