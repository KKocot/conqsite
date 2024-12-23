import connectMongoDB from "@/lib/mongodb";
import Roles from "@/models/roles";
import { NextResponse } from "next/server";
import { putRolestSchema } from "./schema";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";
import { botAllowed, highestRolesAllowed } from "@/lib/endpoints-protections";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const discordKey = headers().get("discord-key");
  const envKey = process.env.BOT_KEY;
  const { searchParams } = new URL(request.url);
  const house = searchParams.get("house");

  if (!session) return new Response("401");
  try {
    await connectMongoDB();
    const roles = await Roles.find({ house: house });

    const highestRolesAccess = highestRolesAllowed(roles, session, house);
    if (discordKey && botAllowed(discordKey, envKey))
      return new Response("401");

    const data = putRolestSchema.parse(await request.json());
    const existingRole = await Roles.findOne({
      discordId: data.discordId,
    });

    let role;
    if (existingRole && highestRolesAccess) {
      role = await Roles.findByIdAndUpdate(existingRole._id, data, {
        new: true,
      });
    } else {
      role = await Roles.create(data);
    }

    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const house = searchParams.get("house");
  try {
    await connectMongoDB();
    if (id) {
      const roles = await Roles.find({ discordId: id });
      return NextResponse.json({ roles });
    }
    if (house) {
      const roles = await Roles.find({ house: house });
      return NextResponse.json({ roles });
    } else {
      const roles = await Roles.find();
      return NextResponse.json({ roles });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const house = searchParams.get("house");
  const discordKey = headers().get("discord-key");
  const envKey = process.env.BOT_KEY;
  const session = await getServerSession(authOptions);
  try {
    await connectMongoDB();
    const rolesLisy = await Roles.find();

    const highestRolesAccess = highestRolesAllowed(rolesLisy, session, house);

    if (!(highestRolesAccess || (discordKey && botAllowed(discordKey, envKey))))
      return new Response("401");

    const roles = await Roles.findOneAndDelete({ discordId: id });
    return NextResponse.json({ roles });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
