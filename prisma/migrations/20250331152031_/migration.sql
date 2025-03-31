/*
  Warnings:

  - Added the required column `restaurantId` to the `TypeOfDish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TypeOfDish" ADD COLUMN     "restaurantId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TypeOfDish" ADD CONSTRAINT "TypeOfDish_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
