import React from "react";
import prisma from "@/lib/prisma";
import BookingRequestsClient from "@/app/features/dashboard/booking-requests/BookingRequestsClient";
import BookingRequestsStats from "@/app/features/dashboard/booking-requests/BookingRequestsStats";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "إدارة طلبات الحجز | لوحة التحكم",
};

// دالة السيرفر لجلب الطلبات وحساب الإحصائيات بشكل مدمج لتقليل استهلاك السيرفر
// دالة السيرفر لجلب الطلبات، ربطها بالمرضى، وحساب الإحصائيات
async function getBookingPageData() {
  try {
    // 1. جلب طلبات الحجز وجلب جميع المرضى في نفس الوقت لعمل مطابقة سريعة
    const [requests, patients] = await prisma.$transaction([
      prisma.bookingRequest.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.patient.findMany({
        select: { id: true, phone: true } // نكتفي بجلب الـ id والهاتف فقط لسرعة الأداء
      })
    ]);

    // 2. تحويل مصفوفة المرضى إلى كائن (Map) للبحث بداخلها بسرعة O(1) بدلاً من اللوب المتكرر
    const patientPhoneMap = new Map(patients.map(p => [p.phone, p.id]));

    // كائن الحسابات المبدئي
    const stats = {
      total: requests.length,
      pending: 0,
      approved: 0,
      rejected: 0
    };

    // 3. جولة فرز واحدة لتحويل التواريخ، حساب الإحصائيات، ومطابقة المريض
    const formattedRequests = requests.map((req) => {
      // حساب الإحصائيات
      if (req.status === "PENDING") {
        stats.pending += 1;
      } else if (req.status === "APPROVED" || req.status === "CONVERTED_TO_APPOINTMENT") {
        stats.approved += 1;
      } else if (req.status === "REJECTED") {
        stats.rejected += 1;
      }

      // البحث عن id المريض المطابق لرقم الهاتف المخزن في طلب الحجز
      const matchedPatientId = patientPhoneMap.get(req.phone) || null;

      return {
        ...req,
        id: req.id,
        patientId: matchedPatientId, // 👈 هنا قمنا بحقن الـ id السحري الذي ينتظره الـ Client Component!
        preferredDate: req.preferredDate.toISOString(),
        createdAt: req.createdAt.toISOString(),
      };
    });

    return {
      initialRequests: formattedRequests,
      stats
    };
  } catch (error) {
    console.error("Failed to fetch bookings or calculate stats on server:", error);
    return {
      initialRequests: [],
      stats: { total: 0, pending: 0, approved: 0, rejected: 0 }
    };
  }
}

export const dynamic = "force-dynamic";

export default async function BookingRequestsPage() {
  const authUser = await auth();
  if (!authUser.can("booking_requests.read")) return null;

  // استلام البيانات الحية الجاهزة المحسوبة بالكامل على السيرفر
  const { initialRequests, stats } = await getBookingPageData();

  return (
    <div className="min-h-screen bg-stone-50 mt-12 p-4 lg:p-8 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">طلبات الحجز أونلاين</h1>
          <p className="text-stone-500 font-medium text-sm mt-1">
            متابعة وإدارة طلبات المواعيد المرسلة من المرضى عبر الموقع الإلكتروني لـ Tan Clinics
          </p>
        </div>

        {/* 1. قسم كروت الإحصائيات المتقدمة المحسوبة سيرفر - SSR */}
        <BookingRequestsStats stats={stats} />

        {/* 2. المكون التفاعلي للعميل وجدول عرض الطلبات */}
        <BookingRequestsClient
          initialRequests={initialRequests}
          canUpdate={authUser.can("booking_requests.update")}
          canCreateVisit={authUser.can("visits.create")}
        />
        
      </div>
    </div>
  );
}
