import connectMongoDB from "@/lib/mongodb";
import Template from "@/models/template";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { putTemplateSchema } from "./schema";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const data = putTemplateSchema.parse(await request.json());
    // if (!session) return new Response("401");
    await connectMongoDB();

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
  await connectMongoDB();
  const surveys = await Template.find({ house: query });
  // if (
  //   (!session && !discordKey) ||
  //   (discordKey && discordKey !== process.env.BOT_KEY)
  // )
  // return new Response("401");

  //TODO: Check if user is on right whitelist
  return NextResponse.json({ surveys });
}
