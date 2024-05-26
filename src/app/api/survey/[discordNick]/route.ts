import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";

interface Params {
  discordNick: string;
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    newDiscordNick: discordNick,
    newInGameNick: inGameNick,
    newCharacterLevel: characterLevel,
    neArtyAmount: artyAmount,
    newWeapons: weapons,
    newUnits: units,
  } = await request.json();
  await connectMongoDB();
  await Survey.findByIdAndUpdate(id, {
    discordNick,
    inGameNick,
    characterLevel,
    artyAmount,
    weapons,
    units,
  });
  return NextResponse.json({ message: "Survey updated" }, { status: 200 });
}

export async function GET(
  request: Request,
  { params }: { params: { discordNick: string } }
) {
  try {
    const { discordNick } = params;
    await connectMongoDB();
    const survey = await Survey.findOne({ discordNick }).exec();
    if (!survey) {
      return new NextResponse(JSON.stringify({ error: "Survey not found" }), {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify({ survey }), { status: 200 });
  } catch (error) {
    console.error("Error fetching survey:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
