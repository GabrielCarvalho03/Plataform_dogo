import { db } from "@/services/firebase-admin";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const body = await request.json();

  const hashedPassword = crypto
    .createHash("sha256")
    .update(body.password)
    .digest("hex");

  const userWithPassword = await db
    .collection("teacher_users")
    .where("password", "==", hashedPassword)
    .where("email", "==", body.email)
    .get();

  if (userWithPassword.docs.length > 0) {
    return new NextResponse(
      JSON.stringify({
        success: "User already exists",
        user: {
          studentsAmount: userWithPassword.docs[0].data().studentsAmount,
          uuid: userWithPassword.docs[0].data().uuid,
          email: userWithPassword.docs[0].data().email,
          photo: userWithPassword.docs[0].data().photo,
          name: userWithPassword.docs[0].data().name,
          createdAt: userWithPassword.docs[0].data().createdAt,
        },
      }),
      { status: 200 }
    );
  }

  return new NextResponse(JSON.stringify({ error: "User not found" }), {
    status: 404,
  });
}
