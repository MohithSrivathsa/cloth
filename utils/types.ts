export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: "S" | "M" | "L" | "XL";
  color: string;
};
