import { NextRequest, NextResponse } from "next/server";
<<<<<<< HEAD
import { env } from "@/lib/env";
=======
import { getEnv } from "@/lib/env";
>>>>>>> 8d868f4 (fix: make build env-safe and avoid db access during compile)
import { setAdminSession } from "@/utils/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();

<<<<<<< HEAD
=======
  const env = getEnv();

>>>>>>> 8d868f4 (fix: make build env-safe and avoid db access during compile)
  if (body.email !== env.ADMIN_EMAIL || body.password !== env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  setAdminSession();
  return NextResponse.json({ success: true });
}
