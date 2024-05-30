import { db } from "@/db/db";
import { updateUserSchema, users } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const data = updateUserSchema
    .pick({ role: true, points: true })
    .parse(await request.json());

  await db.update(users).set(data).where(eq(users.id, id));
  return NextResponse.json({ message: "User updated" }, { status: 200 });
}
