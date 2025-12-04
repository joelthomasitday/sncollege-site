import { getCourse, updateCourse, deleteCourse } from "@/backend/api/courses";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return getCourse(params.id);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return updateCourse(req as any, params.id);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  return deleteCourse(params.id);
}
