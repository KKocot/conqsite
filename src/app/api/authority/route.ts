import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import Authority from "@/models/authority";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  try {
    await connectMongoDB();
    if (!token) return new Response("401");
    const auth = await Authority.findOne({ token });

    return NextResponse.json(auth, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  try {
    await connectMongoDB();
    await Authority.findOneAndDelete({
      token,
    });
    return NextResponse.json({ message: "Authority deleted" }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
