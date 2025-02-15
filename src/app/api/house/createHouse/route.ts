import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import House from "@/models/house";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import Roles from "@/models/roles";
import putCreateHouseSchema from "./schema";
import HouseSettings from "@/models/houseSettings";
import Survey from "@/models/surveys";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const house = searchParams.get("house");
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    await connectMongoDB();
    const data = putCreateHouseSchema.parse(await request.json());

    //  Details
    const houseSettings = await House.create({
      name: house,
      description: data.description,
      country: data.country,
      discordLink: data.discordLink,
      avatar: data.avatar,
      server: data.server,
    });

    //  Config
    const houseDetails = await HouseSettings.create({
      name: house,
      id: data.guild_id,
      member: { name: data.member, id: data.member },
      lineup: data.lineup.map((lineup) => ({
        id: lineup.channelID,
        roleId: lineup.roleID,
        name: lineup.name,
      })),
      logs: { logs: data.logs, attendance: data.logs },
      tw: { server: data.tw_discord, member: data.tw_member },
    });
    //  Leader Role
    const leaderRole = await Roles.create({
      discordNick: session?.user.name,
      discordId: session?.user.id,
      role: "HouseLeader",
      house: house,
    });
    // Leader Survey
    const leaderSurvey = await Survey.findOneAndUpdate(
      { discordId: session?.user.id },
      house === "none"
        ? { $set: { house: [house] } }
        : { $push: { house: house } },
      { new: true }
    );
    //  Roles
    let highRoles = [];
    if (data.righthand.length > 0) {
      for (let i = 0; i < data.righthand.length; i++) {
        highRoles.push(
          await Roles.create({
            discordNick: data.righthand[i].username,
            discordId: data.righthand[i].id,
            role: "RightHand",
            house: house,
          })
        );
      }
    }
    if (data.highcommand.length > 0) {
      for (let i = 0; i < data.highcommand.length; i++) {
        highRoles.push(
          await Roles.create({
            discordNick: data.highcommand[i].username,
            discordId: data.highcommand[i].id,
            role: "HighCommand",
            house: house,
          })
        );
      }
    }
    return NextResponse.json(
      {
        settings: houseSettings,
        detaild: houseDetails,
        leader_role: leaderRole,
        leader_profile: leaderSurvey,
        commanders: highRoles,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
