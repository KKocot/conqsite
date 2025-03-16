import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const guild_id = searchParams.get("guild_id");
  const member_id = searchParams.get("member_id");
  const tw_server = searchParams.get("tw_server");

  const url = `${process.env.BOT_ORIGIN}/api/server_verification?guild_id=${guild_id}&member_id=${member_id}&tw_server=${tw_server}`;
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
