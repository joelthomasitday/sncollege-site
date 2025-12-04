import { getNews, updateNews, deleteNews } from "@/backend/api/news";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return getNews(params.id);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return updateNews(req as any, params.id);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  return deleteNews(params.id);
}
