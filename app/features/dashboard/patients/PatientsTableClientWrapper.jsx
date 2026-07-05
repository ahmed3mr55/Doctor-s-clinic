"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import PatientsManagerTable from "@/app/features/dashboard/patients/PatientsManagerTable";

export default function PatientsTableClientWrapper({ initialPatients, pagination, canUpdate = false, canDelete = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localPatients, setLocalPatients] = useState(initialPatients);

  useEffect(() => {
    setLocalPatients(initialPatients);
  }, [initialPatients]);

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من مسح ملف هذا المريض؟ (سيتم أرشفته)")) {
      return;
    }

    try {
      const response = await fetch(`/api/patients/${id}`, { method: "DELETE" });
      const data = await response.json();

      if (response.ok && data.success) {
        setLocalPatients((prev) => prev.filter((patient) => patient.id !== id));
        router.refresh();
      } else {
        alert(data.error || "حدث خطأ أثناء محاولة الحذف");
      }
    } catch (error) {
      console.error("Error archiving patient:", error);
      alert("حدث خطأ في الاتصال بالخادم");
    }
  };

  // دالة لتغيير الصفحة الحالية بداخل الـ URL بطريقة متوافقة مع الـ Next.js App Router
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const { page, totalPages } = pagination || { page: 1, totalPages: 1 };

  return (
    <div className="space-y-4">
      {/* الجدول الأساسي لعرض الخمسة مرضى */}
      <PatientsManagerTable
        patients={localPatients}
        onDelete={handleDelete}
        canUpdate={canUpdate}
        canDelete={canDelete}
      />

      {/* شريط التنقل بين الصفحات (RTL UI Responsive) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-stone-100 shadow-sm mt-4">
          <div className="text-xs font-bold text-stone-500">
            عرض الصفحة <span className="text-stone-900">{page}</span> من أصل <span className="text-stone-900">{totalPages}</span> صفحات
          </div>
          
          <div className="flex items-center gap-2">
            {/* زر الصفحة السابقة */}
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="p-2 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 disabled:opacity-40 disabled:hover:bg-white text-stone-700 transition-all flex items-center gap-1 text-xs font-bold"
            >
              <ChevronRight size={16} />
              <span>السابق</span>
            </button>

            {/* زر الصفحة التالية */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              className="p-2 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 disabled:opacity-40 disabled:hover:bg-white text-stone-700 transition-all flex items-center gap-1 text-xs font-bold"
            >
              <span>التالي</span>
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
