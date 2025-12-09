import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";

type OrderItemPayload = {
  productId: string;
  title: string;
  priceCents: number;
  qty: number;
  color?: string | null;
  size?: string | null;
};

type OrderPayload = {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItemPayload[];
  shippingCents: number;
  totalCents: number;
};

function isValidPayload(payload: unknown): payload is OrderPayload {
  if (!payload || typeof payload !== "object") return false;
  const { customer, items, shippingCents, totalCents } = payload as OrderPayload;
  if (!customer || typeof customer !== "object") return false;
  if (typeof customer.name !== "string" || !customer.name.trim()) return false;
  if (typeof customer.email !== "string" || !customer.email.trim()) return false;
  if (typeof customer.phone !== "string" || !customer.phone.trim()) return false;
  if (typeof customer.address !== "string" || !customer.address.trim()) return false;
  if (!Array.isArray(items) || items.length === 0) return false;
  if (typeof shippingCents !== "number" || shippingCents < 0) return false;
  if (typeof totalCents !== "number" || totalCents <= 0) return false;
  return items.every(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof item.productId === "string" &&
      !!item.productId &&
      typeof item.title === "string" &&
      !!item.title &&
      typeof item.priceCents === "number" &&
      item.priceCents >= 0 &&
      typeof item.qty === "number" &&
      item.qty > 0,
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!isValidPayload(body)) {
      return NextResponse.json({ error: "Invalid order payload." }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        customerName: body.customer.name.trim(),
        customerEmail: body.customer.email.trim(),
        customerPhone: body.customer.phone.trim(),
        customerAddress: body.customer.address.trim(),
        shippingCents: body.shippingCents,
        totalCents: body.totalCents,
        items: {
          create: body.items.map((item) => ({
            productId: item.productId,
            productTitle: item.title,
            productPriceCents: item.priceCents,
            quantity: item.qty,
            variantColor: item.color ?? null,
            variantSize: item.size ?? null,
          })),
        },
      },
      select: { id: true },
    });

    sendOrderConfirmationEmail({
      orderId: order.id,
      customer: {
        name: body.customer.name.trim(),
        email: body.customer.email.trim(),
        address: body.customer.address.trim(),
      },
      totals: {
        shippingCents: body.shippingCents,
        totalCents: body.totalCents,
        currency: "MYR",
      },
      items: body.items.map((item) => ({
        title: item.title,
        qty: item.qty,
        priceCents: item.priceCents,
        color: item.color ?? null,
        size: item.size ?? null,
      })),
    }).catch((error) => {
      console.error("[api/orders] Failed to send confirmation email", error);
    });

    return NextResponse.json({ id: order.id });
  } catch (error) {
    console.error("[api/orders] Failed to create order", error);
    return NextResponse.json({ error: "Failed to save order." }, { status: 500 });
  }
}
