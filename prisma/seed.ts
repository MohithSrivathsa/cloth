import { prisma } from "@/lib/prisma";

async function main() {
  const products = [
    {
      name: "Essential Overshirt",
      description: "A soft and structured overshirt designed for layering.",
      price: 8900,
      color: "Sand",
      stockQuantity: 20,
      images: ["https://images.unsplash.com/photo-1516826957135-700dedea698c"],
      sizeOptions: { create: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }] }
    },
    {
      name: "Relaxed Utility Tee",
      description: "Breathable heavyweight cotton with a relaxed silhouette.",
      price: 3900,
      color: "Black",
      stockQuantity: 50,
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
      sizeOptions: { create: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }] }
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: product,
      create: product
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
