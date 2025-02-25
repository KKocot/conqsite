import { botAllowed, highCommandAllowed } from "@/lib/endpoints-protections";
import connectMongoDB from "@/lib/mongodb";
import { headers } from "next/headers";
import { putEventSchema } from "./shema";
import Event from "@/models/events";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Roles from "@/models/roles";
import { BotEvent } from "@/lib/get-data";

type Item = {
  name: string;
  status: string;
  lineup: string;
  userId: string;
};
export async function POST(request: Request) {
  const discordKey = headers().get("discord-key");
  const envKey = process.env.BOT_KEY;
  const botAccess = discordKey ? botAllowed(discordKey, envKey) : false;
  // if (!botAccess) return new Response("401");
  try {
    await connectMongoDB();
    const data = putEventSchema.parse(await request.json());
    const existingEvent = await Event.findOne({ _id: data._id });
    let event;
    if (existingEvent) {
      const updatedSignUps = data.signUps.reduce(
        (acc: Item[], signUp: Item) => {
          const index: number = acc.findIndex(
            (item: Item) => item.userId === signUp.userId
          );
          if (index !== -1) {
            acc.splice(index, 1);
          }
          acc.push(signUp);
          return acc;
        },
        []
      );
      event = await Event.findByIdAndUpdate(
        existingEvent._id,
        { ...data, signUps: updatedSignUps },
        {
          new: true,
        }
      );
    } else {
      event = await Event.create(data);
    }
    return new Response(JSON.stringify(event), { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const discordKey = headers().get("discord-key");
  const envKey = process.env.BOT_KEY;
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get("eventId");
  const house = searchParams.get("house");
  const date = searchParams.get("date");
  // const builder_date = searchParams.get("builder_date");
  const session = await getServerSession(authOptions);
  try {
    await connectMongoDB();
    const roles = await Roles.find({ house: house });
    const highCommandAccess = highCommandAllowed(roles, session, house);
    // if (!(highCommandAccess || (discordKey && botAllowed(discordKey, envKey))))
    //   return new Response("401");
    // if (builder_date) {
    //   const events = await Event.find({ builder_date: builder_date });
    //   const formattedEvents = events.map((event: BotEvent) => {
    //     return {
    //       _id: event._id,
    //       date: event.date_start_event,
    //       house: event.house_name,
    //       lineup: event.signUps.sort((a, b) =>
    //         a.lineup.localeCompare(b.lineup)
    //       ),
    //     };
    //   });
    //   return new Response(JSON.stringify(events), { status: 200 });
    // }

    // Get all events for a specific date
    if (date) {
      const event = await Event.find({ date_start_event: date });
      return new Response(JSON.stringify(event), { status: 200 });
    }

    // Get event by ID
    if (eventId) {
      const event = await Event.findOne({ _id: eventId });
      return new Response(JSON.stringify(event), { status: 200 });
    }

    // Get all active events for a house
    if (house) {
      const event = await Event.find({ house_name: house, active: true });
      return new Response(JSON.stringify(event), { status: 200 });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const discordKey = headers().get("discord-key");
  const envKey = process.env.BOT_KEY;

  const { searchParams } = new URL(request.url);

  const eventId = searchParams.get("eventId");
  const house = searchParams.get("house");

  const session = await getServerSession(authOptions);
  if (!session || !eventId || !house) return new NextResponse("401");
  try {
    await connectMongoDB();
    const roles = await Roles.find({
      house: house,
      discordId: session?.user.id,
    });
    const highCommandAccess = highCommandAllowed(roles, session, house);
    // if (!(highCommandAccess || (discordKey && botAllowed(discordKey, envKey))))
    //   return new NextResponse("401");

    const event = await Event.findOneAndDelete({
      _id: eventId,
    });
    return new NextResponse(JSON.stringify(event), { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
