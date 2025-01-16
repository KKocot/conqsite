import connectMongoDB from "@/lib/mongodb";
import putUnitObjectSchema from "./shema";
import UnitWiki from "@/models/unit-wiki";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectMongoDB();
    const data = putUnitObjectSchema.parse(await request.json());
    const unitWiki = await UnitWiki.create(data);
    return NextResponse.json(unitWiki, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  try {
    await connectMongoDB();
    const unitWiki = await UnitWiki.find({ name });
    return NextResponse.json(unitWiki, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
