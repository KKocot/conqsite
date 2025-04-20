import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import kitSchema from "./schema";
import { Kit } from "@/models/assets/kit";

export async function POST(request: Request) {
  const headers = request.headers;
  if (headers.get("auth") !== process.env.BOT_KEY)
    return NextResponse.json({ status: 401 });

  try {
    await connectMongoDB();
    const data = kitSchema.parse(await request.json());
    const responses = await Kit.create(data);

    return NextResponse.json({
      message: "kit posted",
      responses,
    });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const unit = searchParams.get("unit");
  try {
    await connectMongoDB();
    if (unit) {
      const artilleryAsset = await Kit.find({
        unit: unit.replaceAll("_", " "),
      });
      return NextResponse.json({ artilleryAsset });
    } else {
      const artilleriesAsset = await Kit.find();
      return NextResponse.json({ artilleriesAsset });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
