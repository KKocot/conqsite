import connectMongoDB from "@/lib/mongodb";
import Whitelist from "@/models/whitelist";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { idDiscord } = await request.json();
  await connectMongoDB();
  await Whitelist.create({ idDiscord });
  return NextResponse.json({ message: "User created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const whitelist = await Whitelist.find();
  return NextResponse.json({ whitelist });
}
