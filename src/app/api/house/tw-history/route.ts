import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { twHistorySchema } from "./shema";
import TWHistory from "@/models/house/twHistory";
import { ZodError } from "zod";
import { NextResponse } from "next/server";
import Survey from "@/models/user/surveys";
import Roles from "@/models/roles";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("401");
  try {
    await connectMongoDB();
    const survey = await Survey.findOne({ discordId: session.user.id });
    const userHouses: string[] = survey
      ? survey.houses === "none"
        ? []
        : survey.house
      : [];
    const data = twHistorySchema.parse(await request.json());
    if (!userHouses.some((house) => house === data.house)) {
      return new Response("401");
    }
    const publicHistory = await TWHistory.create(data);
    return new Response(JSON.stringify(publicHistory), { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const house = searchParams.get("house");
  const twDate = searchParams.get("date");
  try {
    await connectMongoDB();
    const survey = await Survey.findOne({ discordId: session?.user.id, house });
    const role = await Roles.findOne({ discordId: session?.user.id, house });
    // if (!survey) return new Response("401");
    if (house && twDate) {
      const houseHistory = await TWHistory.find({ house, twDate }).sort({
        twDate: -1,
      });
      const houseVisible = houseHistory.filter(
        (history) => history.visibleTo === "House"
      );
      if (role) {
        return new Response(JSON.stringify(houseHistory), { status: 200 });
      } else return new Response(JSON.stringify(houseVisible), { status: 200 });
    }
    if (!house && session && twDate) {
      const houseHistory = await TWHistory.find({
        twDate,
        authorID: session.user.id,
      }).sort({
        twDate: -1,
      });
      return new Response(JSON.stringify(houseHistory), { status: 200 });
    } else return new Response(JSON.stringify([]), { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
