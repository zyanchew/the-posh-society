import Link from "next/link";

export type ProductCardProps = {
  id: string;
  slug: string;
  title: string;
  image: string;
  basePrice: number;
  currency: string;
};

export default function ProductCard({ id, slug, title, image, basePrice, currency }: ProductCardProps) {
  return (
    <Link key={id} href={`/products/${slug}`} className="card group overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="font-medium leading-tight line-clamp-2 min-h-[2.5rem]">{title}</div>
        <div className="mt-2 text-gray-700">
          {currency} {basePrice.toFixed(2)}
        </div>
      </div>
    </Link>
  );
}
