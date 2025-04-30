import connectMongoDB from "@/lib/mongodb";
import UnitAsset from "@/models/assets/unit";
import Rate from "@/models/rate";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(_request: Request) {
  try {
    await connectMongoDB();
    const rate = await Rate.aggregate([
      {
        $project: {
          _id: 1,
          unit: 1,
          rate: "$votes.rate",
        },
      },
    ]);
    const unitsAssets = await UnitAsset.find();
    const units = rate.map((unit) => {
      const unitAsset = unitsAssets.find((asset) => asset.name === unit.unit);
      const evrageRate: number =
        unit.rate.reduce((acc: number, rate: number): number => acc + rate, 0) /
        unit.rate.length;
      const dividedRate: number = (evrageRate + unitAsset.value) / 2;
      return {
        id: unitAsset._id,
        name: unit.unit,
        image: unitAsset.icon,
        rating: Number(dividedRate.toFixed(0)),
        era: unitAsset.era,
      };
    });
    return NextResponse.json(units, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
