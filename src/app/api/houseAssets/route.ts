import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import houseAssetsSchema from "./shema";
import HouseAssets from "@/models/houseAssets";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data = houseAssetsSchema.parse(await request.json());
    const existingHouseAssetes = await HouseAssets.findOne({
      name: data.name,
    });
    let houseAssets;
    if (existingHouseAssetes) {
      houseAssets = await HouseAssets.findByIdAndUpdate(
        existingHouseAssetes._id,
        data,
        { new: true }
      );
    } else {
      houseAssets = await HouseAssets.create(data);
    }
    return NextResponse.json({ houseAssets });
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
    const houseAssets = await HouseAssets.findOne({ name: name });
    return NextResponse.json({ houseAssets });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
