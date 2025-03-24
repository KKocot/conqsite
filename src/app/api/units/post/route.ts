import connectMongoDB from "@/lib/mongodb";
import putUnitPostSchema from "./schema";
import UnitPost from "@/models/unit-post";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import Survey from "@/models/surveys";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data = putUnitPostSchema.parse(await request.json());
    const userPost = await UnitPost.create(data);
    return NextResponse.json(userPost, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const unit = searchParams.get("unit");
  const id = searchParams.get("id");
  try {
    await connectMongoDB();
    if (id) {
      const post = await UnitPost.findById(id);
      const authorSurvey = await Survey.findOne({
        discordId: post?.author,
      });
      return NextResponse.json(
        {
          tree: post.tree,
          _id: post._id,
          title: post.title,
          unit: post.unit,
          ytlink: post.ytlink,
          description: post.description,
          doctrines: post.doctrines,
          author: post.author,
          date: post.date,
          authorNick: authorSurvey.discordNick,
          authorAvatar: authorSurvey.avatar,
        },
        { status: 200 }
      );
    }
    if (unit) {
      const posts = await UnitPost.find({ unit: unit.replaceAll("_", " ") });
      const userPost = [];
      for (const post of posts) {
        const authorSurvey = await Survey.findOne({
          discordId: post.author,
        });
        userPost.push({
          _id: post._id,
          title: post.title,
          unit: post.unit,
          description: post.description,
          author: post.author,
          authorNick: authorSurvey.discordNick,
          authorAvatar: authorSurvey.avatar,
        });
      }
      return NextResponse.json(userPost, { status: 200 });
    }
    const userPost = await UnitPost.find();
    return NextResponse.json(userPost, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
