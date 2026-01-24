-- AlterTable
ALTER TABLE "Career" ADD COLUMN     "tertiaryInstitutions" TEXT[] DEFAULT ARRAY[]::TEXT[];
