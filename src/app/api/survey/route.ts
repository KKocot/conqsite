import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const surveys = await Survey.find();
  return NextResponse.json({ surveys });
}
export async function POST(request: Request) {
  const {
    discordNick,
    inGameNick,
    discordId,
    characterLevel,
    artyAmount,
    weapons,
    units,
  } = await request.json();
  await connectMongoDB();
  await Survey.create({
    discordNick,
    inGameNick,
    discordId,
    characterLevel,
    artyAmount,
    weapons,
    units,
  });
  return NextResponse.json({ message: "Survey created" }, { status: 201 });
}
