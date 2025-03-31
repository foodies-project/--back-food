/*
  Warnings:

  - You are about to drop the column `type` on the `Dish` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "type";

-- CreateTable
CREATE TABLE "TypeOfDish" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dishId" INTEGER NOT NULL,

    CONSTRAINT "TypeOfDish_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TypeOfDish" ADD CONSTRAINT "TypeOfDish_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
