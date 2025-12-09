import { prisma } from "@/lib/prisma";

function isValidEmail(e: string) {
  return /^\S+@\S+\.\S+$/.test(e);
}

/**
 * Saves an email to DB (idempotent).
 * Returns { ok: true } if created or already exists.
 */
export async function saveSubscriber(email: string) {
  if (!isValidEmail(email)) throw new Error("Invalid email");

  await prisma.subscriber.upsert({
    where: { email },
    create: { email },
    update: {}, // do nothing if it exists
  });

  return { ok: true };
}