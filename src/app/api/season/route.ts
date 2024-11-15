import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { adminAllowed } from "@/lib/endpoints-protections";
import { putSeasonSchema } from "./shema";
import Season from "@/models/season";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!adminAllowed(session)) return new Response("401");
  try {
    await connectMongoDB();
    const data = putSeasonSchema.parse(await request.json());
    const existingSeason = await Season.findOne({
      numberOfSeason: data.numberOfSeason,
    });
    let season;
    if (existingSeason) {
      season = await Season.findByIdAndUpdate(existingSeason._id, data, {
        new: true,
      });
    } else {
      season = await Season.create(data);
    }
    return NextResponse.json(season, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) return new Response("401");
  try {
    await connectMongoDB();
    const seasons = await Season.find();
    const today = new Date();
    const currentSeason = seasons.find(
      (season) => season.start <= today && season.end >= today
    );
    return NextResponse.json({ seasons, currentSeason });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
