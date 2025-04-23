import connectMongoDB from "@/lib/mongodb";
import UnitAsset from "@/models/assets/unit";
import Rate from "@/models/rate";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  try {
    await connectMongoDB();
    if (userId) {
      const rate = await Rate.aggregate([
        {
          $unwind: "$votes",
        },
        {
          $match: {
            "votes.id": userId,
          },
        },
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
        return {
          id: unitAsset._id,
          name: unit.unit,
          image: unitAsset.icon,
          rating: unit.rate,
          era: unitAsset.era,
        };
      });
      console.log(units);
      return NextResponse.json(units, { status: 200 });
    }
    return NextResponse.json(
      { message: "Please provide a unit" },
      { status: 400 }
    );
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
