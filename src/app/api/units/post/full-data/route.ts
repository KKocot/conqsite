import connectMongoDB from "@/lib/mongodb";
import UnitPost from "@/models/unit-post";
import { NextResponse } from "next/server";
import Survey from "@/models/user/surveys";
import UnitWiki from "@/models/unit-wiki";
import { Doctrine } from "@/models/assets/doctrine";
import UnitAsset from "@/models/assets/unit";
import { DoctrineType, UnitData } from "@/lib/get-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const unitName = searchParams.get("unit");
  const cleanName = unitName?.replaceAll("_", " ");
  try {
    await connectMongoDB();
    const unitWiki = await UnitWiki.find({
      name: cleanName,
      status: "accepted",
    });
    const wiki = unitWiki[unitWiki.length - 1];
    const doctrineAsset = await Doctrine.find();
    const asset = await UnitAsset.findOne({ name: cleanName });
    const doctrinesForUnit = doctrineAsset.filter((doctrine) => {
      // Check for "all" type doctrines
      if (doctrine.dedicated === "all") return true;

      // Check for unit-specific doctrines
      if (
        doctrine.dedicated === "unit" &&
        doctrine.forUnit &&
        doctrine.forUnit.includes(unitName)
      ) {
        return true;
      }

      // Check for group doctrines
      if (doctrine.dedicated === "group" && doctrine.forUnit) {
        if (doctrine.forUnit.includes(unitName)) return true;

        if (asset && asset.types) {
          const type0 = asset.types[0];
          const type1 = asset.types[1];

          if (type0 && doctrine.forUnit.includes(type0)) return true;
          if (type1 && doctrine.forUnit.includes(type1)) return true;
          if (type0 && type1 && doctrine.forUnit.includes(`${type0} ${type1}`))
            return true;
        }
      }

      return false;
    });
    let fullPost = null;
    let doctrinesMap = [];
    if (!!id) {
      const post: UnitData | null = await UnitPost.findById(id);
      const authorSurvey = await Survey.findOne({
        discordId: post?.author,
      });
      fullPost = {
        tree: post?.tree,
        _id: post?._id,
        title: post?.title,
        unit: post?.unit,
        ytlink: post?.ytlink,
        description: post?.description,
        doctrines: post?.doctrines,
        author: post?.author,
        date: post?.date,
        authorNick: !!authorSurvey ? authorSurvey.discordNick : "Unknown",
        authorAvatar: !!authorSurvey ? authorSurvey.avatar : "Unknown",
      };
      doctrinesMap = doctrineAsset.filter((d) =>
        post?.doctrines.some((e) => e.name === d.name)
      );
    }

    const fullData = {
      fullPost,
      wiki,
      doctrinesForUnit,
      doctrinesMap,
      asset,
    };

    return NextResponse.json(fullData);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//
