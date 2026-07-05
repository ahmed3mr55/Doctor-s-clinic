// app/api/visits/create/route.js

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";
import {
  isRequestValidationError,
  validateRequest,
  validationErrorResponse,
} from "@/lib/validateRequest";
import { createVisitSchema } from "@/lib/validations/visit.validation";

// 1. استعلام GET: للبحث الفوري والديناميكي عن المريض أثناء الكتابة
export async function GET(req) {
  try {
    // GET searches patients while creating a visit, so it requires visits.read.
    const auth = await verifyAccess(["visits.read"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    if (!search || search.trim().length < 2) {
      return NextResponse.json({ success: true, patients: [] });
    }

    const patients = await prisma.patient.findMany({
      where: {
        OR: [
          { fullName: { contains: search, mode: "insensitive" } },
          { patientCode: { contains: search, mode: "insensitive" } },
          { phone: { contains: search } }
        ]
      },
      take: 5, // جلب أول 5 نتائج فقط لتسريع الاستجابة
      select: {
        id: true,
        fullName: true,
        patientCode: true,
        phone: true
      }
    });

    return NextResponse.json({ success: true, patients });
  } catch (error) {
    console.error("Error searching patients:", error);
    return NextResponse.json({ success: false, error: "حدث خطأ أثناء البحث" }, { status: 500 });
  }
}

// 2. استعلام POST: حفظ الزيارة والإجراءات والصور داخل Database Transaction واحدة وتحديث الموعد
export async function POST(req) {
  try {
    // POST creates a visit record, so it requires visits.create.
    const auth = await verifyAccess(["visits.create"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const body = await req.json();
    const validatedData = validateRequest(body, createVisitSchema);
    
    // فك البيانات المستلمة من الفرونت إند (مع استقبال الـ appointmentId)
    const {
      patientId,
      appointmentId, // 👈 استلام الـ id الخاص بالموعد إن وُجد
      visitType,
      chiefComplaint,
      diagnosis,
      treatmentPlan,
      prescription,
      notes,
      height,
      weight,
      bloodPressure,
      procedures,
      images,
      nextVisitDate
    } = validatedData;

    // الخصائص الإلزامية للتحقق (Backend Validation)
    if (!patientId || !visitType) {
      return NextResponse.json({ success: false, error: "برجاء اختيار المريض وتحديد نوع الزيارة" }, { status: 400 });
    }

    // بدء المعاملة الموحدة (Database Transaction)
    const newVisit = await prisma.$transaction(async (tx) => {
      
      // أ- إنشاء سجل الزيارة الأساسي مع القياسات الطبية
      const visit = await tx.visit.create({
        data: {
          patientId,
          visitType,
          chiefComplaint: chiefComplaint || null,
          diagnosis: diagnosis || null,
          treatmentPlan: treatmentPlan || null,
          prescription: prescription || null,
          notes: notes || null,
          height: height ? parseFloat(height) : null,
          weight: weight ? parseFloat(weight) : null,
          bloodPressure: bloodPressure || null,
          nextVisitDate: nextVisitDate ? new Date(nextVisitDate) : null,
        }
      });

      // ب- إضافة الإجراءات الطبية المرفقة (إن وُجدت) دفعة واحدة
      if (procedures && procedures.length > 0) {
        await tx.procedure.createMany({
          data: procedures.map(proc => ({
            visitId: visit.id,
            name: proc.name,
            price: proc.price ? parseFloat(proc.price) : 0,
            description: proc.description || null,
          }))
        });
      }

      // ج- إضافة مراجع وعناوين الصور الطبية المرفوعة (إن وُجدت)
      if (images && images.length > 0) {
        await tx.visitImage.createMany({
          data: images.map(img => ({
            visitId: visit.id,
            imageUrl: img.imageUrl,
            type: img.type, // BEFORE, AFTER, REPORT
          }))
        });
      }

      // د- تحديث حالة الموعد المحجوز تلقائياً إلى COMPLETED (مكتمل) إذا كان المريض قادماً من تذكرة حجز
      if (appointmentId) {
        await tx.appointment.update({
          where: { id: appointmentId },
          data: {
            status: "COMPLETED", // 👈 تحويل حالة الموعد إلى مكتمل فوراً في نفس المعاملة
          }
        });
      }

      return visit;
    });

    return NextResponse.json({ 
      success: true, 
      message: "تم تسجيل الزيارة بنجاح وتحويل الموعد إلى حالة مكتمل", 
      visitId: newVisit.id 
    });

  } catch (error) {
    if (isRequestValidationError(error)) {
      return NextResponse.json(validationErrorResponse(error), { status: 400 });
    }

    console.error("Transaction Error logic:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ success: false, error: `خطأ في قاعدة البيانات: ${error.message}` }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "فشلت العملية، حدث خطأ داخلي بالنظام" }, { status: 500 });
  }
}
