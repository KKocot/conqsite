import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { headers } from "next/headers";
import HouseSettings from "@/models/houseSettings";
import putHouseSettingsSchema from "./shema";
import Roles from "@/models/roles";
import { botAllowed, highestRolesAllowed } from "@/lib/endpoints-protections";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const discordKey = headers().get("discord-key");
  const envKey = process.env.BOT_KEY;

  try {
    await connectMongoDB();
    const roles = await Roles.find({ house: name });

    const highestRolesAccess = highestRolesAllowed(roles, session, name);
    if (!(highestRolesAccess || (discordKey && botAllowed(discordKey, envKey))))
      return new Response("401");

    const data = putHouseSettingsSchema.parse(await request.json());
    const houseSettingsExists = await HouseSettings.findOne({
      name: name,
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
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  try {
    await connectMongoDB();
    const roles = await Roles.find({ house: name });

    const discordKey = headers().get("discord-key");
    const envKey = process.env.BOT_KEY;
    const highestRolesAccess = highestRolesAllowed(roles, session, name);

    if (!(highestRolesAccess || (discordKey && botAllowed(discordKey, envKey))))
      return new Response("401");

    let houseSettings;
    if (id) {
      houseSettings = await HouseSettings.findOne({
        id: id,
      });
    }
    if (name) {
      houseSettings = await HouseSettings.findOne({
        name: name,
      });
    }
    return new Response(JSON.stringify(houseSettings), { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
