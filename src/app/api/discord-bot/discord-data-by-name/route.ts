import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import HouseSettings from "@/models/houseSettings";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    const houseSettings = await HouseSettings.findOne({ name });
    if (!!houseSettings) {
      const response = await fetch(
        `${process.env.BOT_ORIGIN}/api/server_verification?guild_id=${houseSettings.id}&member_id=${session?.user.id}&tw_server=${houseSettings.id}`,
        {
          cache: "no-store",
          headers: {
            Authorization: `${process.env.BOT_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      return Response.json({
        roles: data.roles,
        channels: data.channels,
        default_channel: houseSettings.lineup[0].id,
        default_role_id: houseSettings.lineup[0].roleId,
      });
    }
    return NextResponse.json({ message: "House not found" }, { status: 404 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
