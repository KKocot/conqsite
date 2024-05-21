import connectMongoDB from "@/lib/mongodb";
import Whitelist from "@/models/whitelist";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username } = await request.json();
  await connectMongoDB();
  await Whitelist.create({ username });
  return NextResponse.json({ message: "User created" }, { status: 201 });
}
