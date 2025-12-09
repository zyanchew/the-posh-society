/*
  Warnings:

  - You are about to drop the column `sku` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."ProductVariant_sku_key";

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "sku";

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");
