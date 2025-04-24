import connectMongoDB from "@/lib/mongodb";
import HouseAssets from "@/models/houseAssets";
import Survey from "@/models/surveys";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import History from "@/models/house/twHistory";
import Event from "@/models/events";
import PublicLineup from "@/models/publicLineup";
import House from "@/models/house";

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

    const combinedData = cards.map((card) => ({
      house: card.name,
      premium:
        assets.find((asset) => asset.name === card.name)?.premium || false,
      surveys: filledSurveys.find((s) => s.house === card.name)?.percent || 0,
      history: history.find((h) => h._id === card.name)?.count || 0,
      conqBot: conqBotUsers.find((c) => c._id === card.name)?.count || 0,
      lineups: publicLineups.find((l) => l._id === card.name)?.count || 0,
      card: card,
    }));

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
