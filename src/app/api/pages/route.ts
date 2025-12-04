import { listPages, createPage } from "@/backend/api/pages";

export async function GET() {
  return listPages();
}

export async function POST(req: Request) {
  return createPage(req as any);
}
