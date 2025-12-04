import { getGallery, updateGallery, deleteGallery } from "@/backend/api/gallery";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return getGallery(params.id);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return updateGallery(req as any, params.id);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  return deleteGallery(params.id);
}
