"use client";

import React from "react";
import Link from "next/link";
import { Eye, Edit3, Trash2, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";

export default function VisitsTable({ visits, pagination, onPageChange, onDelete, canUpdate = false, canDelete = false }) {
  
  const translateType = (type) => {
    const labels = {
      CONSULTATION: "كشف / استشارة",
      FOLLOW_UP: "متابعة",
      LASER: "جلسة ليزر",
      BOTOX: "حقن بوتوكس",
      FILLER: "حقن فيلر",
      SURGERY: "جراحة تجميلية",
      SKINCARE: "العناية بالبشرة"
    };
    return labels[type] || type;
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case "CONSULTATION": return "bg-stone-100 text-stone-800 border-stone-200";
      case "LASER": return "bg-purple-50 text-purple-700 border-purple-200";
      case "BOTOX": return "bg-blue-50 text-blue-700 border-blue-200";
      case "FILLER": return "bg-pink-50 text-pink-700 border-pink-200";
      case "FOLLOW_UP": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-green-50 text-green-700 border-green-200";
    }
  };

  // جلب قيم الـ pagination الحالية بأمان وتأكيد تحويلها لأرقام
  const currentPage = Number(pagination?.currentPage) || 1;
  const totalPages = Number(pagination?.totalPages) || 1;

  return (
    <div className="w-full bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/40 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50/50">
              <th className="p-5 text-xs font-black text-stone-400 uppercase">بيانات المريض</th>
              <th className="p-5 text-xs font-black text-stone-400 uppercase">نوع الزيارة</th>
              <th className="p-5 text-xs font-black text-stone-400 uppercase">التشخيص الحالي</th>
              <th className="p-5 text-xs font-black text-stone-400 uppercase">تاريخ الزيارة</th>
              <th className="p-5 text-xs font-black text-stone-400 uppercase">المتابعة القادمة</th>
              <th className="p-5 text-xs font-black text-stone-400 uppercase text-center">الإجراءات المسجلة</th>
              <th className="p-5 text-xs font-black text-stone-400 uppercase text-center w-36">الخيارات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {visits && visits.length > 0 ? (
              visits.map((visit) => (
                <tr key={visit.id} className="hover:bg-stone-50/50 transition-colors group">
                  {/* بيانات المريض */}
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-500 group-hover:bg-orange-50 group-hover:text-orange-600 flex items-center justify-center transition-colors">
                        <User size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">{visit.patient?.fullName}</h4>
                        <p className="text-xs font-bold text-stone-400 mt-0.5 tracking-wide">{visit.patient?.patientCode}</p>
                      </div>
                    </div>
                  </td>

                  {/* نوع الزيارة */}
                  <td className="p-5">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${getTypeStyle(visit.visitType)}`}>
                      {translateType(visit.visitType)}
                    </span>
                  </td>

                  {/* التشخيص */}
                  <td className="p-5">
                    <p className="text-sm font-bold text-stone-700 max-w-xs truncate">
                      {visit.diagnosis || <span className="text-stone-300 font-normal">لا يوجد تشخيص مسجل</span>}
                    </p>
                  </td>

                  {/* تاريخ الزيارة */}
                  <td className="p-5">
                    <span className="text-sm font-medium text-stone-600" dir="ltr">
                      {new Date(visit.createdAt).toLocaleDateString("ar-EG")}
                    </span>
                  </td>

                  {/* المتابعة القادمة */}
                  <td className="p-5">
                    {visit.nextVisitDate ? (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50/60 border border-orange-100 px-2.5 py-1.5 rounded-xl w-fit">
                        <Calendar size={14} />
                        <span dir="ltr">{new Date(visit.nextVisitDate).toLocaleDateString("ar-EG")}</span>
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-stone-400">—</span>
                    )}
                  </td>

                  {/* عدد الإجراءات المسجلة */}
                  <td className="p-5 text-center">
                    <span className="text-xs font-black text-stone-700 bg-stone-100 px-2.5 py-1 rounded-lg">
                      {visit._count?.procedures || 0} إجراءات
                    </span>
                  </td>

                  {/* أزرار التحكم والعمليات */}
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-1">
                      <Link 
                        href={`/dashboard/visits/${visit.id}`}
                        className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all"
                        title="عرض تفاصيل ملف المريض والزيارة"
                      >
                        <Eye size={18} />
                      </Link>

                      {canUpdate && (
                      <Link 
                        href={`/dashboard/visits/${visit.id}/edit`}
                        className="p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="تعديل بيانات الزيارة"
                      >
                        <Edit3 size={18} />
                      </Link>
                      )}

                      {canDelete && (
                      <button 
                        onClick={() => onDelete(visit.id)}
                        className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="حذف الزيارة"
                      >
                        <Trash2 size={18} />
                      </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-16 text-center">
                  <p className="text-stone-400 font-bold text-sm">لا توجد سجلات زيارات تطابق خيارات الفلترة والبحث المحددة حالياً.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 3. عناصر الـ Pagination بعد تعديل تمرير القيم الحسابية المباشرة وتعديل أيقونات الـ RTL */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between text-xs font-bold text-stone-500">
          <span>عرض صفحة {currentPage} من أصل {totalPages}</span>
          <div className="flex items-center gap-2">
            {/* زر الصفحة السابقة (يقلل الصفحة بمقدار 1) */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-stone-200 rounded-xl bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1"
            >
              <ChevronRight size={16} />
              <span>السابق</span>
            </button>

            {/* زر الصفحة التالية (يزيد الصفحة بمقدار 1) */}
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
  );
}
