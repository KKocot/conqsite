import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const house = searchParams.get("house");
  const url = `${process.env.BOT_ORIGIN}/api/get_attendance?house=${house}`;
  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `${process.env.BOT_KEY}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
