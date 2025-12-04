import { getFaculty, updateFaculty, deleteFaculty } from "@/backend/api/faculty";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return getFaculty(params.id);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return updateFaculty(req as any, params.id);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  return deleteFaculty(params.id);
}
