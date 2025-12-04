import { uploadHandler } from "@/backend/api/upload";

export async function POST(req: Request) {
  return uploadHandler(req as any);
}
