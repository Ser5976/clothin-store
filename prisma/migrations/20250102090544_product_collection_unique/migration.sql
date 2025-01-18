/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ProductCollection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ProductCollection_name_key` ON `ProductCollection`(`name`);
