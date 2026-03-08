import { NextRequest, NextResponse } from "next/server";
import { checkoutSchema } from "@/lib/validations";
<<<<<<< HEAD
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";
=======
import { getEnv } from "@/lib/env";
import { getStripeClient } from "@/lib/stripe";
>>>>>>> 8d868f4 (fix: make build env-safe and avoid db access during compile)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = checkoutSchema.parse(body);
<<<<<<< HEAD
=======
    const env = getEnv();
    const stripe = getStripeClient();
>>>>>>> 8d868f4 (fix: make build env-safe and avoid db access during compile)

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: env.STRIPE_PRICE_CURRENCY,
          unit_amount: item.price,
          product_data: {
            name: `${item.name} (${item.size})`,
            images: [item.image],
            metadata: {
              productId: item.productId,
              color: item.color,
              size: item.size
            }
          }
        }
      })),
      success_url: `${env.NEXT_PUBLIC_APP_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/cart`,
      metadata: {
        items: JSON.stringify(items)
      }
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    return NextResponse.json({ error: "Unable to create checkout session", details: String(error) }, { status: 400 });
  }
}
