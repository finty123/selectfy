-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "niche" TEXT;

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
