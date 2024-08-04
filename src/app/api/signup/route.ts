import connectMongoDB from "@/lib/mongodb";
import Signup from "@/models/signup";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { putSignUpSchema } from "./shema";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const discordKey = headers().get("discord-key");

  if (!discordKey || discordKey !== process.env.BOT_KEY)
    return new Response("401");
  try {
    const data = putSignUpSchema.parse(await request.json());
    await connectMongoDB();
    const signup = await Signup.create(data);
    return NextResponse.json(signup, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const discordKey = headers().get("discord-key");
  if (
    (!session && !discordKey) ||
    (discordKey && discordKey !== process.env.BOT_KEY)
  )
    return new Response("401");

  await connectMongoDB();
  const signup = await Signup.find();
  return NextResponse.json({ signup });
}
