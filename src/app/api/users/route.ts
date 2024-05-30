import { db } from "@/db/db";
import { users } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await db.delete(users).where(eq(users.id, params.id));
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
