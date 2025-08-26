import { authOptions } from "@/lib/auth";
import {
  HouseAssets as HouseAssetsType,
  HouseDetails,
  PremiumStatus,
  Survey as SurveyType,
} from "@/lib/get-data";
import connectMongoDB from "@/lib/mongodb";
import House from "@/models/house";
import HouseAssets from "@/models/houseAssets";
import Survey from "@/models/user/surveys";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET() {
  const session = await getServerSession(authOptions);

  try {
    await connectMongoDB();

    const houseAssets: HouseAssetsType[] | undefined = await HouseAssets.find();
    const houseDetails: HouseDetails[] | undefined = await House.find();
    const loggedUser: SurveyType | null | undefined = await Survey.findOne({
      discordId: session?.user.id,
    });

    const response: PremiumStatus[] = houseDetails.map((house) => {
      const asset = houseAssets.find((asset) =>
        asset.name === house.name ? asset : undefined
      );

      const userHouse = Array.isArray(loggedUser?.house)
        ? loggedUser?.house.some((h) => h === house.name)
        : false;
      return {
        name: house.name,
        avatar: house.avatar,
        premium: asset?.premiumPlan ?? "none",
        userHouse: userHouse,
        premiumEndTime: asset?.premiumEndTime ?? "",
      };
    });
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
