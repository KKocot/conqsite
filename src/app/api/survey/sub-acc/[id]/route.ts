import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SubSurvey from "@/models/user/subSurvey";
import { Survey } from "@/lib/get-data";

export async function GET(
  _request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  try {
    await connectMongoDB();
    const subSurvey: Survey[] = await SubSurvey.find({ discordId: id });
    if (subSurvey.length === 0) {
      return new Response(JSON.stringify({ subSurvey: [] }), { status: 200 });
    }
    const userAccess = subSurvey[0].discordId === session?.user.id;
    if (!userAccess) return new Response("401");

    return NextResponse.json({ subSurvey }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  try {
    await connectMongoDB();
    const subSurveys: Survey[] = await SubSurvey.find({
      discordId: session?.user.id,
    });
    const findSubSurvey = subSurveys.find(
      (survey) => survey.discordNick === id
    );
    if (findSubSurvey) {
      const deletedSubSurvey = await SubSurvey.findByIdAndDelete(
        findSubSurvey._id
      );
      return new Response(deletedSubSurvey, { status: 200 });
    }
    return new Response("Sub survey not found", { status: 404 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
