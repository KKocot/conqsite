import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const discordKey = headers().get("discord-key");
  const user_id = session?.user?.id;

  try {
    await connectMongoDB();
    const survey = await Survey.findOne({ discordId: id });
    if (
      !session ||
      !discordKey ||
      discordKey !== process.env.BOT_KEY ||
      user_id !== survey.discordId
    )
      return new Response("401");
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
  const discordKey = headers().get("discord-key");

  if (!discordKey || discordKey !== process.env.BOT_KEY)
    return new Response("401");

  await connectMongoDB();
  await Survey.findByIdAndDelete(id);
  return NextResponse.json({ message: "Survey deleted" }, { status: 200 });
}
