-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "VisitType" AS ENUM ('CONSULTATION', 'FOLLOW_UP', 'LASER', 'BOTOX', 'FILLER', 'SURGERY', 'SKINCARE');

-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('BEFORE', 'AFTER', 'REPORT');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "patientCode" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3),
    "bloodType" TEXT,
    "address" TEXT,
    "city" TEXT,
    "emergencyContact" TEXT,
    "emergencyPhone" TEXT,
    "allergies" TEXT,
    "chronicDiseases" TEXT,
    "medications" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT,
    "visitType" "VisitType" NOT NULL,
    "chiefComplaint" TEXT,
    "diagnosis" TEXT,
    "treatmentPlan" TEXT,
    "prescription" TEXT,
    "notes" TEXT,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "bloodPressure" TEXT,
    "nextVisitDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Procedure" (
    "id" TEXT NOT NULL,
    "visitId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Procedure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitImage" (
    "id" TEXT NOT NULL,
    "visitId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "type" "ImageType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientFile" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PatientFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "status" "AppointmentStatus" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_patientCode_key" ON "Patient"("patientCode");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_phone_key" ON "Patient"("phone");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procedure" ADD CONSTRAINT "Procedure_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitImage" ADD CONSTRAINT "VisitImage_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientFile" ADD CONSTRAINT "PatientFile_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
