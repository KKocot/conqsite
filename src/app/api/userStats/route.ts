import connectMongoDB from "@/lib/mongodb";
import UserStats from "@/models/userStats";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import putUserStatsSchema from "./shema";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    await connectMongoDB();
    const data = putUserStatsSchema.parse(await request.json());
    const userStatsExists = await UserStats.findOne({ id });
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
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const house = searchParams.get("house");

  try {
    await connectMongoDB();
    if (id) {
      const userStats = await UserStats.findOne({ id });
      return NextResponse.json(userStats, { status: 200 });
    }
    if (house) {
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
