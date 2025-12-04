import { logoutHandler } from "@/backend/api/auth";

export async function POST() {
  return logoutHandler();
}
