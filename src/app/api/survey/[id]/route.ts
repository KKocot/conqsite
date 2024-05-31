import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const survey = await Survey.findOne({ discordId: id });
    return NextResponse.json({ survey }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  await connectMongoDB();
  await Survey.findByIdAndDelete(id);
  return NextResponse.json({ message: "Survey deleted" }, { status: 200 });
}
