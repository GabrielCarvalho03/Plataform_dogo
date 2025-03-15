import { db } from "@/services/firebase-admin";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const body = await request.json();

  const user = await db
    .collection("teacher_users")
    .where("uuid", "==", body.uid)
    .get();

  if (user.docs.length == 0) {
    const hashedPassword = body.password
      ? crypto.createHash("sha256").update(body.password).digest("hex")
      : null;

    const userWithPassword = await db
      .collection("teacher_users")
      .where("email", "==", body.email)
      .where("password", "==", hashedPassword)
      .get();

    if (userWithPassword.docs.length > 0) {
      return new NextResponse(
        JSON.stringify({
          error: "User already exists",
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

    const userWithoutGoogle = await db.collection("teacher_users").add({
      uuid: body.uid,
      name: body.name,
      password: hashedPassword,
      email: body.email,
      photo: body.photo,
      createdAt: body.createdAt,
      studentsAmount: 0,
    });

    return new NextResponse(
      JSON.stringify({
        message: "User created successfully",
        user: {
          studentsAmount: 0,
          uuid: body.uid,
          email: body.email,
          photo: body.photo,
          name: body.name,
        },
      }),
      { status: 200 }
    );
  }

  const userData = user.docs[0].data();

  if (user.docs.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: "User already exists",
        user: {
          studentsAmount: userData.studentsAmount,
          uuid: userData.uuid,
          email: userData.email,
          photo: userData.photo,
          name: userData.name,
          createdAt: userData.createdAt,
        },
      }),
      { status: 200 }
    );
  }

  await db.collection("teacher_users").add({
    uuid: body.uid,
    name: body.name,
    email: body.email,
    photo: body.photo,
    createdAt: body.createdAt,
    studentsAmount: 0,
  });

  return new NextResponse(
    JSON.stringify({
      message: "User created successfully",
      user: {
        studentsAmount: 0,
        uuid: body.uid,
      },
    }),
    { status: 200 }
  );
}
