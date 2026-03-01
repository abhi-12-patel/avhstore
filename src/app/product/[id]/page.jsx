import ProductPageClient from "./ProductPageClient";
import { products } from "@/data";
import { notFound } from "next/navigation";

export function generateMetadata({ params }) {
  const { id } = params;
  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    return {
      title: "Product Not Found | AVH STORE",
      description: "The requested product could not be found.",
    };
  }

  const title = `${product.name} | AVH STORE`;
  const description =
    product.metakey || "Shop premium jewellery at AVH STORE.";
  const primaryImage = product.images?.[0] || "";

  return {
    title,
    description,
    keywords: product.metakey || "",
    openGraph: {
      title,
      description,
      images: primaryImage ? [{ url: primaryImage, alt: product.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: primaryImage ? [primaryImage] : [],
    },
  };
}

export default function ProductPage({ params }) {
  const { id } = params;
  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
