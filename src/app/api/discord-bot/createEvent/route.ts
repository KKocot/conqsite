import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  const url = `http://bot.host2play.com:2005/api/create_event`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request.body),
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
