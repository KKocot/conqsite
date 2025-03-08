import { highCommandAllowed } from "@/lib/endpoints-protections";
import connectMongoDB from "@/lib/mongodb";
import { putEventSchema } from "./shema";
import Event from "@/models/events";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Roles from "@/models/roles";
import Survey from "@/models/surveys";

/**
 * API Routes for Discord Attendance Events Management
 *
 * Endpoints:
 * - POST: Create/Update events (High Command)
 * - GET: Retrieve events (House members)
 * - DELETE: Remove events (High Command)
 *
 * Authentication:
 * - Requires valid session
 * - Role-based access control per house
 * - Event operations restricted by user permissions
 *
 */

type Item = {
  name: string;
  status: string;
  lineup: string;
  userId: string;
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  // Early check for session
  if (!session) return new Response("401");
  try {
    // Connect to Mongo database
    await connectMongoDB();

    // Find user roles from all houses
    const roles = await Roles.find({ discordId: session?.user.id });

    // Parse request data
    const data = putEventSchema.parse(await request.json());

    // Check if user has access to the house
    const highCommandAccess = highCommandAllowed(
      roles,
      session,
      data.house_name
    );

    // Check if user has access to house events
    if (!highCommandAccess) return new Response("401");

    // Check if event existing in database
    const existingEvent = await Event.findOne({ _id: data._id });
    let event;
    // If event exists, update it
    if (existingEvent) {
      event = await Event.findByIdAndUpdate(existingEvent._id, data, {
        new: true,
      });
      // Otherwise, create a new event
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
  const { searchParams } = new URL(request.url);
  const house = searchParams.get("house");
  const session = await getServerSession(authOptions);
  try {
    // Connect to Mongo database
    await connectMongoDB();
    // Find member survey in database
    const survey = await Survey.findOne({
      discordId: session?.user.id,
      house: house,
    });

    // Access to this data is restricted to house members
    if (!survey) return new Response("401");
    // Get event by date and house
    const date = searchParams.get("date");
    if (date && house) {
      const event = await Event.findOne({
        date_start_event: date,
        house_name: house,
      });

      // Sort signups by lineup
      const sortedLineup = event.signUps
        .filter(
          (e: {
            name: string;
            status: string;
            lineup: string;
            userId: string;
          }) => e.status === "Yes"
        )
        .reduce((acc: { [key: string]: string[] }, item: Item) => {
          if (!acc[item.lineup]) {
            acc[item.lineup] = [];
          }
          acc[item.lineup].push(item.userId);
          return acc;
        }, {});

      // Return refactored data friedly for the client
      const attendance = {
        date: event.date_start_event,
        house: event.house_name,
        lineup: Object.entries(sortedLineup).map(([name, signup]) => ({
          name,
          signup,
        })),
      };
      console.log(sortedLineup);
      return new Response(JSON.stringify(attendance), { status: 200 });
    }
    if (house) {
      const event = await Event.find({ house_name: house, active: true });
      return new Response(JSON.stringify(event), { status: 200 });
    }

    // Get event by ID
    const eventId = searchParams.get("eventId");
    if (eventId) {
      const event = await Event.findOne({ _id: eventId });
      return new Response(JSON.stringify(event), { status: 200 });
    }
    // In case of error, return 400 or 500 status to let the client know
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const house = searchParams.get("house");
  const session = await getServerSession(authOptions);

  // Check if user is logged in and house is provided
  if (!house || !session) return new NextResponse("401");
  try {
    // Connect to Mongo database
    await connectMongoDB();

    // Find member role in the house
    const roles = await Roles.findOne({
      house: house,
      discordId: session?.user.id,
    });
    const eventId = searchParams.get("eventId");

    // Only High Command roles can delete events and eventId is required
    if (!roles || !eventId) return new NextResponse("401");

    const event = await Event.findOneAndDelete({ _id: eventId });

    // Return deleted event data
    return new NextResponse(JSON.stringify(event), { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
