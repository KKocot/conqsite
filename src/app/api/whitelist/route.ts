import connectMongoDB from "@/lib/mongodb";
import Whitelist from "@/models/whitelist";
import { NextResponse } from "next/server";
import { putWhitelistSchema } from "./shema";
import { ZodError } from "zod";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const discordKey = headers().get("discord-key");
  //Allow access only to the Discord Bot
  if (!discordKey || discordKey !== process.env.BOT_KEY)
    return new Response("401");
  try {
    await connectMongoDB();
    const data = putWhitelistSchema.parse(await request.json());
    const existingItem = await Whitelist.findOne({ idDiscord: data.idDiscord });
    let user;
    if (existingItem) {
      user = await Whitelist.findByIdAndUpdate(existingItem._id, data, {
        new: true,
      });
    } else {
      user = await Whitelist.create(data);
    }
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const discordKey = headers().get("discord-key");
  const { searchParams } = new URL(request.url);
  const query =
    searchParams.get("house") === "" ? undefined : searchParams.get("house");

  // Allow access only to the Discord Bot
  if (!discordKey || discordKey !== process.env.BOT_KEY)
    return new Response("401");

  try {
    await connectMongoDB();
    const whitelist = await Whitelist.find({ house: query });
    return NextResponse.json({ whitelist });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
