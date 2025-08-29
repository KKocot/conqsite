import { HouseDetails, Roles as Role } from "@/lib/get-data";
import connectMongoDB from "@/lib/mongodb";
import House from "@/models/house";
import Roles from "@/models/roles";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  try {
    await connectMongoDB();
    const houseDetails: HouseDetails | null = await House.findOne({ name });
    const houseLeader: Role | null = await Roles.findOne({
      house: name,
      role: "HouseLeader",
    });

    return new Response(JSON.stringify({ houseDetails, houseLeader }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
