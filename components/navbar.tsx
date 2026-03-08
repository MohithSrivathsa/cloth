import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Cloth Studio
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <Link href="/">Shop</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
