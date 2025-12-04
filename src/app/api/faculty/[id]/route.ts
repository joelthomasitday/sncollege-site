import { getFaculty, updateFaculty, deleteFaculty } from "@/backend/api/faculty";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return getFaculty(id);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return updateFaculty(req as any, id);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return deleteFaculty(id);
}
