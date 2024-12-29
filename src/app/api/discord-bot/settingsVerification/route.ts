import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const guild_id = searchParams.get("guild_id");
  const member_id = searchParams.get("member_id");
  const member = searchParams.get("member");
  const logs = searchParams.get("logs");
  const attendance = searchParams.get("attendance");
  const tw_server = searchParams.get("tw_server");
  const tw_member = searchParams.get("tw_member");

  const url = `http://bot.host2play.com:2005/api/server_verification?guild_id=${guild_id}&member_id=${member_id}&member=${member}&logs=${logs}&attendance=${attendance}&tw_server=${tw_server}&tw_member=${tw_member}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
