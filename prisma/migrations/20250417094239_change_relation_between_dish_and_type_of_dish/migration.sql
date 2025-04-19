-- DropForeignKey
ALTER TABLE "TypeOfDish" DROP CONSTRAINT "TypeOfDish_dishId_fkey";

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "typesOfDishId" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_typesOfDishId_fkey" FOREIGN KEY ("typesOfDishId") REFERENCES "TypeOfDish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
