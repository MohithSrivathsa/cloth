import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cartItemSchema } from "@/lib/validations";

const payloadSchema = z.object({
  items: z.array(cartItemSchema)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = payloadSchema.parse(body);
    return NextResponse.json({ success: true, items: payload.items });
  } catch (error) {
    return NextResponse.json({ error: "Invalid cart payload", details: String(error) }, { status: 400 });
  }
}
