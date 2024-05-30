import { db } from "@/db/db";
import { insertWhitelistSchema, whitelist } from "@/db/schema/whitelist";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = insertWhitelistSchema.parse(await request.json());
  const [g] = await db.insert(whitelist).values(data).returning();
  return NextResponse.json({ added: g.discord_id }, { status: 201 });
}
