import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  const url = `${process.env.BOT_ORIGIN}/api/send_lineup_url`;
  try {
    const requestBody = await request.json();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `${process.env.BOT_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      cache: "no-store",
    });
    const data = await response.json();
    console.log("data", data);
    return Response.json(data);
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
