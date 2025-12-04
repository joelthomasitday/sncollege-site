import { listFaculty, createFaculty } from "@/backend/api/faculty";

export async function GET() {
  return listFaculty();
}

export async function POST(req: Request) {
  return createFaculty(req as any);
}
