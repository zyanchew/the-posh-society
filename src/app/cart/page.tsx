"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/store/cart";

export default function CartPage() {
  const router = useRouter();
  const { items, remove } = useCart();
  const shippingFeeCents = 800;
  const subtotalCents = items.reduce((s, i) => s + i.priceCents * i.qty, 0);
  const totalCents = subtotalCents + shippingFeeCents;

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600">Your cart is empty.</p>
        <Link className="inline-block mt-4 underline" href="/shop">Continue shopping</Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {items.map((i) => (
        <div key={i.id} className="flex items-center gap-4 border rounded-xl p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={i.image} alt={i.title} className="w-20 h-20 object-cover rounded-lg" />
          <div className="flex-1">
            <div className="font-medium">{i.title}</div>
            <div className="text-sm text-gray-600">
              Qty: {i.qty}
              {i.color ? ` · Colour: ${i.color}` : ""}
              {i.size ? ` · Size: ${i.size}` : ""}
            </div>
            <div>MYR {((i.priceCents * i.qty) / 100).toFixed(2)}</div>
          </div>
          <button className="px-3 py-2 rounded-xl border" onClick={() => remove(i.id)}>Remove</button>
        </div>
      ))}
      <div className="flex items-center justify-between border rounded-xl p-4">
        <div className="space-y-1">
          <div className="flex justify-between gap-8 text-sm text-gray-600">
            <span>Subtotal</span>
            <span>MYR {(subtotalCents / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between gap-8 text-sm text-gray-600">
            <span>Shipping</span>
            <span>MYR {(shippingFeeCents / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between gap-8 font-semibold">
            <span>Total</span>
            <span>MYR {(totalCents / 100).toFixed(2)}</span>
          </div>
        </div>
        <button
          className="px-4 py-2 rounded-xl bg-black text-white"
          onClick={() => router.push("/payment/instructions")}
        >
          Checkout
        </button>
      </div>
    </main>
  );
}
