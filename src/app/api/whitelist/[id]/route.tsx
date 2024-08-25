import connectMongoDB from "@/lib/mongodb";
import Whitelist from "@/models/whitelist";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { headers } from "next/headers";

export async function DELETE({ params: { id } }: { params: { id: string } }) {
  const discordKey = headers().get("discord-key");

  //Allow access only to the Discord Bot
  if (!discordKey || discordKey !== process.env.BOT_KEY)
    return new Response("401");

  try {
    await connectMongoDB();
    await Whitelist.findOneAndDelete({ idDiscord: id });
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
