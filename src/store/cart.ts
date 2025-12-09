"use client";
import { create } from "zustand";

type LineItemInput = {
  productId: string;
  title: string;
  priceCents: number;
  image: string;
  qty: number;
  color?: string | null;
  size?: string | null;
};

type Item = LineItemInput & { id: string };

type CartState = {
  items: Item[];
  add: (item: LineItemInput) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const buildLineItemId = (item: LineItemInput) => {
  const normalise = (value?: string | null) => (value ? value.trim().toLowerCase() : "");
  return [item.productId, normalise(item.color), normalise(item.size)].join("::");
};

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (input) =>
    set((state) => {
      const lineId = buildLineItemId(input);
      const found = state.items.find((item) => item.id === lineId);
      if (found) {
        return {
          items: state.items.map((item) =>
            item.id === lineId ? { ...item, qty: item.qty + input.qty } : item,
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            ...input,
            id: lineId,
          },
        ],
      };
    }),
  remove: (lineId) => set((state) => ({ items: state.items.filter((item) => item.id !== lineId) })),
  clear: () => set({ items: [] }),
}));
