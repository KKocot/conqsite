import connectMongoDB from "@/lib/mongodb";
import Roles from "@/models/roles";
import { NextResponse } from "next/server";
import { putRolestSchema } from "./schema";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    const data = putRolestSchema.parse(await request.json());
    const roles = await Roles.find({ house: data.house });
    const userRoles = roles
      .filter((e) => e.role === "RightHand" || e.role === "HouseLeader")
      .some((role) => role.discordId === session?.user?.id);

    // Allow access only to house leaders and right hands
    if (!userRoles) return new Response("401");
    const existingRole = await Roles.findOne({
      discordId: data.discordId,
    });

    let role;
    if (existingRole) {
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

export async function GET() {
  try {
    await connectMongoDB();
    const roles = await Roles.find();
    return NextResponse.json({ roles });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const discordKey = headers().get("discord-key");
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const roles = await Roles.findOneAndDelete({ discordId: id });
    const houseRoles = await Roles.find({ house: roles.house });
    const userRoles = houseRoles
      .filter((e) => e.role === "RightHand" || e.role === "HouseLeader")
      .some((role) => role.discordId === session?.user?.id);
    // Allow access only to house leaders and right hands and Discord Bot
    if (!userRoles || (discordKey && discordKey === process.env.BOT_KEY))
      return new Response("401");
    return NextResponse.json({ roles });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
