import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";

export async function DELETE(req, { params }) {
  try {
    // DELETE removes a visit and its related records, so it requires visits.delete.
    const auth = await verifyAccess(["visits.delete"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;

    // حذف الإجراءات الطبية والصور المرتبطة بالزيارة أولاً لتفادي مشاكل الـ Foreign Key Constraints
    await prisma.$transaction([
      prisma.procedure.deleteMany({ where: { visitId: id } }),
      prisma.visitImage.deleteMany({ where: { visitId: id } }),
      prisma.visit.delete({ where: { id } })
    ]);

    return NextResponse.json({ success: true, message: "تم حذف الزيارة بجميع متعلقاتها بنجاح" });
  } catch (error) {
    console.error("Error deleting visit:", error);
    return NextResponse.json({ success: false, error: "حدث خطأ أثناء حذف الزيارة" }, { status: 500 });
  }
}
