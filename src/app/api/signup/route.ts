import connectMongoDB from "@/lib/mongodb";
import Signup from "@/models/signup";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { date, lineup_one, lineup_two, lineup_tree, lineup_four } =
    await request.json();
  await connectMongoDB();
  await Signup.create({
    date,
    lineup_one,
    lineup_two,
    lineup_tree,
    lineup_four,
  });
  return NextResponse.json({ message: "Lists created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const list = await Signup.find();
  return NextResponse.json({ list });
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  await connectMongoDB();
  await Signup.findByIdAndDelete(id);
  return NextResponse.json({ message: "List deleted" }, { status: 200 });
}
