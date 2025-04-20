import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import artillerySchema from "./schema";
import Artillery from "@/models/assets/artillery";

export async function POST(request: Request) {
  const headers = request.headers;
  if (headers.get("auth") !== process.env.BOT_KEY)
    return NextResponse.json({ status: 401 });

  try {
    await connectMongoDB();
    const data = artillerySchema.parse(await request.json());
    const response = await Artillery.create(data);
    return NextResponse.json({ message: "Artillery posted", response });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  try {
    await connectMongoDB();
    if (name) {
      const artilleryAsset = await Artillery.findOne({ name });
      return NextResponse.json({ artilleryAsset });
    } else {
      const artilleriesAsset = await Artillery.find();
      return NextResponse.json({ artilleriesAsset });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
