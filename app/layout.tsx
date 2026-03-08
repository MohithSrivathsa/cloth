import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";

export const metadata: Metadata = {
  title: "Cloth Studio",
  description: "Modern ecommerce storefront for premium apparel"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main className="container py-8">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
