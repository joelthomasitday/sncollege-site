import { listCourses, createCourse } from "@/backend/api/courses";

export async function GET() {
  return listCourses();
}

export async function POST(req: Request) {
  return createCourse(req as any);
}
