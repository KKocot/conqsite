import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { notificationSchema } from "./shema";
import Notification from "@/models/notification";

export async function POST(request: Request) {
  const discordKey = headers().get("discord-key");
  const session = await getServerSession(authOptions);
  try {
    if (!session || (discordKey && discordKey === process.env.BOT_KEY))
      return new Response("401");
    await connectMongoDB();
    const data = notificationSchema.parse(await request.json());
    const existingNotification = await Notification.findOne({ id: data.id });
    let notification;
    if (existingNotification) {
      notification = await Notification.findByIdAndUpdate(
        existingNotification._id,
        data,
        { new: true }
      );
    } else {
      notification = await Notification.create(data);
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const date = searchParams.get("date");
  const session = await getServerSession(authOptions);
  try {
    await connectMongoDB();
    if (!session) return new Response("401");
    if (id) {
      const notification = await Notification.findOne({ id: id });
      return NextResponse.json({ notification });
    }
    if (date) {
      const notifications = await Notification.find({ date: date });
      return NextResponse.json({ notifications });
    }
    const notifications = await Notification.find();
    return NextResponse.json({ notifications });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
