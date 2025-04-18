import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { leaderRoleAllowed } from "@/lib/endpoints-protections";
import Roles from "@/models/roles";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { changeLeaderSchema } from "./shema";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) return new Response("401");
  try {
    await connectMongoDB();
    const data = changeLeaderSchema.parse(await request.json());
    const roles = await Roles.find({ house: data.house });

    const leaderRoleAccess = leaderRoleAllowed(roles, session, data.house);
    if (!leaderRoleAccess) return new Response("401");

    const newLeader = await Roles.create({
      discordId: data.newLeaderId,
      discordNick: data.newLeaderName,
      role: "HouseLeader",
      house: data.house,
    });
    let exLeader;
    if (data.exLeaderNewRole === "member") {
      exLeader = await Roles.findOneAndDelete({
        discordId: data.exLeaderId,
        house: data.house,
      });
    } else {
      exLeader = await Roles.findOneAndUpdate(
        { discordId: data.exLeaderId },
        {
          role: data.exLeaderNewRole,
        }
      );
    }
    return NextResponse.json({ newLeader, exLeader }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
