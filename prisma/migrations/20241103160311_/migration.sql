/*
  Warnings:

  - A unique constraint covering the columns `[zipcode]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Address_zipcode_key` ON `Address`(`zipcode`);
