import connectMongoDB from "@/lib/mongodb";
import UserStats from "@/models/userStats";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import putUserStatsSchema from "./shema";
import { botAllowed, highCommandAllowed } from "@/lib/endpoints-protections";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Roles from "@/models/roles";

export async function POST(request: Request) {
  const discordKey = headers().get("discord-key");
  const envKey = process.env.BOT_KEY;
  const botAccess = discordKey ? botAllowed(discordKey, envKey) : false;
  if (!botAccess) return new Response("401");
  try {
    await connectMongoDB();
    const data = putUserStatsSchema.parse(await request.json());
    const userStatsExists = await UserStats.findOne({ id: data.id });
    let userStats;
    if (userStatsExists) {
      userStats = await UserStats.findByIdAndUpdate(userStatsExists._id, data, {
        new: true,
      });
    } else {
      userStats = await UserStats.create(data);
    }
    return NextResponse.json(userStats, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const house = searchParams.get("house");
  const discordKey = headers().get("discord-key");
  const envKey = process.env.BOT_KEY;

  try {
    await connectMongoDB();

    if (id) {
      const userStats = await UserStats.findOne({ id });
      const userAccount = id === session?.user.id;
      if (!(userAccount || (discordKey && botAllowed(discordKey, envKey))))
        return new Response("401");
      return NextResponse.json(userStats, { status: 200 });
    }
    if (house) {
      const roles = await Roles.find({ house: house });
      const highCommandAccess = highCommandAllowed(roles, session, house);
      if (
        !(highCommandAccess || (discordKey && botAllowed(discordKey, envKey)))
      )
        return new Response("401");
      const userStats = await UserStats.find({ house });
      return NextResponse.json(userStats, { status: 200 });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
