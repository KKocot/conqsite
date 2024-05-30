import connectMongoDB from "@/lib/mongodb";
import Users from "@/models/users";
import { NextResponse } from "next/server";
import z, { ZodError } from "zod";

const putDataSchema = z.object({
  usernameDiscord: z.string(),
  idDiscord: z.string(),
  role: z.enum(["member", "recruter", "commander", "admin", "headadmin"]),
  points: z.number(),
});

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const { usernameDiscord, idDiscord, role, points } = putDataSchema.parse(
      await request.json()
    );
    await connectMongoDB();
    await Users.findByIdAndUpdate(id, {
      usernameDiscord,
      idDiscord,
      role,
      points,
    });
    return NextResponse.json({ message: "User updated" }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  await connectMongoDB();
  const user = await Users.findOne({ _id: id });
  return NextResponse.json({ user }, { status: 200 });
}
