import Link from "next/link";
import { CATEGORY_NAV } from "@/lib/categories";

export default function CategoryNav({ active }: { active?: string }) {
  return (
    <nav className="flex flex-wrap gap-3">
      {CATEGORY_NAV.map((c) => {
        const href = c.value === "all" ? "/shop" : `/shop?category=${c.value}`;
        return (
          <Link
            key={c.value}
            href={href}
            className={`pill ${active === c.value ? "pill-active" : ""}`}
          >
            {c.label}
          </Link>
        );
      })}
    </nav>
  );
}
