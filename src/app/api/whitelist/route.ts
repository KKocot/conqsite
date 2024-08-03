import connectMongoDB from "@/lib/mongodb";
import Whitelist from "@/models/whitelist";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const { idDiscord } = await request.json();
  const discordKey = headers().get("discord-key");
  if (!discordKey || discordKey !== process.env.BOT_KEY)
    return new Response("401");
  await connectMongoDB();
  await Whitelist.create({ idDiscord });
  return NextResponse.json({ message: "User created" }, { status: 201 });
}

export async function GET() {
  const discordKey = headers().get("discord-key");
  if (!discordKey || discordKey !== process.env.BOT_KEY)
    return new Response("401");
  await connectMongoDB();
  const whitelist = await Whitelist.find();
  return NextResponse.json({ whitelist });
}
