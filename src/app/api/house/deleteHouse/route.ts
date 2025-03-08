import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import House from "@/models/house";
import HouseAssets from "@/models/houseAssets";
import HouseSettings from "@/models/houseSettings";
import PublicLineup from "@/models/publicLineup";
import Roles from "@/models/roles";
import Survey from "@/models/surveys";
import Template from "@/models/template";
import UserStats from "@/models/userStats";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const house = searchParams.get("house");
  const session = await getServerSession(authOptions);
  try {
    await connectMongoDB();
    const houseLeader = await Roles.findOne({
      discordId: session?.user?.id,
      house: house,
      role: "HouseLeader",
    });
    if (!houseLeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const surveys = await Survey.updateMany(
      { house: house },
      { $pull: { house: house } }
    );
    const userStats = await UserStats.updateMany(
      { house: house },
      { $pull: { house: house } }
    );
    const houseCard = await House.findOneAndDelete({ name: house });
    const houseSettings = await HouseSettings.findOneAndDelete({ name: house });
    const houseAssets = await HouseAssets.findOneAndDelete({ name: house });
    const templates = await Template.deleteMany({ house });
    const publicLineups = await PublicLineup.deleteMany({ house });
    const roles = await Roles.deleteMany({ house });
    const response = {
      surveys: surveys,
      userStats: userStats,
      roles: roles,
      houseCard: houseCard,
      houseSettings: houseSettings,
      houseAssets: houseAssets,
      templates: templates,
      publicLineups: publicLineups,
      houseLeader: houseLeader,
    };
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
