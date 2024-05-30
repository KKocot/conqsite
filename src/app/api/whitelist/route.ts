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

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  await connectMongoDB();
  await Whitelist.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
