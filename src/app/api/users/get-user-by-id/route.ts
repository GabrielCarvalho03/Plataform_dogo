import { db } from "@/services/firebase-admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const users = await db
      .collection("teacher_users")
      .where("uuid", "==", body.uuid)
      .get();

    return new NextResponse(JSON.stringify(users.docs[0].data()), {
      status: 200,
    });
  } catch (err) {
    console.log("nao foi possivel achar alunos", err);
  }
}
