import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { EventControllerSchema } from "./schema";
import EventController from "@/models/eventController";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data = EventControllerSchema.parse(await request.json());
    const existingEventController = await EventController.findOne({
      eventId: data.event_template_id,
    });
    let eventController;
    if (existingEventController) {
      eventController = await EventController.findByIdAndUpdate(
        existingEventController._id,
        data,
        {
          new: true,
        }
      );
    } else {
      eventController = await EventController.create(data);
    }
    return new NextResponse(JSON.stringify(eventController), { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const house_name = searchParams.get("house-name");
  const date = searchParams.get("next-date-event");
  const event_template_id = searchParams.get("event-id");

  try {
    await connectMongoDB();
    if (house_name) {
      const event = await EventController.find({ house_name });
      return new NextResponse(JSON.stringify(event), { status: 200 });
    }
    if (date) {
      const event = await EventController.find({ date });
      return new NextResponse(JSON.stringify(event), { status: 200 });
    }
    if (event_template_id) {
      const event = await EventController.findOne({ event_template_id });
      return new NextResponse(JSON.stringify(event), { status: 200 });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const next_date_event = searchParams.get("next-date-event");
  const event_id = searchParams.get("event-id");

  try {
    await connectMongoDB();

    const event = await EventController.findOneAndDelete({
      event_template_id: event_id,
    });

    return NextResponse.json(
      { event, message: "Event deleted" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
