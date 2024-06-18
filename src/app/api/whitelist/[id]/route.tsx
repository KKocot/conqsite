import connectMongoDB from "@/lib/mongodb";
import Whitelist from "@/models/whitelist";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  await connectMongoDB();
  await Whitelist.findOneAndDelete({ idDiscord: id });
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
