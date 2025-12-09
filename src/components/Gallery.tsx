"use client";

import { useEffect, useMemo, useState } from "react";

type ProductRow = {
  id: string;
  name: string | null;
  slug?: string | null;
  image_url?: string | null;
  image_path?: string | null; // if you still use Supabase Storage paths
};

type GalleryItem = { image: string; text: string; href?: string };

type Props = {
  height?: number;
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  // only needed if you still want to convert image_path from a public bucket:
  storagePublicBaseUrl?: string; // e.g. "https://<project>.supabase.co/storage/v1/object/public/product-images"
};

export default function Gallery({
  height = 520,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px Figtree",
  scrollSpeed = 2,
  scrollEase = 0.05,
  storagePublicBaseUrl,
}: Props) {
  const [rows, setRows] = useState<ProductRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data: ProductRow[] = await res.json();
        if (!cancel) setRows(data);
      } catch (e) {
        console.error(e);
        if (!cancel) setError("Failed to load products");
      }
    })();
    return () => { cancel = true; };
  }, []);

  const items: GalleryItem[] | null = useMemo(() => {
    if (!rows) return null;

    const toUrl = (row: ProductRow) => {
      if (row.image_url) return row.image_url;
      if (row.image_path && storagePublicBaseUrl) {
        return `${storagePublicBaseUrl}/${row.image_path}`;
      }
      return null;
    };

    return rows
      .map((p) => {
        const url = toUrl(p);
        if (!url) return null;
        return {
          image: url,
          text: p.name || "Product",
          href: p.slug ? `/product/${p.slug}` : `/product/${p.id}`,
        } as GalleryItem;
      })
      .filter(Boolean) as GalleryItem[];
  }, [rows, storagePublicBaseUrl]);

  if (!items && !error) {
    return <div className="grid place-items-center text-sm text-gray-500" style={{ height }}>Loading…</div>;
  }
  if (error) {
    return <div className="grid place-items-center text-sm text-red-600" style={{ height }}>{error}</div>;
  }
  if (!items?.length) {
    return <div className="grid place-items-center text-sm text-gray-500" style={{ height }}>No products yet.</div>;
  }

  
}