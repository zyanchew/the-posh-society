/* eslint-disable @next/next/no-img-element */
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/store/cart";

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type ApiPayload = {
  customer: FormState;
  items: {
    productId: string;
    title: string;
    priceCents: number;
    qty: number;
    color?: string | null;
    size?: string | null;
  }[];
  shippingCents: number;
  totalCents: number;
};

const initialForm = { name: "", email: "", phone: "", address: "" };
const shippingFeeCents = 800;

export default function PaymentInstructionsPage() {
  const router = useRouter();
  const { items, clear } = useCart();
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotalCents = items.reduce((total, item) => total + item.priceCents * item.qty, 0);
  const totalCents = subtotalCents + (items.length > 0 ? shippingFeeCents : 0);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty. Please add items before submitting your order.");
      return;
    }
    if (!form.name || !form.email || !form.phone || !form.address) {
      setError("Please fill in your name, email, phone number, and delivery address.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const payload: ApiPayload = {
      customer: form,
      items: items.map((item) => ({
        productId: item.productId,
        title: item.title,
        priceCents: item.priceCents,
        qty: item.qty,
        color: item.color ?? null,
        size: item.size ?? null,
      })),
      shippingCents: items.length > 0 ? shippingFeeCents : 0,
      totalCents,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Unable to save order. Please try again.");
      }

      clear();
      setForm(initialForm);
      router.replace("/payment/success");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Payment Instructions</h1>
        <p className="text-gray-600">
          We process payments manually. Please transfer the total amount and submit your contact details so we can
          confirm your order.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. Order Summary</h2>
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed p-4 text-gray-600">
            Your cart is empty. <Link className="underline" href="/shop">Continue shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 rounded-xl border p-4">
                  <img src={item.image} alt={item.title} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-gray-600">
                      Qty: {item.qty}
                      {item.color ? ` · Color: ${item.color}` : ""}
                      {item.size ? ` · Size: ${item.size}` : ""}
                    </div>
                  </div>
                  <div>MYR {((item.priceCents * item.qty) / 100).toFixed(2)}</div>
                </li>
              ))}
            </ul>
            <div className="rounded-xl border p-4 space-y-2 bg-gray-50">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>MYR {(subtotalCents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>MYR {(shippingFeeCents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total due</span>
                <span>MYR {(totalCents / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">2. Transfer the total amount</h2>
        <p>Use the bank details below and include your full name in the transfer reference.</p>
        <div className="rounded-xl border p-4 space-y-1 bg-gray-50">
          <div><span className="font-semibold">Account name:</span> Chew Zhi Jie</div>
          <div><span className="font-semibold">Bank:</span> CIMB BANK</div>
          <div><span className="font-semibold">Account number:</span> 7075540921</div>
          <div><span className="font-semibold">Reference:</span> Your name</div>
        </div>
        <p>Or pay via Touch n Go:</p>
        <div className="rounded-xl border p-4 space-y-1 bg-gray-50">
          <div><span className="font-semibold">Name:</span> Chew Zhi Jie</div>
          <div><span className="font-semibold">Number:</span> 0196343999</div>
          <div><span className="font-semibold">Reference:</span> Your name</div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3. Share your contact details</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm font-medium">Name</span>
              <input
                className="w-full rounded-xl border px-3 py-2"
                value={form.name}
                onChange={(event) => setForm((previous) => ({ ...previous, name: event.target.value }))}
                placeholder="Jane Doe"
                required
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium">Email</span>
              <input
                className="w-full rounded-xl border px-3 py-2"
                type="email"
                value={form.email}
                onChange={(event) => setForm((previous) => ({ ...previous, email: event.target.value }))}
                placeholder="jane@example.com"
                required
              />
            </label>
            <label className="space-y-1 md:col-span-2">
              <span className="text-sm font-medium">Phone number</span>
              <input
                className="w-full rounded-xl border px-3 py-2"
                value={form.phone}
                onChange={(event) => setForm((previous) => ({ ...previous, phone: event.target.value }))}
                placeholder="+60 12 345 6789"
                required
              />
            </label>
            <label className="space-y-1 md:col-span-2">
              <span className="text-sm font-medium">Delivery address</span>
              <textarea
                className="w-full rounded-xl border px-3 py-2"
                value={form.address}
                onChange={(event) => setForm((previous) => ({ ...previous, address: event.target.value }))}
                placeholder="Street, city, postcode"
                rows={3}
                required
              />
            </label>
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <div className="flex items-center justify-between">
            <Link className="underline" href="/cart">
              Back to cart
            </Link>
            <button
              className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving order..." : "Submit order details"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
