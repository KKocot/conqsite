import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import TWHistory from "@/models/house/twHistory";
import Roles from "@/models/roles";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    const roles = await Roles.find({ discordId: session?.user.id });
    const historyPost = await TWHistory.findByIdAndUpdate(id, {
      visibleTo: "Me",
    });
    if (!roles.some((role) => role.house === historyPost.house)) {
      return NextResponse.json("Authorization failed", { status: 401 });
    } else {
      return NextResponse.json(
        { historyPost, message: "History post updated" },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    const historyPost = await TWHistory.findOneAndDelete({
      _id: id,
    });

    if (historyPost.authorID !== session?.user.id) {
      return NextResponse.json("Authorization failed", { status: 401 });
    } else {
      return NextResponse.json(
        { historyPost, message: "History post deleted" },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
