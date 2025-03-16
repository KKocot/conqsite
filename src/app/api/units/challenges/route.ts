import connectMongoDB from "@/lib/mongodb";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import challengesSchema from "./shema";
import UnitWiki from "@/models/unit-wiki";
import { ZodError } from "zod";
import UnitAsset from "@/models/unit-asset";

export async function POST(request: Request) {
  const privateKey = headers().get("private-key");
  if (!privateKey || privateKey !== process.env.PRIVATE_KEY) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectMongoDB();
    const data = challengesSchema.parse(await request.json());

    let wikiData;
    const dataExists = await UnitWiki.find({
      name: data.name,
      status: "accepted",
    });
    if (dataExists.length !== 0) {
      wikiData = await UnitWiki.findOneAndUpdate(
        { _id: dataExists[dataExists.length - 1]._id },
        { challenges: data.challenges },
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
