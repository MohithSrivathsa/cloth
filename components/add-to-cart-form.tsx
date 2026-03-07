"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    color: string;
    stockQuantity: number;
  };
};

const sizes = ["S", "M", "L", "XL"] as const;

export function AddToCartForm({ product }: Props) {
  const { addItem } = useCart();
  const [size, setSize] = useState<(typeof sizes)[number]>("M");

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Size</label>
      <div className="flex gap-2">
        {sizes.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSize(option)}
            className={`rounded border px-3 py-2 text-sm ${size === option ? "border-primary bg-primary text-white" : "border-slate-300"}`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          addItem({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.images[0],
            size,
            color: product.color
          })
        }
        disabled={product.stockQuantity <= 0}
        className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white disabled:opacity-50"
      >
        {product.stockQuantity > 0 ? "Add to cart" : "Out of stock"}
      </button>
    </div>
  );
}
