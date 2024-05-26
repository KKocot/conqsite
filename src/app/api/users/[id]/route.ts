import connectMongoDB from "@/lib/mongodb";
import Users from "@/models/users";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    newUsernameDiscor: usernameDiscord,
    NewIdDiscor: idDiscord,
    newRole: role,
    newPoints: points,
  } = await request.json();
  await connectMongoDB();
  await Users.findByIdAndUpdate(id, {
    usernameDiscord,
    idDiscord,
    role,
    points,
  });
  return NextResponse.json({ message: "User updated" }, { status: 200 });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectMongoDB();
  const user = await Users.findOne({ _id: id });
  return NextResponse.json({ user }, { status: 200 });
}
