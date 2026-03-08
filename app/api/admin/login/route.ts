import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import { setAdminSession } from "@/utils/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const env = getEnv();

  if (body.email !== env.ADMIN_EMAIL || body.password !== env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  setAdminSession();
  return NextResponse.json({ success: true });
}
