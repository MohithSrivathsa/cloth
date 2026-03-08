import { notFound, redirect } from "next/navigation";
import { AdminProductForm } from "@/components/admin-product-form";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/utils/auth";

<<<<<<< HEAD
=======
export const dynamic = "force-dynamic";

>>>>>>> 8d868f4 (fix: make build env-safe and avoid db access during compile)
export default async function EditProductPage({ params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold">Edit product</h1>
      <AdminProductForm product={product} />
    </section>
  );
}
