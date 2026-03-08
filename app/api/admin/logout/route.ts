import { NextRequest, NextResponse } from "next/server";
import { clearAdminSession } from "@/utils/auth";

export async function POST(request: NextRequest) {
  clearAdminSession();
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
