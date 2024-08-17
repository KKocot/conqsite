import connectMongoDB from "@/lib/mongodb";
import Roles from "@/models/roles";
import { NextResponse } from "next/server";
import { putRolestSchema } from "./schema";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const data = putRolestSchema.parse(await request.json());
    await connectMongoDB();
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
  await connectMongoDB();
  const roles = await Roles.find();
  return NextResponse.json({ roles });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await connectMongoDB();
  const roles = await Roles.findOneAndDelete({ discordId: id });

  return NextResponse.json({ roles });
}
