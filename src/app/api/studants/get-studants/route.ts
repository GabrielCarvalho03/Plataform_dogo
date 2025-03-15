import { db } from "@/services/firebase-admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const studants = await db
      .collection("users")
      .where("teacherId", "==", body.uuid)
      .get();

    const listStudants = studants.docs.map((doc) => doc.data());

    return new NextResponse(JSON.stringify(listStudants), {
      status: 200,
    });
  } catch (err) {
    console.log("não foi possivel achar alunos", err);
  }
}
