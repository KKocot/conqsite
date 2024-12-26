import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import authoritySchema from "./schema";
import Authority from "@/models/authority";
import { headers } from "next/headers";
import { botAllowed } from "@/lib/endpoints-protections";

export async function POST(request: Request) {
  const discordKey = headers().get("discord-key");
  const envKey = process.env.BOT_KEY;
  const botAccess = discordKey ? botAllowed(discordKey, envKey) : false;
  if (!botAccess) return new Response("401");

  try {
    await connectMongoDB();
    const data = authoritySchema.parse(await request.json());
    const auth = await Authority.create(data);

    return NextResponse.json(auth, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  try {
    await connectMongoDB();
    if (!token) return new Response("401");
    const auth = await Authority.findOne({ token });

    return NextResponse.json(auth, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  try {
    await connectMongoDB();
    await Authority.findOneAndDelete({
      token,
    });
    return NextResponse.json({ message: "Authority deleted" }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
