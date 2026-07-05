"use client";
import React, { useState, useEffect, useTransition } from "react";
import FilterBar from "./FilterBar";
import { useRouter, usePathname } from "next/navigation";
import { 
  Users, UserCheck, UserX, ShieldCheck, Eye, Edit,
  ChevronLeft, ChevronRight, Inbox, Loader2 
} from "lucide-react";
import Link from "next/link";

export default function UsersTable({ roles, serverData, currentFilters, canUpdate = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition(); // لمؤشر تحميل خفيف عند التنقل
  
  const [searchTerm, setSearchTerm] = useState(currentFilters.search);
  const [selectedUser, setSelectedUser] = useState(null);

  // دالة تحديث الـ URL المركزي
  const updateUrlFilters = (newFilters) => {
    const params = new URLSearchParams(currentFilters);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    // عند تغيير الفلاتر (ما عدا الصفحة)، نرجع للصفحة 1
    if (!newFilters.page) {
      params.set("page", "1");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // عمل Debounce للبحث النصي فقط
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== currentFilters.search) {
        updateUrlFilters({ search: searchTerm });
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleFilterChange = (name, value) => {
    if (name === "search") {
      setSearchTerm(value);
    } else {
      updateUrlFilters({ [name]: value });
    }
  };

  // جلب تفاصيل مستخدم وعرض المودال الخاص به (يمكنك تركها API لأنها تفاعلية كـ Modal)
  const viewUserDetails = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}`);
      const result = await res.json();
      if (result.success) {
        setSelectedUser(result.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const { users: usersList, stats, pagination } = serverData;

  return (
    <div className={isPending ? "opacity-70 transition-opacity" : ""}>
      {/* 📊 بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">إجمالي الحسابات</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{stats.totalUsers}</h3>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl"><Users size={24} /></div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">المستخدمين النشطين</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{stats.activeUsers}</h3>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl"><UserCheck size={24} /></div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">الحسابات المعطلة</p>
            <h3 className="text-2xl font-black text-rose-600 mt-1">{stats.disabledUsers}</h3>
          </div>
          <div className="p-3.5 bg-rose-50 text-rose-600 rounded-2xl"><UserX size={24} /></div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">أدوار الصلاحيات (Roles)</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{stats.totalRoles}</h3>
          </div>
          <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl"><ShieldCheck size={24} /></div>
        </div>
      </div>

      {/* 🔍 شريط الفلترة المتقدم */}
      <FilterBar 
        roles={roles} 
        filters={{ ...currentFilters, search: searchTerm }} 
        onFilterChange={handleFilterChange} 
      />

      {/* 🗂️ حاوية جدول البيانات المتكامل */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden relative">
        {isPending && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
            <Loader2 className="animate-spin text-slate-600" size={30} />
          </div>
        )}

        {usersList.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="p-4 bg-slate-50 rounded-full text-slate-400 mb-4"><Inbox size={40} /></div>
            <h3 className="text-lg font-bold text-slate-800">لا يوجد مستخدمين مسجلين</h3>
            <p className="text-sm text-slate-400 max-w-sm mt-1">لم يتم العثور على أي مستخدم يطابق معايير البحث والفلترة المختارة حالياً.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-600 text-xs font-bold">
                  <th className="p-4">الاسم الكامل</th>
                  <th className="p-4">بيانات الاتصال</th>
                  <th className="p-4">الدور الوظيفي</th>
                  <th className="p-4">عدد الصلاحيات</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">تاريخ الانضمام</th>
                  <th className="p-4 text-center">إجراءات التحكم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {usersList.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-950">{user.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">ID: {user.id}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-slate-900 font-mono text-xs">{user.email}</div>
                      <div className="text-xs text-slate-500 mt-0.5 font-mono">{user.phone || "بدون رقم هاتف"}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                        {user.role?.name}
                      </span>
                    </td>
                    <td className="p-4 text-slate-900 font-bold px-8">
                      {user.role?._count?.permissions || 0} صلاحية
                    </td>
                    <td className="p-4">
                      {user.active ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> نشط
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-xl bg-rose-50 text-rose-700 border border-rose-100">
                          <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" /> معطل
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-xs text-slate-500 font-mono">
                      {new Date(user.createdAt).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => viewUserDetails(user.id)}
                          className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-lg transition-all"
                          title="استعراض كامل تفاصيل المستخدم"
                        >
                          <Eye size={17} />
                        </button>
                        {canUpdate && (
                        <Link href={`/dashboard/users/${user.id}/edit`} className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-lg transition-all" title="تعديل بيانات المستخدم">
                          <Edit size={17} />
                        </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 📑 أدوات الترقيم والصفحات السيرفرية */}
        {usersList.length > 0 && (
          <div className="p-4 bg-slate-50/70 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-2">
              <span>عرض</span>
              <select
                value={currentFilters.limit}
                name="limit"
                onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
                className="px-2 py-1 rounded-lg border border-slate-200 bg-white outline-none"
              >
                <option value="5">5 صفوف</option>
                <option value="10">10 صفوف</option>
                <option value="20">20 صفوف</option>
                <option value="50">50 صفاً</option>
              </select>
              <span>من أصل {pagination.total} مستخدم مسجل.</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={pagination.page <= 1 || isPending}
                onClick={() => updateUrlFilters({ page: pagination.page - 1 })}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
              <span>صفحة {pagination.page} من {pagination.totalPages}</span>
              <button
                disabled={pagination.page >= pagination.totalPages || isPending}
                onClick={() => updateUrlFilters({ page: pagination.page + 1 })}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 🛡️ نافذة موديول تفاصيل الصلاحيات */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn" dir="rtl">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-base font-black text-slate-900">الملف الإداري للأمان والصلاحيات</h3>
              <p className="text-xs text-slate-500 mt-1">مراجعة الصلاحيات الفردية للمستخدم: {selectedUser.name}</p>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">الدور الوظيفي الرئيسي بالداتابيز:</span>
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200">{selectedUser.role?.name}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-2">قائمة الصلاحيات النشطة الممنوحة له:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.role?.permissions?.map((p) => (
                    <span key={p.permissionId} className="px-2.5 py-1 text-xs bg-slate-100 text-slate-700 font-bold border border-slate-200 rounded-lg">
                      🛡️ {p.permission?.name}
                    </span>
                  )) || <span className="text-xs text-slate-400">لا توجد صلاحيات مباشرة مخصصة.</span>}
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-left">
              <button 
                onClick={() => setSelectedUser(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
