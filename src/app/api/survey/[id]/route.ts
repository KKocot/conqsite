import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

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
