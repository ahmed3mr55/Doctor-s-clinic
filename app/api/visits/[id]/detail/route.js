import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";

export async function GET(req, { params }) {
  try {
    // GET reads visit details, so it requires visits.read.
    const auth = await verifyAccess(["visits.read"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    // فك الـ params بشكل آمن متوافق مع Next.js
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, error: "معرف الزيارة غير صحيح" }, { status: 400 });
    }

    const visit = await prisma.visit.findUnique({
      where: { id },
      include: {
        patient: true,       // جلب بيانات المريض الأساسية
        procedures: true,    // جلب جميع الإجراءات التجميلية في الزيارة
        images: true,        // جلب معرض الصور بأكمله
      },
    });

    if (!visit) {
      return NextResponse.json({ success: false, error: "لم يتم العثور على سجل هذه الزيارة" }, { status: 404 });
    }

    return NextResponse.json({ success: true, visit });
  } catch (error) {
    console.error("Error fetching visit details:", error);
    return NextResponse.json({ success: false, error: "حدث خطأ داخلي أثناء جلب تفاصيل الزيارة" }, { status: 500 });
  }
}
