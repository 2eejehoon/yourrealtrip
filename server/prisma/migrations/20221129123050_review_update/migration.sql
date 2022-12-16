/*
  Warnings:

  - Added the required column `city` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `lat` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `lng` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
DROP COLUMN "lat",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
DROP COLUMN "lng",
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL;
