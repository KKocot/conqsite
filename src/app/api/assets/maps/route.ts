import connectMongoDB from "@/lib/mongodb";
import { Map } from "@/models/assets/map";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const map = searchParams.get("map");
  try {
    await connectMongoDB();
    if (map) {
      const mapAssets = await Map.findOne({
        name: map.replaceAll("_", " "),
      });
      return NextResponse.json({ mapAssets });
    } else {
      const mapsAssets = await Map.find();
      return NextResponse.json({ mapsAssets });
    }
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
