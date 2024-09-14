import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { headers } from "next/headers";
import HouseSettings from "@/models/houseSettings";
import putHouseSettingsSchema from "./shema";
import Roles from "@/models/roles";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const house = searchParams.get("house");

  try {
    await connectMongoDB();
    const data = putHouseSettingsSchema.parse(await request.json());
    const roles = await Roles.find({ house: house });
    const userRoles = roles
      .filter((e) => e.role === "RightHand" || e.role === "HouseLeader")
      .some((role) => role.discordId === session?.user?.id);

    // Allow access only to high roles
    // if (!userRoles) return new Response("401");

    const houseSettingsExists = await HouseSettings.findOne({
      id: house,
    });
    let houseSettings;
    if (houseSettingsExists) {
      houseSettings = await HouseSettings.findByIdAndUpdate(
        houseSettingsExists._id,
        data,
        {
          new: true,
        }
      );
    } else {
      houseSettings = await HouseSettings.create(data);
    }
    return NextResponse.json(houseSettings, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const house = searchParams.get("house");
  const discordKey = headers().get("discord-key");
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    const roles = await Roles.find({ house: house });
    const userRoles = roles.some(
      (role) => role.discordId === session?.user?.id
    );
    if (!userRoles || (discordKey && discordKey === process.env.BOT_KEY))
      return new Response("401");

    const houseSettings = await HouseSettings.findOne({
      id: house,
    });
    return new Response(JSON.stringify(houseSettings), { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
