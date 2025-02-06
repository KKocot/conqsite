import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import TWHistory from "@/models/house/twHistory";
import Roles from "@/models/roles";
import Survey from "@/models/surveys";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const house = searchParams.get("house");
  try {
    await connectMongoDB();
    const survey = await Survey.findOne({ discordId: session?.user.id, house });
    const role = await Roles.findOne({ discordId: session?.user.id, house });
    // if (!survey) return new Response("401");
    if (house) {
      const houseHistory = await TWHistory.find({ house }).sort({ twDate: -1 });
      const houseVisible = houseHistory.filter(
        (history) => history.visibleTo === "House"
      );
      if (role) {
        return new Response(JSON.stringify(houseHistory.map((e) => e.twDate)), {
          status: 200,
        });
      } else
        return new Response(JSON.stringify(houseVisible.map((e) => e.twDate)), {
          status: 200,
        });
    }
    if (session) {
      const houseHistory = await TWHistory.find({
        authorID: session.user.id,
      }).sort({ twDate: -1 });
      return new Response(JSON.stringify(houseHistory.map((e) => e.twDate)), {
        status: 200,
      });
    } else new Response(JSON.stringify([])), { status: 200 };
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
