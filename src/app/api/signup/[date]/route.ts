import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import Signup from "@/models/signup";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params: { date } }: { params: { date: string } }
) {
  // const session = await getServerSession(authOptions);
  // const discordKey = headers().get("discord-key");
  // if (
  //   (!session && !discordKey) ||
  //   (discordKey && discordKey !== process.env.BOT_KEY)
  // )
  // return new Response("401");
  try {
    await connectMongoDB();
    const signup = await Signup.findOne({ date: date });
    return NextResponse.json({ signup }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params: { date } }: { params: { date: string } }
) {
  await connectMongoDB();
  await Signup.findOneAndDelete({ date: date });
  return NextResponse.json({ message: "List deleted" }, { status: 200 });
}
