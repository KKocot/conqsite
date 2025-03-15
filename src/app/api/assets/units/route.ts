import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import unitAssetSchema from "./schema";
import UnitAsset from "@/models/unit-asset";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data = unitAssetSchema.parse(await request.json());
    const response = await UnitAsset.create(data);
    return NextResponse.json({ message: "Unit posted", response });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const era = searchParams.get("era");
  try {
    await connectMongoDB();
    if (era) {
      const unitAssets = await UnitAsset.find({ era });
      return NextResponse.json({ unitAssets });
    } else {
      const unitAssets = await UnitAsset.find();
      return NextResponse.json({ unitAssets });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
