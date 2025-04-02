/*
  Warnings:

  - You are about to drop the column `delivery` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "delivery",
DROP COLUMN "subtotal",
DROP COLUMN "total";
