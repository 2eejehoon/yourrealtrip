-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_reviewId_fkey";

-- AlterTable
ALTER TABLE "Wishlist" ALTER COLUMN "reviewId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;
