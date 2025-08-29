import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import UnitAsset from "@/models/assets/unit";
import UnitWiki from "@/models/unit-wiki";
import UnitPost from "@/models/unit-post";
import Survey from "@/models/user/surveys";
import { Kit } from "@/models/assets/kit";
import { Doctrine } from "@/models/assets/doctrine";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") ?? "";
  const cleanName = name.replaceAll("_", " ");

  try {
    await connectMongoDB();
    const asset = await UnitAsset.findOne({ name: cleanName });
    const unitWiki = await UnitWiki.find({
      name: cleanName,
      status: "accepted",
    });
    const wiki = unitWiki[unitWiki.length - 1];
    const posts = await UnitPost.find({ unit: cleanName });
    const kits = await Kit.find({
      unit: cleanName,
    });
    const doctrineAsset = await Doctrine.find();
    const doctrines = doctrineAsset.filter((doctrine) => {
      if (
        doctrine.dedicated === "unit" &&
        doctrine.forUnit &&
        doctrine.forUnit.includes(name)
      ) {
        return true;
      }

      return false;
    });
    let userPost = [];
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
        authorNick: !!authorSurvey ? authorSurvey.discordNick : "Unknown",
        authorAvatar: !!authorSurvey ? authorSurvey.avatar : "Unknown",
      });
    }
    return NextResponse.json({ asset, wiki, posts: userPost, kits, doctrines });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
