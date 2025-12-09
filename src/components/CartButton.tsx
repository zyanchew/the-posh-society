"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";

export default function CartButton() {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));

  return (
    <Link
      href="/cart"
      className="relative btn btn-primary w-8 h-8 p-0 flex items-center justify-center"
      aria-label="Open cart"
    >
      {/* Icon instead of text */}
      <ShoppingBag className="w-5 h-5" aria-hidden="true" />
      <span className="sr-only">Cart</span>

      {count > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-xs font-light min-w-[1.25rem] h-5 rounded-full bg-white border px-1">
          {count}
        </span>
      )}
    </Link>
  );
}
