import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/utils/auth";
import { formatCurrency } from "@/utils/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  const [products, orders] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" }, take: 5 })
  ]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">Admin dashboard</h1>
        <div className="flex gap-3">
          <Link href="/admin/products/new" className="rounded bg-primary px-4 py-2 text-white">
            Add product
          </Link>
          <form action="/api/admin/logout" method="post">
            <button className="rounded border px-4 py-2">Logout</button>
          </form>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <h2 className="mb-4 text-xl font-semibold">Products</h2>
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between rounded border p-3">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-slate-500">{formatCurrency(product.price)} · Stock {product.stockQuantity}</p>
              </div>
              <div className="flex gap-3 text-sm">
                <Link href={`/admin/products/${product.id}/edit`} className="text-blue-600">
                  Edit
                </Link>
                <form action={`/api/products/${product.id}`} method="post">
                  <input type="hidden" name="_method" value="DELETE" />
                  <button className="text-red-600">Delete</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <h2 className="mb-4 text-xl font-semibold">Recent orders</h2>
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="rounded border p-3">
              <p className="font-medium">Order {order.id.slice(0, 8)}</p>
              <p className="text-sm text-slate-500">{formatCurrency(order.totalAmount)} · {order.status}</p>
            </div>
          ))}
        </div>
        <Link href="/admin/orders" className="mt-4 inline-flex text-sm text-blue-600">
          View all orders
        </Link>
      </div>
    </section>
  );
}
