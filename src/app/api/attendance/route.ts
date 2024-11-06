import Attendance from "@/models/attendance";
import { attendanceSchema } from "./schema";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Roles from "@/models/roles";
import { ZodError } from "zod";
import { headers } from "next/headers";
import { botAllowed, highCommandAllowed } from "@/lib/endpoints-protections";

export async function POST(request: Request) {
  const discordKey = headers().get("discord-key");
  const envKey = process.env.BOT_KEY;
  const botAccess = discordKey ? botAllowed(discordKey, envKey) : false;

  try {
    await connectMongoDB();
    if (!botAccess) return new Response("401");
    const data = attendanceSchema.parse(await request.json());
    const existingAttendance = await Attendance.findOne({
      date: data.date,
      house: data.house,
    });

    let attendance;
    if (existingAttendance) {
      attendance = await Attendance.findByIdAndUpdate(
        existingAttendance._id,
        data,
        {
          new: true,
        }
      );
    } else {
      attendance = await Attendance.create(data);
    }

    return NextResponse.json(attendance, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const house = searchParams.get("house");
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();
    const roles = await Roles.find({ house: house });

    const highCommandAccess = highCommandAllowed(roles, session, house);
    if (!highCommandAccess) return new Response("401");

    const attendance = await Attendance.find({
      house: house,
      date: date,
    });
    return NextResponse.json({ attendance });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
