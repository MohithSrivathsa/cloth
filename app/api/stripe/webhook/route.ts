import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getEnv } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { getStripeClient } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const env = getEnv();
  const stripe = getStripeClient();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return NextResponse.json({ error: `Invalid webhook signature: ${String(error)}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const rawItems = session.metadata?.items;
    const items = rawItems ? (JSON.parse(rawItems) as Array<{ productId: string; name: string; quantity: number; price: number; size: string; color: string }>) : [];

    await prisma.order.create({
      data: {
        stripeCheckoutId: session.id,
        email: session.customer_details?.email,
        status: "PAID",
        totalAmount: session.amount_total ?? 0,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            productName: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            size: item.size,
            color: item.color
          }))
        }
      }
    });

    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stockQuantity: { decrement: item.quantity } }
      });
    }
  }

  return NextResponse.json({ received: true });
}
