"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const BlogManagerTable = ({ articles, pagination, onPageChange, onDelete, onView, canUpdate = false, canDelete = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("الكل");

  const filteredArticles = articles.filter((art) => {
    const titleText = art.title ? art.title.toLowerCase() : "";
    const categoryText = art.category?.name ? art.category.name.toLowerCase() : "بدون تصنيف";
    
    const matchesSearch =
      titleText.includes(searchTerm.toLowerCase()) || 
      categoryText.includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "الكل" ||
      (activeFilter === "منشور" && art.published === true) ||
      (activeFilter === "مسودة" && art.published === false);

    return matchesSearch && matchesFilter;
  });

  // تجهيز المتغيرات الآمنة للأزرار
  const currentPage = pagination?.currentPage || 1;
  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="space-y-6">
      {/* شريط البحث والتصفية */}
      <div className="bg-white p-4 rounded-3xl border border-stone-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input
            type="text"
            placeholder="ابحث عن مقال بالاسم أو التصنيف..."
            className="w-full pr-12 pl-4 py-3 bg-stone-50 rounded-2xl border-transparent focus:bg-white focus:border-amber-500/30 focus:ring-0 outline-none transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {["الكل", "منشور", "مسودة"].map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                activeFilter === status
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-white text-stone-500 border-stone-100 hover:bg-stone-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* الجدول */}
      <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-stone-50/50 border-b border-stone-100">
                <th className="px-8 py-5 text-xs font-black text-stone-400 uppercase tracking-widest">المقال</th>
                <th className="px-6 py-5 text-xs font-black text-stone-400 uppercase tracking-widest">التصنيف</th>
                <th className="px-6 py-5 text-xs font-black text-stone-400 uppercase tracking-widest">الحالة</th>
                <th className="px-6 py-5 text-xs font-black text-stone-400 uppercase tracking-widest">المشاهدات</th>
                <th className="px-8 py-5 text-xs font-black text-stone-400 uppercase tracking-widest text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-stone-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={article.image}
                        className="w-14 h-14 rounded-2xl object-cover border border-stone-100 shadow-sm"
                        alt=""
                      />
                      <div className="max-w-75">
                        <p className="text-sm font-black text-stone-900 mb-1 truncate">{article.title}</p>
                        <div className="flex items-center gap-2 text-[10px] text-stone-400 font-bold">
                          <Calendar size={12} />
                          <span>{new Date(article.createdAt).toLocaleDateString("ar-EG")}</span>
                          <span className="mx-1">•</span>
                          <User size={12} />
                          <span>{article.author}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black rounded-lg uppercase border border-amber-100/50">
                      {article.category?.name || "بدون تصنيف"}
                    </span>
                  </td>
                  
                  <td className="px-6 py-5">
                    {article.published ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
                        <CheckCircle2 size={12} />
                        <span className="text-[10px] font-black">منشور</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-400 border border-stone-200">
                        <Clock size={12} />
                        <span className="text-[10px] font-black">مسودة</span>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-stone-900">{article.views || 0}</span>
                  </td>
                  
                  <td className="px-8 py-5 text-left">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onView(article.slug)}
                        className="p-2 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                      >
                        <Eye size={18} />
                      </button>
                      {canUpdate && (
                      <Link
                        href={`/dashboard/blog/edit/${article.id}`}
                        className="p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <Edit2 size={18} />
                      </Link>
                      )}
                      {canDelete && (
                      <button
                        onClick={() => onDelete(article.id)}
                        className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredArticles.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center text-stone-400 font-bold">
                    لا توجد مقالات تطابق بحثك..
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 👈 تصميم شريط التصفح (Pagination Toolbar) المتناسق مع التصميم البسيط */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between text-xs font-bold text-stone-500">
            <span>عرض صفحة {currentPage} من أصل {totalPages}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-stone-200 rounded-xl bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1"
              >
                <ChevronRight size={16} />
                <span>السابق</span>
              </button>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-stone-200 rounded-xl bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1"
              >
                <span>التالي</span>
                <ChevronLeft size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagerTable;
