import connectMongoDB from "@/lib/mongodb";
import HouseAssets from "@/models/houseAssets";
import Survey from "@/models/user/surveys";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import History from "@/models/house/twHistory";
import Event from "@/models/events";
import PublicLineup from "@/models/publicLineup";
import House from "@/models/house";
import { HouseDetails } from "@/lib/get-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const house = searchParams.get("house");
  try {
    await connectMongoDB();
    const assets = await HouseAssets.find();
    const cards = await House.find();
    const filledSurveys = await getFilledSurveys();
    const history = await getHistory();
    const conqBotUsers = await getConqBotUsers();
    const publicLineups = await getPublicLineups();
    const lowQualityHouses = await getLowQualityHouses(cards);

    const combinedData = cards
      .filter((card) => !card.muted)
      .map((card) => ({
        house: card.name,
        premium:
          assets.find((asset) => asset.name === card.name)?.premium || false,
        surveys: filledSurveys.find((s) => s.house === card.name)?.percent || 0,
        history: history.find((h) => h._id === card.name)?.count || 0,
        conqBot: conqBotUsers.find((c) => c._id === card.name)?.count || 0,
        lineups: publicLineups.find((l) => l._id === card.name)?.count || 0,
        card: card,
        quality:
          lowQualityHouses.find((h) => h.name === card.name)?.quality || 1,
      }))
      .sort((a, b) => b.quality - a.quality);

    if (house) {
      const houseData = combinedData.find(
        (data) => data.house.toLowerCase() === house.toLowerCase()
      );
      return new Response(
        JSON.stringify(houseData || { message: "House not found" }),
        { status: houseData ? 200 : 404 }
      );
    }

    return new Response(JSON.stringify(combinedData), { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

const getFilledSurveys = async () => {
  const totalSurveys = await Survey.aggregate([
    {
      $unwind: {
        path: "$house",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $match: {
        house: {
          $nin: [null, "", "none"],
        },
      },
    },
    {
      $group: {
        _id: "$house",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);
  const overLvlOne = await Survey.aggregate([
    {
      $match: {
        characterLevel: { $ne: "1" },
      },
    },
    {
      $unwind: {
        path: "$house",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $match: {
        house: {
          $nin: [null, "", "none"],
        },
      },
    },
    {
      $group: {
        _id: "$house",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);
  const percentOfFilledSurveys = totalSurveys.map((survey) => {
    const total = survey.count;
    const filledSurvey = overLvlOne.find(
      (levelOne) => levelOne._id === survey._id
    );
    const filledSurveyCount = filledSurvey ? filledSurvey.count : 0;
    const percent = (filledSurveyCount / total) * 100;
    return {
      house: survey._id,
      percent: percent,
    };
  });
  return percentOfFilledSurveys;
};

const getHistory = async () => {
  const history = await History.aggregate([
    {
      $group: {
        _id: "$house",
        count: { $sum: 1 },
      },
    },
  ]);
  return history;
};

const getConqBotUsers = async () => {
  const conqBotUsers = await Event.aggregate([
    {
      $match: {
        bot_type: "Konquerus",
      },
    },
    {
      $group: {
        _id: "$house_name",
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  return conqBotUsers;
};

const getPublicLineups = async () => {
  const publicLineups = await PublicLineup.aggregate([
    {
      $group: {
        _id: "$house",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);
  return publicLineups;
};

const defaultAvatar = "https://i.imgur.com/4VEMy1m.png";
const default_surveys_number = 15;

const getLowQualityHouses = async (cards: HouseDetails[]) => {
  const noAvatar = await House.aggregate([
    {
      $match: {
        avatar: defaultAvatar,
      },
    },
    {
      $project: {
        name: 1,
        _id: 0,
      },
    },
  ]);
  const lowAmmountOfSurveys = await Survey.aggregate([
    {
      $unwind: "$house",
    },
    {
      $group: {
        _id: "$house",
        memberCount: { $sum: 1 },
      },
    },
    {
      $match: {
        memberCount: { $lt: default_surveys_number },
      },
    },
    {
      $project: {
        house: "$_id",
        _id: 0,
      },
    },
  ]);
  return cards.map((card) => {
    let quality = 1;
    if (noAvatar.some((h) => h.name === card.name)) quality++;
    if (lowAmmountOfSurveys.some((h) => h.house === card.name)) quality++;
    return {
      name: card.name,
      quality,
    };
  });
};
