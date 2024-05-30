import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

const putSurveySchema = z.object({
  _id: z.string(),
  discordNick: z.string(),
  discordId: z.string(),
  inGameNick: z.string(),
  characterLevel: z.string(),
  artyAmount: z.enum(["none", "some", "average", "aLot"]),
  weapons: z.array(
    z.object({
      value: z.boolean(),
      leadership: z.number(),
    })
  ),
  units: z.object({
    low: z.array(
      z.object({
        id: z.number(),
        value: z.string(),
      })
    ),
    heroic: z.array(
      z.object({
        id: z.number(),
        value: z.string(),
      })
    ),
    golden: z.array(
      z.object({
        id: z.number(),
        value: z.string(),
      })
    ),
  }),
});

export async function PUT(request: Request) {
  try {
    const {
      _id,
      discordNick,
      discordId,
      inGameNick,
      characterLevel,
      artyAmount,
      weapons,
      units,
    } = putSurveySchema.parse(await request.json());
    await connectMongoDB();
    await Survey.findByIdAndUpdate(_id, {
      _id,
      discordNick,
      inGameNick,
      discordId,
      characterLevel,
      artyAmount,
      weapons,
      units,
    });
    return NextResponse.json({ message: "Survey updated" }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params: { discordId } }: { params: { discordId: string } }
) {
  try {
    await connectMongoDB();
    const survey = await Survey.findOne({ discordId }).exec();
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
