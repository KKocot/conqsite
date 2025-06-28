import connectMongoDB from "@/lib/mongodb";
import { OtherTacticalIcons } from "@/models/assets/otherIcons";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectMongoDB();
    const otherIcons = await OtherTacticalIcons.find();
    return NextResponse.json({ otherIcons });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
