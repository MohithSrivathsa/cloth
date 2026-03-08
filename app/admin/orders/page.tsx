import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/utils/auth";
import { formatCurrency } from "@/utils/format";

<<<<<<< HEAD
=======
export const dynamic = "force-dynamic";

>>>>>>> 8d868f4 (fix: make build env-safe and avoid db access during compile)
export default async function AdminOrdersPage() {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  const orders = await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" } });

  return (
    <section>
      <h1 className="mb-6 text-3xl font-semibold">Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Order {order.id.slice(0, 8)}</p>
              <p className="text-sm text-slate-500">{order.status}</p>
            </div>
            <p className="text-sm text-slate-600">{formatCurrency(order.totalAmount)}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.productName} x{item.quantity} ({item.size})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
