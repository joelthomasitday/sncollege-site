import { listGallery, createGallery } from "@/backend/api/gallery";

export async function GET() {
  return listGallery();
}

export async function POST(req: Request) {
  return createGallery(req as any);
}
