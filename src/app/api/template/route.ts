import connectMongoDB from "@/lib/mongodb";
import Template from "@/models/template";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { putTemplateSchema } from "./schema";
import Roles from "@/models/roles";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  try {
    await connectMongoDB();
    const data = putTemplateSchema.parse(await request.json());
    const roles = await Roles.find({ house: data.house });

    const userRoles = roles.some(
      (role) => role.discordId === session?.user?.id
    );

    // Allow access only to high roles
    if (!userRoles) return new Response("401");

    const existingTemplate = await Template.findOne({
      templateName: data.templateName,
    });

    let template;
    if (existingTemplate) {
      template = await Template.findByIdAndUpdate(existingTemplate._id, data, {
        new: true,
      });
    } else {
      template = await Template.create(data);
    }

    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("house");
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    const roles = await Roles.find({ house: query });
    const userRoles = roles.some(
      (role) => role.discordId === session?.user?.id
    );

    // Allow access only to high roles
    if (!userRoles) return new Response("401");

    const templates = await Template.find({ house: query });
    return NextResponse.json({ templates });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    const template = await Template.findById(id);
    const roles = await Roles.find({ house: template.house });
    const userRoles = roles
      .filter((e) => e.role === "RightHand" || e.role === "HouseLeader")
      .some((role) => role.discordId === session?.user?.id);

    // Allow access only to house leaders and right hands
    if (!userRoles) return new Response("401");

    await Template.findByIdAndDelete(id);
    return NextResponse.json({ message: "Template deleted" }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
