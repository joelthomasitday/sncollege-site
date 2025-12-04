import { NextRequest } from "next/server";
import { meHandler } from "@/backend/api/auth";
import { connectDB } from "@/backend/lib/db/db";

export async function GET(req: NextRequest) {
  await connectDB();
  return meHandler(req);
}
