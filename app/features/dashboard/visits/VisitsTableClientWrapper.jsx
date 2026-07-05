"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VisitsTable from "@/app/features/dashboard/visits/VisitsTable";

export default function VisitsTableClientWrapper({ visits, pagination, canUpdate = false, canDelete = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // دالة تحديث رقم الصفحة الآمنة والتي تحافظ على فلاتر البحث ونوع الزيارة النشطة
  const handlePageChange = (newPage) => {
    // جلب المتغيرات الحالية النشطة بداخل الـ URL
    const params = new URLSearchParams(searchParams.toString());
    
    // تحديث أو تعيين بارامتر الصفحة الجديد
    params.set("page", newPage.toString());
    
    // إعادة التوجيه إلى الرابط المحدث بالكامل دون مسح بقية البيانات
    router.push(`?${params.toString()}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذه الزيارة نهائياً؟ سيتم مسح كافة التقارير والإجراءات المرفقة بها.")) return;
    try {
      const res = await fetch(`/api/visits/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        router.refresh(); // إعادة إنعاش خادم الـ Server Components لجلب وتحديث البيانات فوراً
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("حدث خطأ أثناء محاولة الحذف");
    }
  };

  return (
    <VisitsTable 
      visits={visits} 
      pagination={pagination} 
      onPageChange={handlePageChange} 
      onDelete={handleDelete}
      canUpdate={canUpdate}
      canDelete={canDelete}
    />
  );
}
