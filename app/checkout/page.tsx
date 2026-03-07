"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";

export default function CheckoutPage() {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async () => {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });

    if (!response.ok) {
      setLoading(false);
      setError("Unable to start Stripe checkout.");
      return;
    }

    const payload = await response.json();
    window.location.href = payload.url;
  };

  return (
    <section className="mx-auto max-w-xl rounded-xl border bg-white p-6">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <p className="mt-2 text-slate-600">Secure checkout powered by Stripe.</p>
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading || items.length === 0}
        className="mt-6 w-full rounded bg-primary px-4 py-3 font-medium text-white disabled:opacity-50"
      >
        {loading ? "Redirecting..." : "Pay with Stripe"}
      </button>
    </section>
  );
}
