import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { botAllowed } from "@/lib/endpoints-protections";

export async function GET(
  _request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const discordKey = headers().get("discord-key");
  const envKey = process.env.BOT_KEY;
  try {
    await connectMongoDB();
    const survey = await Survey.findOne({ discordId: id });
    const userAccess = survey?.discordId === session?.user.id;
    if (!(userAccess || (discordKey && botAllowed(discordKey, envKey))))
      return new Response("401");

    return NextResponse.json({ survey }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
