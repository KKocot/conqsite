import connectMongoDB from "@/lib/mongodb";
import Whitelist from "@/models/whitelist";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const discordKey = headers().get("discord-key");
  // if (!discordKey || discordKey !== process.env.BOT_KEY)
  //   return new Response("401");
  await connectMongoDB();
  await Whitelist.findOneAndDelete({ idDiscord: id });
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
