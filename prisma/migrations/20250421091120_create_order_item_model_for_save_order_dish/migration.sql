/*
  Warnings:

  - You are about to drop the `_OrderDishes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderHistoryId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderDishes" DROP CONSTRAINT "_OrderDishes_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderDishes" DROP CONSTRAINT "_OrderDishes_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderHistoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_OrderDishes";

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "photo" TEXT NOT NULL,
    "numberOfOrders" INTEGER NOT NULL DEFAULT 0,
    "categoryId" INTEGER,
    "orderId" INTEGER,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderHistoryId_fkey" FOREIGN KEY ("orderHistoryId") REFERENCES "OrderHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
