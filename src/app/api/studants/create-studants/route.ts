import { db } from "@/services/firebase-admin";
import moment from "moment";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const users = await db.collection("users").add({
      name: body.name,
      phone: body.phone,
      plan: "monthly",
      lastPayment: body.lastPayment,
      nivel: body.nivel,
      teacherId: body.teacherId,
      complet_scenarie: [],
      createdAt: moment().format("YYYY-MM-DDTHH:mm:ssZ"),
    });

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.log("nao foi possivel criar alunos", err);
  }
}
