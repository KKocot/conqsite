import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    discordNick,
    inGameNick,
    characterLevel,
    artyAmount,
    weapons,
    units,
  } = await request.json();
  await connectMongoDB();
  await Survey.updateOne(
    { _id: id },
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectMongoDB();
  const survey = await Survey.findOne({ _id: id });
  return NextResponse.json({ survey }, { status: 200 });
}
