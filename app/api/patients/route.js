// app/api/patients/route.js

import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";
import {
  isRequestValidationError,
  validateRequest,
  validationErrorResponse,
} from "@/lib/validateRequest";
import { createPatientSchema } from "@/lib/validations/patient.validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function generatePatientCode(id) {
  return `PT-${new Date().getFullYear()}-${String(id).padStart(5, "0")}`;
}

/*
|--------------------------------------------------------------------------
| POST -> Create Patient
|--------------------------------------------------------------------------
*/

export async function POST(req) {
  try {
    // POST creates a patient record, so it requires patients.create.
    const auth = await verifyAccess(["patients.create"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const body = await req.json();
    const validatedData = validateRequest(body, createPatientSchema);

    const existingPhone = await prisma.patient.findUnique({
      where: {
        phone: validatedData.phone,
      },
    });

    if (existingPhone) {
      return NextResponse.json(
        {
          success: false,
          error: "رقم الهاتف مستخدم بالفعل",
        },
        {
          status: 409,
        }
      );
    }

    const patientsCount = await prisma.patient.count();

    const patientCode = generatePatientCode(patientsCount + 1);

    const patient = await prisma.patient.create({
      data: {
        patientCode,

        fullName: validatedData.fullName,
        phone: validatedData.phone,

        email: validatedData.email || null,

        gender: validatedData.gender,

        birthDate: validatedData.birthDate
          ? new Date(validatedData.birthDate)
          : null,

        bloodType: validatedData.bloodType || null,

        address: validatedData.address || null,

        city: validatedData.city || null,

        emergencyContact: validatedData.emergencyContact || null,

        emergencyPhone: validatedData.emergencyPhone || null,

        allergies: validatedData.allergies || null,

        chronicDiseases: validatedData.chronicDiseases || null,

        medications: validatedData.medications || null,

        notes: validatedData.notes || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "تم إنشاء المريض بنجاح",
        patient,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (isRequestValidationError(error)) {
      return NextResponse.json(validationErrorResponse(error), { status: 400 });
    }

    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "حدث خطأ أثناء إنشاء المريض",
      },
      {
        status: 500,
      }
    );
  }
}

/*
|--------------------------------------------------------------------------
| GET -> Get Patients With Pagination
|--------------------------------------------------------------------------
*/

export async function GET(req) {
  try {
    // GET lists patient records, so it requires patients.read.
    // const auth = await verifyAccess(["patients.read"]);
    // if (!auth.authorized) {
    //   return accessDeniedResponse(auth);
    // }

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;

    const limit = Number(searchParams.get("limit")) || 5;

    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const where = {
      OR: [
        {
          fullName: {
            contains: search,
            mode: "insensitive",
          },
        },

        {
          phone: {
            contains: search,
          },
        },

        {
          patientCode: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };

    const [patients, totalPatients] = await Promise.all([
      prisma.patient.findMany({
        where,

        skip,

        take: limit,

        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          patientCode: true,
          fullName: true,
          phone: true,
          gender: true,
          city: true,
          createdAt: true,
        },
      }),

      prisma.patient.count({
        where,
      }),
    ]);

    return NextResponse.json(
      {
        success: true,

        patients,

        pagination: {
          total: totalPatients,
          page,
          limit,
          totalPages: Math.ceil(totalPatients / limit),
          hasMore: skip + limit < totalPatients,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "حدث خطأ أثناء جلب المرضى",
      },
      {
        status: 500,
      }
    );
  }
}
