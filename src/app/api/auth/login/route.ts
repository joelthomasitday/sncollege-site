import { NextRequest } from "next/server";
import { loginHandler } from "@/backend/api/auth";
import { connectDB } from "@/backend/lib/db/db";

export async function POST(req: NextRequest) {
  await connectDB();            
  return loginHandler(req);    
}
