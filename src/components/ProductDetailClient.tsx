"use client";

import { useEffect, useMemo, useState } from "react";

import { useCart } from "@/store/cart";
import { money } from "@/lib/format";

type VariantOption = {
  id: string;
  color: string | null;
  size: string | null;
  stock: number;
  imageUrl: string | null;
  gallery: string[];
};

type ProductDetailClientProps = {
  id: string;
  title: string;
  currency: string;
  priceCents: number;
  image?: string | null;
  variants: VariantOption[];
};

export default function ProductDetailClient({
  id,
  title,
  currency,
  priceCents,
  image,
  variants,
}: ProductDetailClientProps) {
  const add = useCart((state) => state.add);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const fallbackImage = image ?? "/file.svg";
  const hasColorOptions = variants.some((variant) => !!variant.color);
  const hasSizeOptions = variants.some((variant) => !!variant.size);

  const availableColors = useMemo(() => {
    if (!hasColorOptions) return [];
    const ordered = variants
      .filter((variant) => variant.color)
      .map((variant) => variant.color as string);
    return Array.from(new Set(ordered));
  }, [variants, hasColorOptions]);

  const availableSizes = useMemo(() => {
    if (!hasSizeOptions) return [];
    const relevant = selectedColor ? variants.filter((variant) => variant.color === selectedColor) : variants;
    const ordered = relevant.filter((variant) => variant.size).map((variant) => variant.size as string);
    return Array.from(new Set(ordered));
  }, [variants, hasSizeOptions, selectedColor]);

  useEffect(() => {
    if (selectedColor && !availableColors.includes(selectedColor)) {
      setSelectedColor(null);
    }
  }, [availableColors, selectedColor]);

  useEffect(() => {
    if (selectedSize && !availableSizes.includes(selectedSize)) {
      setSelectedSize(null);
    }
  }, [availableSizes, selectedSize]);

  useEffect(() => {
    if (hasColorOptions && availableColors.length === 1 && selectedColor !== availableColors[0]) {
      setSelectedColor(availableColors[0]);
    }
  }, [availableColors, hasColorOptions, selectedColor]);

  useEffect(() => {
    if (hasSizeOptions && availableSizes.length === 1 && selectedSize !== availableSizes[0]) {
      setSelectedSize(availableSizes[0]);
    }
  }, [availableSizes, hasSizeOptions, selectedSize]);

  const selectedVariant = useMemo(() => {
    if (variants.length === 0) return null;
    return (
      variants.find((variant) => {
        const colorMatches = !hasColorOptions || variant.color === selectedColor;
        const sizeMatches = !hasSizeOptions || variant.size === selectedSize;
        return colorMatches && sizeMatches;
      }) ?? null
    );
  }, [variants, hasColorOptions, hasSizeOptions, selectedColor, selectedSize]);

  const imageSrc = useMemo(() => {
    if (!hasColorOptions) {
      return fallbackImage;
    }

    const resolveVariantImage = (variant: VariantOption | null | undefined) => {
      if (!variant) return null;
      return variant.imageUrl ?? variant.gallery[0] ?? null;
    };

    const candidate =
      selectedVariant ??
      (selectedColor ? variants.find((variant) => variant.color === selectedColor) ?? null : null);

    return resolveVariantImage(candidate) ?? fallbackImage;
  }, [fallbackImage, hasColorOptions, selectedVariant, selectedColor, variants]);

  const canAddToCart = variants.length === 0 || !!selectedVariant;

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    add({
      productId: id,
      title,
      priceCents,
      image: imageSrc,
      qty: 1,
      color: selectedVariant?.color ?? null,
      size: selectedVariant?.size ?? null,
    });
  };

  const optionButtonBase =
    "px-3 py-1 rounded-full border text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black";

  return (
    <main className="container mx-auto py-10 grid gap-8 md:grid-cols-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt={title} className="w-full h-auto rounded-2xl border" />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold leading-tight">{title}</h1>
          <div className="text-xl">{money(priceCents, currency)}</div>
        </div>

        {hasColorOptions ? (
          <div className="space-y-2">
            <div className="text-sm font-medium uppercase tracking-tight text-gray-700">Colour</div>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => {
                const isActive = selectedColor === color;
                return (
                  <button
                    key={color}
                    type="button"
                    className={`${optionButtonBase} ${isActive ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300"}`}
                    onClick={() => setSelectedColor(isActive ? null : color)}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {hasSizeOptions ? (
          <div className="space-y-2">
            <div className="text-sm font-medium uppercase tracking-tight text-gray-700">Size</div>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => {
                const isActive = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    className={`${optionButtonBase} ${isActive ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300"}`}
                    onClick={() => setSelectedSize(isActive ? null : size)}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            {selectedColor && availableSizes.length === 0 ? (
              <p className="text-sm text-red-600">This colour is currently unavailable in any size.</p>
            ) : null}
          </div>
        ) : null}

        {variants.length > 0 && !canAddToCart ? (
          <p className="text-sm text-gray-600">Please select the available {hasColorOptions ? "colour" : ""}{hasColorOptions && hasSizeOptions ? " and " : ""}{hasSizeOptions ? "size" : ""} to continue.</p>
        ) : null}

        <button
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleAddToCart}
          disabled={!canAddToCart}
        >
          Add to cart
        </button>
      </div>
    </main>
  );
}
