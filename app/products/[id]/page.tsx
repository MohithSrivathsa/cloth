import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartForm } from "@/components/add-to-cart-form";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/utils/format";

export const dynamic = "force-dynamic";

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });

  if (!product) {
    notFound();
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
        <Image
          src={product.images[0] ?? "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="mt-2 text-slate-600">{product.description}</p>
        <p className="mt-4 text-xl font-bold">{formatCurrency(product.price)}</p>
        <p className="mt-1 text-sm text-slate-500">Color: {product.color}</p>
        <div className="mt-8">
          <AddToCartForm product={product} />
        </div>
      </div>
    </div>
  );
}
