import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import House from "@/models/house";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { putHouseSchema } from "./shema";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("401");
  try {
    await connectMongoDB();
    const data = putHouseSchema.parse(await request.json());
    const existingHouse = await House.findOne({ name: data.name });
    let publicHouse;
    if (existingHouse) {
      publicHouse = await House.findByIdAndUpdate(existingHouse._id, data, {
        new: true,
      });
    } else {
      publicHouse = await House.create(data);
    }
    return new Response(JSON.stringify(publicHouse), { status: 201 });
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
      const house = await House.findOne({ name });
      return new Response(JSON.stringify(house), { status: 200 });
    } else {
      const houses = await House.find();
      return new Response(JSON.stringify(houses), { status: 200 });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
