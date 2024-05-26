import connectMongoDB from "@/lib/mongodb";
import Users from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { usernameDiscord, idDiscord, role, points } = await request.json();
  await connectMongoDB();
  await Users.create({ usernameDiscord, idDiscord, role, points });
  return NextResponse.json({ message: "User created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const users = await Users.find();
  return NextResponse.json({ users });
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  await connectMongoDB();
  await Users.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
