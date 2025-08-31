import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/user/surveys";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Weapon } from "@/models/assets/weapon";
import UnitAsset from "@/models/assets/unit";
import { Survey as SurveyType } from "@/lib/get-data";

export async function GET(
  _request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  try {
    await connectMongoDB();
    const survey = await Survey.findOne({ discordId: id });
    const userAccess = survey?.discordId === session?.user.id;
    const weapons = await Weapon.find();
    const units = await UnitAsset.find();
    const lowEras: SurveyType["units"]["low"] = [];
    const heroicEra: SurveyType["units"]["heroic"] = [];
    const goldenEra: SurveyType["units"]["golden"] = [];

    units.forEach((unit) => {
      switch (unit.era) {
        case "golden":
          goldenEra.push(unit);
          break;
        case "heroic":
          heroicEra.push(unit);
          break;
        default:
          lowEras.push(unit);
          break;
      }
    });
    const DEFAULT_FORM_DATA: SurveyType = {
      discordNick: "",
      inGameNick: "",
      discordId: "",
      characterLevel: "",
      avatar: "",
      house: [],
      artyAmount: "none",
      updates: [],
      weapons: weapons.map(() => ({ value: false, leadership: 0, pref: 0 })),
      units: {
        low: lowEras.map((unit) => ({
          id: unit.id,
          value: "0",
          pref: "0",
          reduceCost: false,
        })),
        heroic: heroicEra.map((unit) => ({
          id: unit.id,
          value: "0",
          reduceCost: false,
        })),
        golden: goldenEra.map((unit) => ({
          id: unit.id,
          value: "0",
          reduceCost: false,
        })),
      },
    };

    if (id === "new") {
      return NextResponse.json({ survey: DEFAULT_FORM_DATA }, { status: 200 });
    }
    if (!userAccess) {
      return NextResponse.json({ survey: DEFAULT_FORM_DATA }, { status: 200 });
    }

    return NextResponse.json(
      { survey: survey ?? DEFAULT_FORM_DATA },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
