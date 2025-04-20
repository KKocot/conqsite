import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { pageMDSchema } from "./schema";
import PageMD from "@/models/pagemd";

export async function POST(request: Request) {
  const headers = request.headers;
  if (headers.get("auth") !== process.env.BOT_KEY)
    return NextResponse.json({ status: 401 });

  try {
    await connectMongoDB();
    const data = pageMDSchema.parse(await request.json());
    const responses = await PageMD.create(data);

    return NextResponse.json({
      message: "Markdown updated",
      responses,
    });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  try {
    await connectMongoDB();
    const data = await PageMD.findOne({ page });
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
