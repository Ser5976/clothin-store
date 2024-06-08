/*
  Warnings:

  - You are about to drop the column `sippingCost` on the `order` table. All the data in the column will be lost.
  - Added the required column `shippingCost` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `sippingCost`,
    ADD COLUMN `shippingCost` DECIMAL(65, 30) NOT NULL;
