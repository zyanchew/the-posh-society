import ProductCard from "@/components/ProductCard";
import CategoryNav from "@/components/CategoryNav";
import { prisma } from "@/lib/prisma";
import type { Category, Prisma } from "@prisma/client";
import { VALID_CATEGORIES } from "@/lib/categories";

type Props = {
  searchParams?: { category?: string };
};

export default async function ShopPage({ searchParams }: Props) {
  const raw = (searchParams?.category ?? "").trim().toLowerCase();
  const category = (VALID_CATEGORIES as readonly string[]).includes(raw) ? (raw as Category) : undefined;

  const where: Prisma.ProductWhereInput = { status: "active" };
  if (category) where.category = category;

  // (Optional) Quick debug — see server logs:
  // const count = await prisma.product.count({ where });
  // console.log("FILTER", { category, count });

  const products = await prisma.product.findMany({
    where,
    include: {
      images: {
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const active = category ?? "all";

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-normal"></h1>
        <CategoryNav active={active} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            slug={product.slug}
            title={product.title}
            image={product.images?.[0]?.url ?? "/file.svg"}
            basePrice={Number(product.basePrice)}
            currency={product.currency}
          />
        ))}
        {products.length === 0 && (
          <p className="text-gray-600">No products in this category yet.</p>
        )}
      </div>
    </main>
  );
}
