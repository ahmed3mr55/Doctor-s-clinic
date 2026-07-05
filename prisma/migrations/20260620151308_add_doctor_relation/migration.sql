-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLogin" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
