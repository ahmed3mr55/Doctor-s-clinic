"use client";

import React, { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FileText, CheckCircle2, Eye, Loader2 } from "lucide-react";
import BlogManagerTable from "@/app/features/dashboard/blog/BlogManagerTable";

export default function BlogHomeClient({ serverData, canUpdate = false, canDelete = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const { articles, stats, pagination } = serverData;

  // دالة تغيير الصفحة عبر تعديل الـ URL
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(newPage));

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // دالة الحذف تفاعلية (Client Action)
  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف المقال؟")) return;
    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        // تحديث الصفحة الحالية لجلب البيانات المحدثة تلقائياً من السيرفر
        router.refresh();
      }
    } catch (error) {
      console.error("خطأ أثناء حذف المقال:", error);
    }
  };

  const handleView = (slug) => {
    window.open(`/blog/${slug}`, "_blank");
  };

  return (
    <div className={`transition-opacity duration-200 ${isPending ? "opacity-60" : "opacity-100"}`}>
      {/* مؤشر تحميل خفيف يظهر فوق الجدول عند التنقل بين الصفحات */}
      {isPending && (
        <div className="fixed top-4 left-4 bg-stone-950 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs shadow-xl font-bold z-50">
          <Loader2 className="animate-spin" size={14} />
          <span>جاري تحديث البيانات...</span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-amber-600">
            <FileText size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">إجمالي المقالات</p>
            <p className="text-2xl font-black text-stone-900">{stats.totalItems}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-green-600">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">مقالات منشورة</p>
            <p className="text-2xl font-black text-stone-900">{stats.publishedArticles}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-blue-600">
            <Eye size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">مشاهدات المدونة</p>
            <p className="text-2xl font-black text-stone-900">2.0k</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <BlogManagerTable
        articles={articles}
        pagination={pagination}
        onPageChange={handlePageChange}
        onDelete={handleDelete}
        onView={handleView}
        canUpdate={canUpdate}
        canDelete={canDelete}
      />
    </div>
  );
}
