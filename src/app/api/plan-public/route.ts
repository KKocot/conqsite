import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  highCommandAllowed,
  houseUserAllowed,
} from "@/lib/endpoints-protections";
import Roles from "@/models/roles";
import Survey from "@/models/user/surveys";
import { planPublicSchema } from "./schema";
import PlanPublic from "@/models/plan-public";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    const data = planPublicSchema.parse(await request.json());
    const roles = await Roles.find({ house: data.house });

    const highCommandAccess = highCommandAllowed(roles, session, data.house);
    if (!highCommandAccess) return new Response("401");
    const existingPublicPlan = await PlanPublic.findOne({
      publicName: data.publicName,
      house: data.house,
    });

    let publicPlan;
    if (existingPublicPlan) {
      publicPlan = await PlanPublic.findByIdAndUpdate(
        existingPublicPlan._id,
        data,
        {
          new: true,
        }
      );
    } else {
      publicPlan = await PlanPublic.create(data);
    }
    return NextResponse.json(publicPlan, { status: 201 });
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
  const planName = searchParams.get("planName");
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    const survey = await Survey.findOne({ discordId: session?.user.id });
    const houseUserAccess = houseUserAllowed(survey, house);
    if (!houseUserAccess) return new Response("401");

    if (house && planName) {
      const publicPlan = await PlanPublic.find({
        house: house,
        publicName: planName,
      });
      return NextResponse.json({ publicPlan });
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
  const planName = searchParams.get("name");
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    const roles = await Roles.find({ house: house });
    const highCommandsAccess = highCommandAllowed(roles, session, house);
    if (!highCommandsAccess) return new Response("401");

    await PlanPublic.findOneAndDelete({
      house: house,
      publicName: planName,
    });
    return NextResponse.json(
      { house, message: "Plan deleted" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
