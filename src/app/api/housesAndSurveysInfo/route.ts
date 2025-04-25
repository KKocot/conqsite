import connectMongoDB from "@/lib/mongodb";
import House from "@/models/house";
import Survey from "@/models/user/surveys";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request) {
  try {
    await connectMongoDB();
    const surveysNumber = await Survey.find().countDocuments();
    const housesNumber = await House.find().countDocuments();
    return NextResponse.json({ surveys: surveysNumber, houses: housesNumber });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
