import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { isAdminAuthenticated } from "@/utils/auth";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const payload = productSchema.parse(body);
    const product = await prisma.product.update({ where: { id: params.id }, data: payload });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Invalid product payload", details: String(error) }, { status: 400 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}

export async function POST(request: NextRequest, context: { params: { id: string } }) {
  const form = await request.formData();
  if (form.get("_method") === "DELETE") {
    await DELETE(request, context);
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
