import ProductDetailClient from "@/components/ProductDetailClient";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { slug: string };
};

export default async function ProductPage({ params }: PageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      images: {
        orderBy: { sortOrder: "asc" },
      },
      variants: {
        where: {
          status: "active",
          stock: { gt: 0 },
        },
        select: {
          id: true,
          color: true,
          size: true,
          stock: true,
          imageUrl: true,
          images: {
            orderBy: { sortOrder: "asc" },
            select: {
              url: true,
            },
          },
        },
        orderBy: [{ color: "asc" }, { size: "asc" }],
      },
    },
  });

  if (!product || product.status !== "active") {
    return notFound();
  }

  const primaryImage = product.images?.[0]?.url ?? null;
  const priceCents = Math.round(Number(product.basePrice) * 100);
  const variants = product.variants.map((variant) => ({
    id: variant.id,
    color: variant.color,
    size: variant.size,
    stock: variant.stock,
    imageUrl: variant.imageUrl ?? null,
    gallery: variant.images.map((image) => image.url),
  }));

  return (
    <ProductDetailClient
      id={product.id}
      title={product.title}
      currency={product.currency}
      priceCents={priceCents}
      image={primaryImage}
      variants={variants}
    />
  );
}
