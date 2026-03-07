"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/cart-provider";

export default function OrderSuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <section className="mx-auto max-w-xl rounded-xl border bg-white p-8 text-center">
      <h1 className="text-3xl font-semibold">Order confirmed 🎉</h1>
      <p className="mt-3 text-slate-600">Thanks for your purchase. We are preparing your order now.</p>
      <Link href="/" className="mt-6 inline-flex rounded bg-primary px-4 py-2 text-white">
        Continue shopping
      </Link>
    </section>
  );
}
