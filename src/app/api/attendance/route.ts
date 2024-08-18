import Attendance from "@/models/attendance";
import { attendanceSchema } from "./schema";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = attendanceSchema.parse(await request.json());
    await connectMongoDB();
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
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  await connectMongoDB();
  const attendance = await Attendance.find({
    house: searchParams.get("house"),
    date: searchParams.get("date"),
  });
  return NextResponse.json({ attendance });
}
