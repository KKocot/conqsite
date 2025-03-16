import connectMongoDB from "@/lib/mongodb";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import UnitWiki from "@/models/unit-wiki";
import { ZodError } from "zod";
import veterancySchema from "./schema";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data = veterancySchema.parse(await request.json());
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
      return NextResponse.json({ message: "Unit not found" }, { status: 404 });
    }
    return NextResponse.json(wikiData, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
