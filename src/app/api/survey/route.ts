import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/whitelist";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    discordNick,
    inGameNick,
    characterLevel,
    artyAmount,
    weapons,
    units,
  } = await request.json();
  await connectMongoDB();
  await Survey.create({
    discordNick,
    inGameNick,
    characterLevel,
    artyAmount,
    weapons,
    units,
  });
  return NextResponse.json({ message: "Survey added" }, { status: 201 });
}
