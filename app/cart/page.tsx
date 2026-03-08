"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { formatCurrency } from "@/utils/format";

export default function CartPage() {
  const { items, total, removeItem } = useCart();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Your cart</h1>
      {items.length === 0 ? (
        <p className="text-slate-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex items-center gap-4 rounded-lg border bg-white p-4">
                <div className="relative h-20 w-16 overflow-hidden rounded bg-slate-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.size} · {item.color}</p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                  <button
                    className="mt-2 text-sm text-red-600"
                    onClick={() => removeItem(item.productId, item.size)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border bg-white p-4">
            <p className="text-lg font-semibold">Total: {formatCurrency(total)}</p>
            <Link href="/checkout" className="mt-4 inline-flex rounded bg-primary px-4 py-2 text-white">
              Proceed to checkout
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
