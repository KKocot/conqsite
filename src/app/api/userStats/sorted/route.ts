import connectMongoDB from "@/lib/mongodb";
import UserStats from "@/models/userStats";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { highCommandAllowed } from "@/lib/endpoints-protections";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Roles from "@/models/roles";
import Seasons from "@/models/seasons";
import { SeasonProps, UsersStats } from "@/lib/get-data";

const isDateInRange = (
  date: string,
  startDate: string,
  endDate: string
): boolean => {
  const targetDate = new Date(date);
  return targetDate >= new Date(startDate) && targetDate <= new Date(endDate);
};

const mapAttendanceToSeasons = (
  attendance: string[],
  seasons: SeasonProps[]
) => {
  return seasons.map(({ season, startDate, endDate }) => ({
    season,
    dates: attendance.filter((date) => isDateInRange(date, startDate, endDate)),
  }));
};

const mapUserStats = (userStats: UsersStats[], seasons: SeasonProps[]) => {
  return userStats.map(({ id, nick, house, otherActivities, attendance }) => ({
    id,
    nick,
    house,
    otherActivities,
    attendance: mapAttendanceToSeasons(attendance, seasons),
  }));
};

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const house = searchParams.get("house");

  try {
    await connectMongoDB();
    if (house) {
      const roles = await Roles.find({ house: house });
      const highCommandAccess = highCommandAllowed(roles, session, house);
      if (!highCommandAccess) return new Response("401");
      const seasons = await Seasons.find();
      const userStats = await UserStats.find({ house });
      const sortedUser = mapUserStats(userStats, seasons);
      return NextResponse.json(sortedUser, { status: 200 });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
