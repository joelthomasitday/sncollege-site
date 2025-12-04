import { listNews, createNews } from "@/backend/api/news";

export async function GET() {
  return listNews();
}

export async function POST(req: Request) {
  return createNews(req as any);
}
