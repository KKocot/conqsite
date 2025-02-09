import connectMongoDB from "@/lib/mongodb";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import UnitWiki from "@/models/unit-wiki";
import { ZodError } from "zod";
import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { blueUnits, greenUnits } from "@/assets/low-units-data";
import veterancySchema from "./schema";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data = veterancySchema.parse(await request.json());
    const assetsData = [...goldenUnits, ...heroicUnits, ...blueUnits].find(
      (unit) => unit.name === data.name
    );
    let wikiData;
    const dataExists = await UnitWiki.find({
      name: data.name,
      status: "accepted",
    });
    if (dataExists.length !== 0) {
      wikiData = await UnitWiki.findOneAndUpdate(
        { _id: dataExists[dataExists.length - 1]._id },
        { treeStructure: data.treeStructure },
        {
          new: true,
        }
      );
    } else {
      wikiData = await UnitWiki.create({
        ...data,
        image: assetsData?.src,
        era: assetsData?.era,
        icon: assetsData?.icon,
        masteryPoints: assetsData?.masteryPoints,
        status: "accepted",
      });
    }
    return NextResponse.json(wikiData, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
