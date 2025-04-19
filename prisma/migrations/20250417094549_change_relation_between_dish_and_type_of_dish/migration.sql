-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_typesOfDishId_fkey";

-- AlterTable
ALTER TABLE "Dish" ALTER COLUMN "typesOfDishId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_typesOfDishId_fkey" FOREIGN KEY ("typesOfDishId") REFERENCES "TypeOfDish"("id") ON DELETE SET NULL ON UPDATE CASCADE;
