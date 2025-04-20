import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import weaponSchema from "./schema";
import { Weapon } from "@/models/assets/weapon";

export async function POST(request: Request) {
  const headers = request.headers;
  if (headers.get("auth") !== process.env.BOT_KEY)
    return NextResponse.json({ status: 401 });
  try {
    await connectMongoDB();
    const data = weaponSchema.parse(await request.json());
    const response = await Weapon.create(data);

    return NextResponse.json({
      message: `Successfully added weapon`,
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
  const name = searchParams.get("name");
  try {
    await connectMongoDB();
    if (name) {
      const cleanName = name.replaceAll("_", " ");
      const weapon = await Weapon.findOne({ name: cleanName });
      return NextResponse.json({ weapon });
    } else {
      const weapons = await Weapon.find();
      return NextResponse.json({ weapons });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
