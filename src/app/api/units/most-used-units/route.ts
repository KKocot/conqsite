import connectMongoDB from "@/lib/mongodb";
import UnitAsset from "@/models/assets/unit";
import PublicLineup from "@/models/publicLineup";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(_request: Request) {
  try {
    await connectMongoDB();
    const publicData = await PublicLineup.aggregate([
      {
        $unwind: "$sheet",
      },
      {
        $project: {
          units: ["$sheet.unit1", "$sheet.unit2", "$sheet.unit3"],
        },
      },
      {
        $unwind: "$units",
      },
      {
        $match: {
          units: {
            $ne: "",
          },
        },
      },
      {
        $group: {
          _id: "$units",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const unitsAssets = await UnitAsset.find();
    const totalUsage = publicData.reduce((acc, curr) => acc + curr.count, 0);
    const findedUnits = unitsAssets
      .filter(
        (element) =>
          element.era !== "other" &&
          publicData.find((e) => e._id === element.name)
      )
      .map((unit) => {
        const unitAsset = publicData.find((e) => e._id === unit.name);
        const percentage = ((unitAsset.count / totalUsage) * 100).toFixed(2);

        return {
          id: unit.id,
          name: unit.name,
          image: unit.icon,
          rating: percentageToRate(Number(percentage)),
        };
      })
      .sort((a, b) => {
        if (a.rating > b.rating) return -1;
        if (a.rating < b.rating) return 1;
        return 0;
      })
      .slice(0, 9);

    return NextResponse.json(findedUnits, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

const percentageToRate = (percentage: number) => {
  if (percentage >= 10) return 10;
  if (percentage >= 9) return 9;
  if (percentage >= 8) return 8;
  if (percentage >= 7) return 7;
  if (percentage >= 6) return 6;
  if (percentage >= 5) return 5;
  if (percentage >= 4) return 4;
  if (percentage >= 3) return 3;
  if (percentage >= 2) return 2;
  return 1;
};
