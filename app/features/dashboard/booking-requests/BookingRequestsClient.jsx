"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Trash2, Search, Filter, Loader2, AlertCircle, Calendar, Phone, User, CheckCircle2, UserPlus } from "lucide-react";

export default function BookingRequestsClient({ initialRequests, canUpdate = false, canCreateVisit = false }) {
  const [requests, setRequests] = useState(initialRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  const router = useRouter();

  // تتبع العمليات الجارية لكل طلب على حدة لحماية الأزرار من الضغط المتكرر
  const [actionLoading, setActionLoading] = useState({}); 
  const [globalMessage, setGlobalMessage] = useState({ type: "", text: "" });

  // 1. منطق البحث والفلترة الذكي (Client-side useMemo لسرعة متناهية)
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const patientName = req.fullName?.toLowerCase() || "";
      const patientPhone = req.phone || "";
      const matchesSearch = patientName.includes(searchQuery.toLowerCase()) || patientPhone.includes(searchQuery);
      
      const matchesStatus = statusFilter === "ALL" || req.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [requests, searchQuery, statusFilter]);

  // دالة تحديث الحالات العامة للمؤشرات
  const setRowLoading = (id, isLoading) => {
    setActionLoading(prev => ({ ...prev, [id]: isLoading }));
  };

  // 2. أكتشن الـ Approve (تأكيد الحجز)
  const handleApprove = async (id) => {
    if (!confirm("هل أنت متأكد من قبول هذا الطلب وتحويله لموعد رسمي؟")) return;
    
    try {
      setRowLoading(id, true);
      setGlobalMessage({ type: "", text: "" });

      const res = await fetch(`/api/booking-requests/${id}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok || data.success === false) throw new Error(data.error || "فشلت عملية القبول");

      // تحديث الحالة محلياً في الواجهة فوراً
      setRequests(prev => prev.map(req => req.id === id ? { ...req, status: "CONVERTED_TO_APPOINTMENT" } : req));
      setGlobalMessage({ type: "success", text: "تم قبول طلب الحجز بنجاح وأرشفته كموعد مؤكد." });
    } catch (err) {
      setGlobalMessage({ type: "error", text: err.message });
    } finally {
      setRowLoading(id, false);
    }
  };

  // 3. أكتشن الـ Reject (رفض الطلب)
  const handleReject = async (id) => {
    if (!confirm("هل أنت متأكد من رفض طلب هذا الحجز؟")) return;

    try {
      setRowLoading(id, true);
      setGlobalMessage({ type: "", text: "" });

      const res = await fetch(`/api/booking-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "REJECTED" }),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) throw new Error(data.error || "فشلت عملية الرفض");

      setRequests(prev => prev.map(req => req.id === id ? { ...req, status: "REJECTED" } : req));
      setGlobalMessage({ type: "success", text: "تم تحديث حالة الطلب إلى مرفوض." });
    } catch (err) {
      setGlobalMessage({ type: "error", text: err.message });
    } finally {
      setRowLoading(id, false);
    }
  };

  // 4. أكتشن الـ Delete (حذف الطلب نهائياً)
  const handleDelete = async (id) => {
    if (!confirm("تحذير: هل أنت متأكد من حذف هذا الطلب نهائياً من النظام؟")) return;

    try {
      setRowLoading(id, true);
      setGlobalMessage({ type: "", text: "" });

      const res = await fetch(`/api/booking-requests/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || data.success === false) throw new Error(data.error || "فشلت عملية الحذف");

      setRequests(prev => prev.filter(req => req.id !== id));
      setGlobalMessage({ type: "success", text: "تم حذف السجل نهائياً من النظام." });
    } catch (err) {
      setGlobalMessage({ type: "error", text: err.message });
    } finally {
      setRowLoading(id, false);
    }
  };

  // دالة مساعدة لتنسيق الاستايل الخاص بكل حالة بصرية
  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return <span className="px-3 py-1 text-xs font-black rounded-full bg-amber-50 text-amber-700 border border-amber-200">قيد الانتظار</span>;
      case "APPROVED":
      case "CONVERTED_TO_APPOINTMENT":
        return <span className="px-3 py-1 text-xs font-black rounded-full bg-green-50 text-green-700 border border-green-200">مقبول ومؤكد</span>;
      case "REJECTED":
        return <span className="px-3 py-1 text-xs font-black rounded-full bg-red-50 text-red-700 border border-red-200">مرفوض</span>;
      default:
        return <span className="px-3 py-1 text-xs font-black rounded-full bg-stone-100 text-stone-600">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* رسائل التنبيه والنجاح الإدارية */}
      {globalMessage.text && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium border animate-fade-in ${
          globalMessage.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {globalMessage.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{globalMessage.text}</span>
        </div>
      )}

      {/* شريط البحث والفلترة الفاخر */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-2xl border border-stone-100 shadow-sm">
        
        {/* صندوق البحث الحركي */}
        <div className="relative md:col-span-2">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
          <input
            type="text"
            placeholder="ابحث باسم المريض أو رقم الهاتف المرفق..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-11 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
          />
        </div>

        {/* قائمة فلاتر الحالات */}
        <div className="relative">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-4 pr-11 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-700 focus:outline-none focus:border-stone-900 focus:bg-white transition-all appearance-none"
          >
            <option value="ALL">كل الحالات الطبية</option>
            <option value="PENDING">قيد الانتظار (Pending)</option>
            <option value="CONVERTED_TO_APPOINTMENT">المقبولة المؤكدة (Approved)</option>
            <option value="REJECTED">المرفوضة (Rejected)</option>
          </select>
        </div>
      </div>

      {/* جدول عرض الطلبات الاستجابي الافتراضي لـ Tan Clinics */}
      <div className="bg-white border border-stone-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100 text-stone-400 text-xs font-bold tracking-wider">
                <th className="p-4 lg:p-5">اسم المريض</th>
                <th className="p-4 lg:p-5">رقم الهاتف</th>
                <th className="p-4 lg:p-5">التاريخ المفضل</th>
                <th className="p-4 lg:p-5">الحالة</th>
                <th className="p-4 lg:p-5">تاريخ طلب الحجز</th>
                <th className="p-4 lg:p-5 text-center">الإجراءات المتاحة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-sm font-medium text-stone-800">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-stone-400 font-medium">
                    <AlertCircle className="mx-auto mb-2 text-stone-300" size={32} />
                    لا توجد أي طلبات حجز مطابقة لخيارات الفلترة الحالية.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => {
                  const isLoading = actionLoading[req.id];
                  return (
                    <tr key={req.id} className="hover:bg-stone-50/60 transition-colors">
                      {/* اسم المريض وملاحظاته إن وجدت */}
                      <td className="p-4 lg:p-5">
                        <div className="font-black text-stone-900">{req.fullName || "مريض غير معرف"}</div>
                        {req.notes && (
                          <div className="text-xs text-stone-400 mt-1 max-w-xs truncate" title={req.notes}>
                            {req.notes}
                          </div>
                        )}
                      </td>
                      
                      {/* رقم الهاتف */}
                      <td className="p-4 lg:p-5 text-stone-600 font-mono" dir="ltr">
                        {req.phone}
                      </td>
                      
                      {/* التاريخ المفضل */}
                      <td className="p-4 lg:p-5 text-stone-700 font-semibold">
                        {new Date(req.preferredDate).toLocaleDateString("ar-EG", { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      
                      {/* حالة الطلب */}
                      <td className="p-4 lg:p-5">
                        {getStatusBadge(req.status)}
                      </td>
                      
                      {/* تاريخ إرسال الحجز */}
                      <td className="p-4 lg:p-5 text-xs text-stone-400">
                        {new Date(req.createdAt).toLocaleDateString("ar-EG", { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      
                      {/* أزرار الإجراءات */}
                      <td className="p-4 lg:p-5">
                        <div className="flex items-center justify-center gap-2">
                          {isLoading ? (
                            <Loader2 className="animate-spin text-stone-400" size={18} />
                          ) : (
                            <>
                              {/* زر القبول - يظهر فقط إذا كانت الحالة Pending */}
                              {canUpdate && req.status === "PENDING" && (
                                <>
                                  <button
                                    onClick={() => handleApprove(req.id)}
                                    className="p-1.5 rounded-lg text-green-600 bg-green-50 hover:bg-green-100 transition-colors"
                                    title="موافقة وتأكيد الحجز"
                                  >
                                    <Check size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleReject(req.id)}
                                    className="p-1.5 rounded-lg text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors"
                                    title="رفض الطلب"
                                  >
                                    <X size={16} />
                                  </button>
                                </>
                              )}
                              
                              {/* زر تسجيل الزيارة (Register Visit) - يظهر عند الموافقة أو التحويل */}
                              {canCreateVisit && (req.status === "APPROVED" || req.status === "CONVERTED_TO_APPOINTMENT") && (
                                req.patientId ? (
                                  <button
                                    onClick={() => router.push(`/dashboard/visits/create?patientId=${req.patientId}`)}
                                    className="p-1.5 rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                                    title="تسجيل زيارة للمريض"
                                  >
                                    <UserPlus size={16} />
                                  </button>
                                ) : (
                                  <span
                                    className="p-1.5 rounded-lg text-stone-300 bg-stone-50 cursor-not-allowed border border-stone-100"
                                    title="لا يوجد ملف مريض (Patient Record) مرتبط بطلب الحجز هذا"
                                  >
                                    <UserPlus size={16} className="opacity-40" />
                                  </span>
                                )
                              )}
                              
                              {/* زر الحذف الدائم */}
                              {canUpdate && (
                              <button
                                onClick={() => handleDelete(req.id)}
                                className="p-1.5 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                                title="حذف الطلب نهائياً"
                              >
                                <Trash2 size={16} />
                              </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
