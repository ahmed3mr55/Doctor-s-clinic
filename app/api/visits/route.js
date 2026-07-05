import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";

export async function GET(req) {
  try {
    // GET lists visits and visit stats, so it requires visits.read.
    const auth = await verifyAccess(["visits.read"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { searchParams } = new URL(req.url);
    
    // إعدادات الـ Pagination
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // محددات البحث والفلترة
    const search = searchParams.get("search") || "";
    const visitType = searchParams.get("visitType") || "ALL";

    // بناء شروط الفلترة لـ Prisma
    let whereClause = {};

    // 1. فلترة نوع الزيارة
    if (visitType !== "ALL") {
      whereClause.visitType = visitType;
    }

    // 2. البحث (اسم المريض، كود المريض، رقم الهاتف)
    if (search) {
      whereClause.patient = {
        OR: [
          { fullName: { contains: search, mode: "insensitive" } },
          { patientCode: { contains: search, mode: "insensitive" } },
          { phone: { contains: search } }
        ]
      };
    }

    // جلب البيانات الأساسية للجدول + الإحصائيات في استعلام متوازي لسرعة الأداء
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [visits, totalCount, stats] = await Promise.all([
      // جلب الزيارات المفلترة
      prisma.visit.findMany({
        where: whereClause,
        include: {
          patient: true,
          _count: {
            select: { procedures: true }
          }
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      
      // إجمالي عدد الزيارات المفلترة لحساب الصفحات
      prisma.visit.count({ where: whereClause }),

      // تجميع الإحصائيات الشاملة لأعلى الصفحة
      prisma.$transaction([
        prisma.visit.count(), // إجمالي الزيارات
        prisma.visit.count({ where: { createdAt: { gte: today } } }), // زيارات اليوم
        prisma.visit.count({ where: { createdAt: { gte: startOfMonth } } }), // زيارات الشهر
        prisma.visit.count({ where: { nextVisitDate: { gte: new Date() } } }), // المتابعات القادمة
        prisma.procedure.count(), // إجمالي الإجراءات المسجلة
      ])
    ]);

    return NextResponse.json({
      success: true,
      visits,
      pagination: {
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit
      },
      stats: {
        totalVisits: stats[0],
        todayVisits: stats[1],
        monthVisits: stats[2],
        upcomingFollowUps: stats[3],
        totalProcedures: stats[4]
      }
    });

  } catch (error) {
    console.error("Error fetching visits:", error);
    return NextResponse.json({ success: false, error: "حدث خطأ أثناء جلب البيانات" }, { status: 500 });
  }
}
