// app/api/patients/[id]/route.js

import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";
import {
  isRequestValidationError,
  validateRequest,
  validationErrorResponse,
} from "@/lib/validateRequest";
import { updatePatientSchema } from "@/lib/validations/patient.validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/*
|--------------------------------------------------------------------------
| GET -> Get Single Patient
|--------------------------------------------------------------------------
*/

export async function GET(req, { params }) {
  try {
    // GET reads a patient record and related clinical data, so it requires patients.read.
    const auth = await verifyAccess(["patients.read"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;

    const patient = await prisma.patient.findUnique({
      where: {
        id,
      },

      include: {
        visits: {
          include: {
            procedures: true,
            images: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        },

        appointments: {
          orderBy: {
            appointmentDate: "desc",
          },
        },

        files: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!patient) {
      return NextResponse.json(
        {
          success: false,
          error: "المريض غير موجود",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        patient,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "حدث خطأ أثناء جلب بيانات المريض",
      },
      {
        status: 500,
      },
    );
  }
}

/*
|--------------------------------------------------------------------------
| PUT -> Update Single Patient
|--------------------------------------------------------------------------
*/
export async function PUT(request, { params }) {
  try {
    // PUT updates a patient record, so it requires patients.update.
    const auth = await verifyAccess(["patients.update"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = validateRequest(body, updatePatientSchema);

    const {
      fullName,
      phone,
      email,
      gender,
      birthDate,
      bloodType,
      city,
      address,
      emergencyContact,
      emergencyPhone,
      allergies,
      chronicDiseases,
      medications,
      notes,
    } = validatedData;

    // 1. الـ Validation الأساسي والمطلوب
    if (!fullName || fullName.trim() === "") {
      return NextResponse.json(
        { success: false, error: "اسم المريض بالكامل مطلوب" },
        { status: 400 },
      );
    }
    if (!phone || phone.trim() === "") {
      return NextResponse.json(
        { success: false, error: "رقم الهاتف مطلوب" },
        { status: 400 },
      );
    }
    if (!gender || !["MALE", "FEMALE"].includes(gender)) {
      return NextResponse.json(
        { success: false, error: "تحديد الجنس (ذكر/أنثى) مطلوب بشكل صحيح" },
        { status: 400 },
      );
    }

    // 2. التحقق من وجود المريض أولاً في قاعدة البيانات
    const existingPatient = await prisma.patient.findUnique({
      where: { id },
    });

    if (!existingPatient) {
      return NextResponse.json(
        { success: false, error: "لم يتم العثور على ملف هذا المريض في النظام" },
        { status: 404 },
      );
    }

    // 3. التحقق من عدم تكرار رقم الهاتف مع مريض آخر (مع استثناء المريض الحالي)
    const phoneInUse = await prisma.patient.findFirst({
      where: {
        phone: phone.trim(),
        NOT: {
          id: id,
        },
      },
    });

    if (phoneInUse) {
      return NextResponse.json(
        { success: false, error: "رقم الهاتف هذا مسجل بالفعل لملف مريض آخر" },
        { status: 400 },
      );
    }

    // 4. تنفيذ عملية التحديث عبر Prisma
    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email && email.trim() !== "" ? email.trim() : null,
        gender,
        birthDate: birthDate ? new Date(birthDate) : null,
        bloodType: bloodType || null,
        city: city || null,
        address: address || null,
        emergencyContact: emergencyContact || null,
        emergencyPhone: emergencyPhone || null,
        allergies: allergies || null,
        chronicDiseases: chronicDiseases || null,
        medications: medications || null,
        notes: notes || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "تم تحديث بيانات المريض بنجاح",
        patient: updatedPatient,
      },
      { status: 200 },
    );
  } catch (error) {
    if (isRequestValidationError(error)) {
      return NextResponse.json(validationErrorResponse(error), { status: 400 });
    }

    console.error("Error updating patient via API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "حدث خطأ داخلي في السيرفر أثناء محاولة تحديث البيانات",
      },
      { status: 500 },
    );
  }
}
