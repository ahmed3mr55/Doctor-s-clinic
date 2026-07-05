-- CreateEnum
CREATE TYPE "BookingRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CONVERTED_TO_APPOINTMENT');

-- AlterEnum
ALTER TYPE "AppointmentStatus" ADD VALUE 'NO_SHOW';

-- CreateTable
CREATE TABLE "BookingRequest" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "preferredDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "status" "BookingRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorSchedule" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DoctorSchedule_pkey" PRIMARY KEY ("id")
);
