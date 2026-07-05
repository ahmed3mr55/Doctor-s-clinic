import React from "react";
import Link from "next/link";
import { Plus, Users, UserPlus, Activity } from "lucide-react";
import PatientsTableClientWrapper from "@/app/features/dashboard/patients/PatientsTableClientWrapper";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";

// دالة جلب البيانات على السيرفر (SSR) - تم تحديثها لتستقبل المعاملات
async function getPatientsData(page = 1, search = "") {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const cookieStore = await cookies();

  try {
    // إرسال الـ page والـ search للـ API ليعيد البيانات الصحيحة
    const response = await fetch(
      `${baseUrl}/api/patients?page=${page}&search=${encodeURIComponent(search)}&limit=5`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    if (!response.ok)
      return { patients: [], pagination: { totalPages: 1, page: 1, total: 0 } };
    const data = await response.json();
    return {
      patients: data.patients || [],
      pagination: data.pagination || { totalPages: 1, page: 1, total: 0 },
    };
  } catch (error) {
    console.error("Failed to fetch patients on server:", error);
    return { patients: [], pagination: { totalPages: 1, page: 1, total: 0 } };
  }
}

export default async function PatientsHomePage({ searchParams }) {
  const authUser = await auth();
  if (!authUser.can("patients.read")) return null;

  const resolvedParams = await searchParams;
  const searchTerm = resolvedParams.search || "";
  const currentPage = Number(resolvedParams.page) || 1;

  // جلب البيانات بناءً على الصفحة والبحث الحاليين
  const { patients, pagination } = await getPatientsData(
    currentPage,
    searchTerm,
  );

  // حساب الإحصائيات (ملاحظة: الباك إند يرجع المحدود فقط، يفضل مستقبلاً جلب الإحصائيات منفصلة، لكن سنبقيها تعمل على الـ 5 الحاليين مؤقتاً)
  const totalPatients = pagination.total || patients.length;

  const newPatientsThisMonth = patients.filter((patient) => {
    const createdAt = new Date(patient.createdAt);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return createdAt >= oneMonthAgo;
  }).length;

  const activeTreatments = patients.filter(
    (patient) => patient.status === "active",
  ).length;

  return (
    <div
      className="min-h-screen bg-stone-50 mt-15 p-4 lg:p-8 font-cairo"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">
              سجلات المرضى
            </h1>
            <p className="text-stone-500 font-medium">
              إدارة ملفات المرضى، التاريخ الطبي، ومتابعة الجلسات لـ Tan Clinics
            </p>
          </div>
          {authUser.can("patients.create") && (
            <Link
              href="/dashboard/patients/create"
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-stone-900 text-white rounded-2xl font-bold hover:bg-orange-500 shadow-xl shadow-stone-200 transition-all transform hover:-translate-y-1"
            >
              <Plus size={20} />
              <span>إضافة مريض جديد</span>
            </Link>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-orange-500">
              <Users size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                إجمالي المرضى المسجلين
              </p>
              <p className="text-2xl font-black text-stone-900">
                {totalPatients}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-green-600">
              <UserPlus size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                مرضى جدد (هذا الشهر)
              </p>
              <p className="text-2xl font-black text-stone-900">
                {newPatientsThisMonth}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-blue-600">
              <Activity size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                حالات تحت العلاج/المتابعة
              </p>
              <p className="text-2xl font-black text-stone-900">
                {activeTreatments}
              </p>
            </div>
          </div>
        </div>

        {/* جدول عرض المرضى التفاعلي مع تمرير بيانات التنقل الرقمي */}
        <PatientsTableClientWrapper
          initialPatients={patients}
          pagination={pagination}
          canUpdate={authUser.can("patients.update")}
          canDelete={authUser.can("patients.delete")}
        />
      </div>
    </div>
  );
}
