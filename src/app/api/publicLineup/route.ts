import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { putPublicLineupSchema } from "./schema";
import PublicLineup from "@/models/publicLineup";
import { log } from "console";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  try {
    await connectMongoDB();
    const data = putPublicLineupSchema.parse(await request.json());

    // Allow access only users
    if (!session) return new Response("401");

    const existingPublicLineup = await PublicLineup.findOne({
      house: data.house,
      name: data.name,
      date: data.date,
    });

    let publicLineup;
    if (existingPublicLineup) {
      publicLineup = await PublicLineup.findByIdAndUpdate(
        existingPublicLineup._id,
        data,
        {
          new: true,
        }
      );
    } else {
      publicLineup = await PublicLineup.create(data);
    }

    return NextResponse.json(publicLineup, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const house = searchParams.get("house");
  const date = searchParams.get("date");
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    // Allow access only to high roles
    if (!session) return new Response("401");
    if (house && date) {
      const publicLineup = await PublicLineup.find({
        house: house,
        date: date,
      });
      return NextResponse.json({ publicLineup });
    }
    if (house && !date) {
      const publicLineup = await PublicLineup.find({
        house: house,
      });

      return NextResponse.json(publicLineup.map((lineup) => lineup.date));
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const house = searchParams.get("house");
  const date = searchParams.get("date");
  const name = searchParams.get("name");

  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    if (!session) return new Response("401");
    await PublicLineup.findOneAndDelete({
      house: house,
      date: date,
      name: name,
    });
    return NextResponse.json({ message: "Sheet deleted" }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
