"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id?: string;
  name: string;
  description: string;
  price: number;
  color: string;
  stockQuantity: number;
  images: string[];
};

export function AdminProductForm({ product }: { product?: Product }) {
  const [formData, setFormData] = useState<Product>(
    product ?? {
      name: "",
      description: "",
      price: 0,
      color: "",
      stockQuantity: 0,
      images: [""]
    }
  );
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const method = product?.id ? "PUT" : "POST";
    const endpoint = product?.id ? `/api/products/${product.id}` : "/api/products";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        images: formData.images.filter(Boolean)
      })
    });

    if (!response.ok) {
      const payload = await response.json();
      setError(payload.error ?? "Unable to save product");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border bg-white p-6">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {[
        ["name", "Name"],
        ["color", "Color"],
        ["price", "Price (in cents)"],
        ["stockQuantity", "Stock quantity"],
        ["description", "Description"],
        ["images", "Image URL"]
      ].map(([key, label]) => (
        <label key={key} className="block text-sm">
          <span className="mb-1 block text-slate-600">{label}</span>
          {key === "description" ? (
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full rounded border px-3 py-2"
            />
          ) : (
            <input
              required={key !== "images"}
              type={key === "price" || key === "stockQuantity" ? "number" : "text"}
              value={key === "images" ? formData.images[0] : String(formData[key as keyof Product] ?? "")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [key]: key === "images" ? [e.target.value] : key === "price" || key === "stockQuantity" ? Number(e.target.value) : e.target.value
                }))
              }
              className="w-full rounded border px-3 py-2"
            />
          )}
        </label>
      ))}

      <button type="submit" className="rounded bg-primary px-4 py-2 text-white">
        {product ? "Update" : "Create"} Product
      </button>
    </form>
  );
}
