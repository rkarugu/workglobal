-- AlterTable
ALTER TABLE `submission` ADD COLUMN `certPaths` JSON NULL,
    ADD COLUMN `idCopyPath` VARCHAR(191) NULL,
    ADD COLUMN `resumePath` VARCHAR(191) NULL;
