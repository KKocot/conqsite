import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { planTemplateSchema } from "./schema";
import Roles from "@/models/roles";
import { highCommandAllowed } from "@/lib/endpoints-protections";
import PlanTemplate from "@/models/plan-template";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  try {
    await connectMongoDB();
    const data = planTemplateSchema.parse(await request.json());
    const roles = await Roles.find({ house: data.house });
    const highCommandAccess = highCommandAllowed(roles, session, data.house);

    if (!highCommandAccess) return new Response("401");

    const existingTemplate = await PlanTemplate.findOne({
      templateName: data.templateName,
      house: data.house,
    });

    let template;
    if (existingTemplate) {
      template = await PlanTemplate.findByIdAndUpdate(
        existingTemplate._id,
        data,
        {
          new: true,
        }
      );
    } else {
      template = await PlanTemplate.create(data);
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
    const highCommandAccess = highCommandAllowed(roles, session, query);

    if (!highCommandAccess) return new Response("401");

    const templates = await PlanTemplate.find({ house: query });
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
    const template = await PlanTemplate.findById(id);
    const roles = await Roles.find({ house: template.house });

    const highRolesAccess = highCommandAllowed(roles, session, template.house);

    if (!highRolesAccess) return new Response("401");

    await PlanTemplate.findByIdAndDelete(id);
    return NextResponse.json(
      { template, message: "Plan Template deleted" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
