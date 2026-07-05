import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";
import {
  isRequestValidationError,
  validateRequest,
  validationErrorResponse,
} from "@/lib/validateRequest";
import { updateVisitSchema } from "@/lib/validations/visit.validation";

// 1. استعلام GET: لجلب بيانات الزيارة الحالية لملء حقول النموذج
export async function GET(req, { params }) {
  try {
    // GET loads a visit for editing, so it requires visits.read.
    const auth = await verifyAccess(["visits.read"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;

    const visit = await prisma.visit.findUnique({
      where: { id },
      include: {
        patient: true,
        procedures: true,
        images: true,
      },
    });

    if (!visit) {
      return NextResponse.json({ success: false, error: "الزيارة غير موجودة" }, { status: 404 });
    }

    return NextResponse.json({ success: true, visit });
  } catch (error) {
    console.error("Error fetching visit for edit:", error);
    return NextResponse.json({ success: false, error: "حدث خطأ أثناء جلب البيانات" }, { status: 500 });
  }
}

// 2. استعلام PUT: تحديث الزيارة والإجراءات والصور داخل Transaction واحدة
export async function PUT(req, { params }) {
  try {
    // PUT updates a visit record, so it requires visits.update.
    const auth = await verifyAccess(["visits.update"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;
    const body = await req.json();
    const validatedData = validateRequest(body, updateVisitSchema);

    const {
      visitType,
      chiefComplaint,
      diagnosis,
      treatmentPlan,
      prescription,
      notes,
      height,
      weight,
      bloodPressure,
      procedures, // مصفوفة الإجراءات المحدثة بالكامل من الفرونت إند
      images,     // مصفوفة الصور المحدثة بالكامل من الفرونت إند
      nextVisitDate
    } = validatedData;

    // Backend Validation
    if (!visitType) {
      return NextResponse.json({ success: false, error: "نوع الزيارة حقل إلزامي" }, { status: 400 });
    }

    // بدء المعاملة الموحدة الآمنة
    await prisma.$transaction(async (tx) => {
      
      // أ- تحديث البيانات الأساسية والقياسات الحيوية للزيارة
      await tx.visit.update({
        where: { id },
        data: {
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
        },
      });

      // ب- تحديث الإجراءات: الطريقة الأكثر أماناً هي حذف الإجراءات القديمة التابعة للزيارة ثم إعادة إدخال المصفوفة الجديدة
      await tx.procedure.deleteMany({ where: { visitId: id } });
      if (procedures && procedures.length > 0) {
        await tx.procedure.createMany({
          data: procedures.map((proc) => ({
            visitId: id,
            name: proc.name,
            price: proc.price ? parseFloat(proc.price) : 0,
            description: proc.description || null,
          })),
        });
      }

      // ج- تحديث الصور: حذف مراجع الصور الحالية وإعادة بناء المعرض المحدث
      await tx.visitImage.deleteMany({ where: { visitId: id } });
      if (images && images.length > 0) {
        await tx.visitImage.createMany({
          data: images.map((img) => ({
            visitId: id,
            imageUrl: img.imageUrl,
            type: img.type,
          })),
        });
      }
    });

    return NextResponse.json({ success: true, message: "تم تحديث السجل الطبي والمالي للزيارة بنجاح" });
  } catch (error) {
    if (isRequestValidationError(error)) {
      return NextResponse.json(validationErrorResponse(error), { status: 400 });
    }

    console.error("Transaction Update Error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ success: false, error: `خطأ في قاعدة البيانات: ${error.message}` }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "فشلت عملية التحديث، حدث خطأ داخلي" }, { status: 500 });
  }
}
