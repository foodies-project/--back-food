-- CreateTable
CREATE TABLE "RestaurantCard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "cuisineId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "deliveryPrice" DOUBLE PRECISION NOT NULL,
    "minPrepTime" INTEGER NOT NULL,
    "maxPrepTime" INTEGER NOT NULL,

    CONSTRAINT "RestaurantCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RestaurantCard" ADD CONSTRAINT "RestaurantCard_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "Cuisine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
