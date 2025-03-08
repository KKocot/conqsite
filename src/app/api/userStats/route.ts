import connectMongoDB from "@/lib/mongodb";
import UserStats from "@/models/userStats";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { highCommandAllowed } from "@/lib/endpoints-protections";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Roles from "@/models/roles";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const house = searchParams.get("house");

  try {
    await connectMongoDB();

    if (id) {
      const userStats = await UserStats.findOne({ id });
      const userAccount = id === session?.user.id;
      if (!userAccount) return new Response("401");
      return NextResponse.json(userStats, { status: 200 });
    }
    if (house) {
      const roles = await Roles.find({ house: house });
      const highCommandAccess = highCommandAllowed(roles, session, house);
      if (!highCommandAccess) return new Response("401");
      const userStats = await UserStats.find({ house });
      return NextResponse.json(userStats, { status: 200 });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
