import connectMongoDB from "@/lib/mongodb";
import putUnitPostSchema from "./schema";
import UnitPost from "@/models/unit-post";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import Survey from "@/models/user/surveys";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data = putUnitPostSchema.parse(await request.json());
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const postExist = await UnitPost.findOne({ _id: data._id });
    const userAccount = data.author === session.user.id;
    if (postExist && userAccount) {
      const updatedPost = await UnitPost.findOneAndUpdate(
        {
          _id: data._id,
        },
        {
          title: data.title,
          unit: data.unit,
          ytlink: data.ytlink,
          description: data.description,
          doctrines: data.doctrines,
          tree: data.tree,
        },
        { new: true }
      );
      return NextResponse.json(updatedPost, { status: 200 });
    }

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
  const author = searchParams.get("author");
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
    if (author) {
      const authorSurvey = await Survey.findOne({
        discordId: author,
      });
      const posts = await UnitPost.find({ author: author });
      return NextResponse.json(
        {
          author: { img: authorSurvey.avatar, nick: authorSurvey.discordNick },
          posts,
        },
        { status: 200 }
      );
    }
    const userPost = await UnitPost.find();
    return NextResponse.json(userPost, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const session = await getServerSession(authOptions);
  if (!session || !id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectMongoDB();
    const post = await UnitPost.findById(id);
    const authorCheck = post?.author === session.user.id;
    if (!authorCheck) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    } else {
      const deletedPost = await UnitPost.findByIdAndDelete(id);
      return NextResponse.json(deletedPost, { status: 200 });
    }
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
