/*
  Warnings:

  - You are about to drop the column `typesOfDishId` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the `TypeOfDish` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_typesOfDishId_fkey";

-- DropForeignKey
ALTER TABLE "TypeOfDish" DROP CONSTRAINT "TypeOfDish_restaurantId_fkey";

-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "typesOfDishId",
ADD COLUMN     "categoryId" INTEGER DEFAULT 0;

-- DropTable
DROP TABLE "TypeOfDish";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "restaurantId" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
