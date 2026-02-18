import ProductPageClient from "./ProductPageClient";
import { products } from "@/data";
import { notFound } from "next/navigation";

export default function ProductPage({ params }) {
  const { id } = params;
  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
