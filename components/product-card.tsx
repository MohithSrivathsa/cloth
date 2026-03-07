import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/format";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    color: string;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group rounded-xl border bg-white p-3 transition hover:shadow-sm">
      <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={product.images[0] ?? "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <h3 className="font-medium">{product.name}</h3>
      <p className="text-sm text-slate-500">{product.color}</p>
      <p className="mt-1 font-semibold">{formatCurrency(product.price)}</p>
    </Link>
  );
}
