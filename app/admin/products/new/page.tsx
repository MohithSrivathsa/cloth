import { redirect } from "next/navigation";
import { AdminProductForm } from "@/components/admin-product-form";
import { isAdminAuthenticated } from "@/utils/auth";

export default function NewProductPage() {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold">Create product</h1>
      <AdminProductForm />
    </section>
  );
}
