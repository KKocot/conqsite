import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const discordKey = headers().get("discord-key");

  // Allow access to all logged in users
  if (!(session || (discordKey && discordKey === process.env.BOT_KEY))) {
    return new Response("401");
  }

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

export async function DELETE(request: Request) {
  const discordKey = request.headers.get("discord-key");

  // Allow access only to the Discord Bot
  if (!discordKey || discordKey !== process.env.BOT_KEY)
    return new Response("401");

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    await connectMongoDB();
    await Survey.findByIdAndDelete(id);
    return NextResponse.json({ message: "Survey deleted" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
