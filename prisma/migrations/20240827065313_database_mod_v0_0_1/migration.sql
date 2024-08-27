/*
  Warnings:

  - You are about to drop the column `resumeId` on the `user_info` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NOTSPECIFIED');

-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "scheduledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user_info" DROP COLUMN "resumeId",
ADD COLUMN     "github" TEXT,
ADD COLUMN     "leetcode" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'NOTSPECIFIED';

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
