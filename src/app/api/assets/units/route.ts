import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import unitAssetSchema from "./schema";
import UnitAsset from "@/models/assets/unit";

export async function POST(request: Request) {
  const headers = request.headers;
  if (headers.get("auth") !== process.env.BOT_KEY)
    return NextResponse.json({ status: 401 });

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
  const name = searchParams.get("name");
  try {
    await connectMongoDB();
    if (name) {
      const cleanName = name.replaceAll("_", " ");
      const unitAsset = await UnitAsset.findOne({ name: cleanName });
      return NextResponse.json({ unitAsset });
    }
    if (era) {
      const unitAssets = await UnitAsset.find({ era });
      return NextResponse.json({ unitAssets });
    } else {
      const unitAssets = await UnitAsset.find();
      const goldenEra = unitAssets.filter((unit) => unit.era === "golden");
      const heroicEra = unitAssets.filter((unit) => unit.era === "heroic");
      const blueEra = unitAssets.filter((unit) => unit.era === "blue");
      const greenEra = unitAssets.filter((unit) => unit.era === "green");
      const greyEra = unitAssets.filter((unit) => unit.era === "grey");
      const otherEra = unitAssets.filter((unit) => unit.era === "other");

      return NextResponse.json({
        goldenEra,
        heroicEra,
        blueEra,
        greenEra,
        greyEra,
        otherEra,
      });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
