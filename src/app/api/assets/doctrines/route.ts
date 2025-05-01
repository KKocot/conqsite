import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import doctrineSchema from "./schema";
import { Doctrine } from "@/models/assets/doctrine";
import { DoctrineType, UnitAsset } from "@/lib/get-data";
import UnitTypes from "@/models/assets/unit";

export async function POST(request: Request) {
  const headers = request.headers;
  if (headers.get("auth") !== process.env.BOT_KEY)
    return NextResponse.json({ status: 401 });

  try {
    await connectMongoDB();
    const data = await request.json();
    const doctrines = Array.isArray(data) ? data : [data];

    const validatedDoctrines = doctrines.map((doctrine) =>
      doctrineSchema.parse(doctrine)
    );
    const response = await Doctrine.insertMany(validatedDoctrines);

    return NextResponse.json({
      message: `Successfully added ${response.length} doctrines`,
      response,
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
  const rarity = searchParams.get("rarity");
  const unit = searchParams.get("unit");

  try {
    await connectMongoDB();
    if (unit) {
      const unitName = unit.replaceAll("_", " ");
      const doctrineAsset = await Doctrine.find();
      const unitAssets = await UnitTypes.findOne({
        name: unitName,
      });

      const doctrines = doctrineAsset.filter((doctrine) => {
        // Check for "all" type doctrines
        if (doctrine.dedicated === "all") return true;

        // Check for unit-specific doctrines
        if (
          doctrine.dedicated === "unit" &&
          doctrine.forUnit &&
          doctrine.forUnit.includes(unitName)
        ) {
          return true;
        }

        // Check for group doctrines
        if (doctrine.dedicated === "group" && doctrine.forUnit) {
          if (doctrine.forUnit.includes(unitName)) return true;

          if (unitAssets && unitAssets.types) {
            const type0 = unitAssets.types[0];
            const type1 = unitAssets.types[1];

            if (type0 && doctrine.forUnit.includes(type0)) return true;
            if (type1 && doctrine.forUnit.includes(type1)) return true;
            if (
              type0 &&
              type1 &&
              doctrine.forUnit.includes(`${type1} ${type0}`)
            )
              return true;
          }
        }

        return false;
      });
      return NextResponse.json(doctrines);
    }
    if (rarity) {
      const doctrineAsset = await Doctrine.findOne({ rarity });
      return NextResponse.json(doctrineAsset);
    }
    const doctrines = await Doctrine.find();
    return NextResponse.json(doctrines);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// const unitDoctrines = doctrineAsset.map((doctrine) => {
//   if (doctrine.dedicated === "all") {
//     doctrines.push(doctrine);
//   }
//   if (
//     doctrine.dedicated === "unit" &&
//     doctrine.forUnit.includes(unitName)
//   ) {
//     doctrines.push(doctrine);
//   }
//   if (doctrine.dedicated === "group") {
//     if (doctrine.forUnit.includes(unitName)) {
//       doctrines.push(doctrine);
//     }
//     if (unitAssets && doctrine.forUnit.includes(unitAssets.types[0])) {
//       doctrines.push(doctrine);
//     }
//     if (unitAssets && doctrine.forUnit.includes(unitAssets.types[1])) {
//       doctrines.push(doctrine);
//     }
//     if (
//       unitAssets &&
//       doctrine.forUnit.includes(
//         unitAssets.types[1] + " " + unitAssets.types[0]
//       )
//     ) {
//       doctrines.push(doctrine);
//     }
//   }
// });
