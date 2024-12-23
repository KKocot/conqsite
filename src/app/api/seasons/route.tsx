import connectMongoDB from "@/lib/mongodb";
import Seasons from "@/models/seasons";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data = await request.json();
    const season = new Seasons(data);
    await season.create();
    return NextResponse.json({ message: "Season created successfully" });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectMongoDB();
    const seasons = await Seasons.find();
    return NextResponse.json({ seasons });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
