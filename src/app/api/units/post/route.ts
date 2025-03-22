import connectMongoDB from "@/lib/mongodb";
import putUnitPostSchema from "./schema";
import UnitPost from "@/models/unit-post";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data = putUnitPostSchema.parse(await request.json());
    const userPost = await UnitPost.create(data);
    return NextResponse.json(userPost, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const unit = searchParams.get("unit");
  const id = searchParams.get("id");
  try {
    await connectMongoDB();
    if (id) {
      const userPost = await UnitPost.findById(id);
      return NextResponse.json(userPost, { status: 200 });
    }
    if (unit) {
      const userPost = await UnitPost.find({ unit: unit.replaceAll("_", " ") });
      return NextResponse.json(userPost, { status: 200 });
    }
    const userPost = await UnitPost.find();
    return NextResponse.json(userPost, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
