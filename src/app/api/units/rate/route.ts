import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import putRateSchema from "./shema";
import Rate from "@/models/rate";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectMongoDB();
    const data = putRateSchema.parse(await request.json());
    const unitExist = await Rate.findOne({
      unit: data.unit,
    });
    if (!unitExist) {
      const unit = await Rate.create({
        unit: data.unit,
        votes: [{ id: session.user.id, rate: data.rate }],
      });
      return NextResponse.json(unit, { status: 201 });
    }
    if (unitExist) {
      const userExist = await Rate.findOne({
        unit: data.unit,
        "votes.id": session.user.id,
      }).select("votes.$");
      if (userExist) {
        const unit = await Rate.findOneAndUpdate(
          { unit: data.unit, "votes.id": session.user.id },
          {
            $set: { "votes.$.rate": data.rate },
          },
          { new: true }
        );
        return NextResponse.json(unit, { status: 200 });
      }
      if (!userExist) {
        const user = await Rate.findOneAndUpdate(
          { unit: data.unit },
          { $push: { votes: { id: session.user.id, rate: data.rate } } },
          { new: true }
        );
        return NextResponse.json(user, { status: 200 });
      }
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const unit = searchParams.get("unit");
  try {
    await connectMongoDB();
    if (unit) {
      const rate = await Rate.findOne({ unit: unit.replaceAll("_", " ") });
      return NextResponse.json(rate, { status: 200 });
    }
    return NextResponse.json(
      { message: "Please provide a unit" },
      { status: 400 }
    );
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
