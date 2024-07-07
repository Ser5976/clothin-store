/*
  Warnings:

  - Added the required column `color` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `discount` DOUBLE NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `oldPrice` DECIMAL(65, 30) NULL,
    ADD COLUMN `price` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `size` VARCHAR(191) NOT NULL,
    ADD COLUMN `totalOldPrice` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    ADD COLUMN `totalPrice` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    MODIFY `quantity` INTEGER NOT NULL DEFAULT 1;
