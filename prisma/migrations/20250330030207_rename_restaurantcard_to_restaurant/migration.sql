/*
  Warnings:

  - You are about to drop the `RestaurantCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RestaurantCard" DROP CONSTRAINT "RestaurantCard_cuisineId_fkey";

-- DropTable
DROP TABLE "RestaurantCard";

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "cuisineId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "deliveryPrice" DOUBLE PRECISION NOT NULL,
    "minPrepTime" INTEGER NOT NULL,
    "maxPrepTime" INTEGER NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "Cuisine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
