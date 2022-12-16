/*
  Warnings:

  - You are about to drop the column `commentId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `reviewId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_commentId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "reviewId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "commentId";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
