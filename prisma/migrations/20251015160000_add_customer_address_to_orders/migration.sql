-- Add customerAddress column and populate existing orders with the default value
ALTER TABLE "Order" ADD COLUMN "customerAddress" TEXT NOT NULL DEFAULT '';

-- Remove the default so future inserts must supply an explicit address
ALTER TABLE "Order" ALTER COLUMN "customerAddress" DROP DEFAULT;
