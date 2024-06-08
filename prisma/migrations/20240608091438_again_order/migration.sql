/*
  Warnings:

  - Added the required column `discount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sippingCost` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `discount` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `sippingCost` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `subtotal` DECIMAL(65, 30) NOT NULL;
