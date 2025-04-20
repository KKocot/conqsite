import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import doctrineSchema from "./schema";
import { Doctrine } from "@/models/assets/doctrine";

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
  const headers = request.headers;
  const { searchParams } = new URL(request.url);
  const rarity = searchParams.get("rarity");
  const unit = searchParams.get("unit");

  try {
    await connectMongoDB();
    if (unit) {
      const doctrineAsset = await Doctrine.find({
        forUnit: unit.replaceAll("_", " "),
      });
      return NextResponse.json(doctrineAsset);
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
