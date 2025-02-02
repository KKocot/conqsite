import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import Roles from "@/models/roles";
import UnitWiki from "@/models/unit-wiki";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import statusSchema from "./shema";

export async function POST(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    const reviewer = await Roles.findOne({
      discordId: session?.user.id,
      role: "Reviewer",
    });
    if (!session || !reviewer) return new Response("401");
    const data = statusSchema.parse(await request.json());
    const unitWiki = await UnitWiki.findByIdAndUpdate(
      id,
      { status: data.status, reviewNotes: data.reviewNotes },
      { new: true }
    );
    return NextResponse.json(unitWiki, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(
  _request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  try {
    await connectMongoDB();
    const reviewer = await Roles.findOne({
      discordId: session?.user.id,
      role: "Reviewer",
    });
    if (!session || !reviewer) return new Response("401");

    const wikiPost = await UnitWiki.findById(id);
    return NextResponse.json({ wikiPost }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
