import React from "react";
import Link from "next/link";
import {
  Plus,
  Stethoscope,
  CalendarDays,
  TrendingUp,
  Users,
  Layers,
} from "lucide-react";
// استيراد المكونات الفرعية
import VisitsFilters from "@/app/features/dashboard/visits/VisitsFilters";
import VisitsTableClientWrapper from "@/app/features/dashboard/visits/VisitsTableClientWrapper";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";

// دالة جلب البيانات على السيرفر (SSR) - تم تحديثها لضبط النصوص والقيم الافتراضية بدقة
async function getVisitsData(resolvedParams) {
  const page = resolvedParams?.page || "1";
  const search = resolvedParams?.search || "";
  const visitType = resolvedParams?.visitType || "ALL";
  const cookieStore = await cookies();

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: "10",
    search: search.toString(),
    visitType: visitType.toString(),
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/visits?${queryParams.toString()}`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!res.ok) return { visits: [], stats: null, pagination: { totalPages: 1, currentPage: 1 } };
    const data = await res.json();
    return data.success ? data : { visits: [], stats: null, pagination: { totalPages: 1, currentPage: 1 } };
  } catch (error) {
    console.error("Failed to fetch visits on server:", error);
    return { visits: [], stats: null, pagination: { totalPages: 1, currentPage: 1 } };
  }
}

export const dynamic = "force-dynamic";

export default async function VisitsPage({ searchParams }) {
  const authUser = await auth();
  if (!authUser.can("visits.read")) return null;

  // فك الـ Promise الخاص بـ searchParams للتوافق مع Next.js 15
  const resolvedParams = await searchParams;

  // جلب البيانات بناءً على الـ params المفكوكة
  const { visits, stats, pagination } = await getVisitsData(resolvedParams);

  return (
    <div
      className="min-h-screen bg-stone-50 mt-15 p-4 lg:p-8 font-cairo"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* الهيدر العلوي */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">
              إدارة الزيارات الطبية
            </h1>
            <p className="text-stone-500 font-medium mt-1">
              متابعة إجراءات المرضى، الكشوفات، وجلسات التجميل لـ Tan Clinics
            </p>
          </div>
          {authUser.can("visits.create") && (
          <Link
            href="/dashboard/visits/create"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-900 text-white rounded-2xl font-bold hover:bg-orange-500 shadow-xl shadow-stone-900/10 transition-all transform hover:-translate-y-0.5"
          >
            <Plus size={20} />
            <span>تسجيل زيارة جديدة</span>
          </Link>
          )}
        </div>

        {/* 1. قسم كروت الإحصائيات */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {[
            {
              label: "إجمالي الزيارات",
              value: stats?.totalVisits || 0,
              icon: Stethoscope,
              color: "text-stone-900 bg-stone-100",
            },
            {
              label: "زيارات اليوم",
              value: stats?.todayVisits || 0,
              icon: CalendarDays,
              color: "text-orange-600 bg-orange-50",
            },
            {
              label: "زيارات هذا الشهر",
              value: stats?.monthVisits || 0,
              icon: TrendingUp,
              color: "text-green-600 bg-green-50",
            },
            {
              label: "المتابعات القادمة",
              value: stats?.upcomingFollowUps || 0,
              icon: Users,
              color: "text-blue-600 bg-blue-50",
            },
            {
              label: "الإجراءات المسجلة",
              value: stats?.totalProcedures || 0,
              icon: Layers,
              color: "text-purple-600 bg-purple-50",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-[2rem] border border-stone-100 shadow-sm flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${card.color}`}
              >
                <card.icon size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-stone-400 truncate">
                  {card.label}
                </p>
                <p className="text-xl lg:text-2xl font-black text-stone-900 mt-1">
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. شريط الفلاتر والبحث */}
        <VisitsFilters
          currentSearch={resolvedParams?.search || ""}
          currentType={resolvedParams?.visitType || "ALL"}
        />

        {/* 3. جدول عرض الزيارات من خلال الـ Wrapper الآمن المعالج للمتغيرات */}
        <VisitsTableClientWrapper
          visits={visits}
          pagination={pagination}
          canUpdate={authUser.can("visits.update")}
          canDelete={authUser.can("visits.delete")}
        />
      </div>
    </div>
  );
}
