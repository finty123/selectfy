/*
  Warnings:

  - Added the required column `pixKey` to the `Withdrawal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pixKeyType` to the `Withdrawal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Withdrawal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pixKey" TEXT,
ADD COLUMN     "pixKeyType" TEXT;

-- AlterTable
ALTER TABLE "Withdrawal" ADD COLUMN     "pixKey" TEXT NOT NULL,
ADD COLUMN     "pixKeyType" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
