import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { param }: { param: string }) {
  const {
    discordNick,
    inGameNick,
    characterLevel,
    artyAmount,
    weapons,
    units,
  } = await request.json();
  await connectMongoDB();
  await Survey.findByIdAndUpdate(
    { _id: param },
    {
      discordNick,
      inGameNick,
      characterLevel,
      artyAmount,
      weapons,
      units,
    }
  );
  return NextResponse.json({ message: "Survey updated" }, { status: 200 });
}

export async function GET(request: Request, { param }: { param: string }) {
  await connectMongoDB();
  const survey = await Survey.findOne({ _id: param });
  return NextResponse.json({ survey }, { status: 200 });
}
