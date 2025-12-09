import { Resend } from "resend";

import { money } from "./format";

let resendClient: Resend | null = null;

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

type OrderEmailItem = {
  title: string;
  qty: number;
  priceCents: number;
  color?: string | null;
  size?: string | null;
};

type OrderEmailPayload = {
  orderId: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  totals: {
    shippingCents: number;
    totalCents: number;
    currency?: string;
  };
  items: OrderEmailItem[];
};

export async function sendOrderConfirmationEmail({
  orderId,
  customer,
  totals,
  items,
}: OrderEmailPayload) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[email] RESEND_API_KEY missing; skipping confirmation email");
    return;
  }

  const currency = totals.currency ?? "MYR";

  const itemsMarkup = items
    .map((item) => {
      const labelParts = [item.title];
      if (item.color) labelParts.push(item.color);
      if (item.size) labelParts.push(item.size);

      return `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
            ${labelParts.join(" · ")}
          </td>
          <td style="padding: 8px 0; text-align: center; border-bottom: 1px solid #e5e7eb;">
            ${item.qty}
          </td>
          <td style="padding: 8px 0; text-align: right; border-bottom: 1px solid #e5e7eb;">
            ${money(item.priceCents, currency)}
          </td>
        </tr>
      `;
    })
    .join("");

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #111827;">
      <h1 style="font-size: 20px; margin-bottom: 12px;">Thank you, ${customer.name}!</h1>
      <p style="margin: 0 0 24px;">We have received your order <strong>${orderId}</strong>. Keep this email for your records.</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <thead>
          <tr style="text-align: left; border-bottom: 1px solid #111827;">
            <th style="padding: 8px 0;">Item</th>
            <th style="padding: 8px 0; text-align: center;">Qty</th>
            <th style="padding: 8px 0; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsMarkup}
        </tbody>
      </table>
      <div style="margin-top: 16px; text-align: right; font-size: 14px;">
        <div>Shipping: ${money(totals.shippingCents, currency)}</div>
        <div style="font-size: 16px; font-weight: 600;">Total: ${money(totals.totalCents, currency)}</div>
      </div>
      <div style="margin-top: 24px; font-size: 14px;">
        <p style="margin: 0 0 8px;">Shipping to:</p>
        <p style="margin: 0; white-space: pre-line;">${customer.address}</p>
      </div>
      <p style="margin-top: 24px; font-size: 14px;">If you spot anything that needs attention, reply to this email and our team will help right away.</p>
    </div>
  `;

  await resend.emails.send({
    from: "zhijiechew@theposhsociety.club",
    to: customer.email,
    subject: `Order ${orderId} confirmation`,
    html,
  });
}
