import { getPage, updatePage, deletePage } from "@/backend/api/pages";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return getPage(params.id);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return updatePage(req as any, params.id);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  return deletePage(params.id);
}
