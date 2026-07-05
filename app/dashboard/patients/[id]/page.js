"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowRight,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  HeartPulse,
  ShieldAlert,
  FileText,
  Clock,
  Plus,
  Activity,
  Image as ImageIcon,
  DollarSign,
  AlertCircle,
  Loader2,
  ExternalLink,
  UserPlus,
} from "lucide-react";

const PatientProfilePage = ({ params }) => {
  // فك الـ params المتوافقة مع Next.js 16
  const unwrappedParams = use(params);
  const patientId = unwrappedParams.id;

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("visits"); // visits | appointments | files

  // جلب بيانات المريض الشاملة من الـ API
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/patients/${patientId}`, {
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "فشل في تحميل بيانات المريض");
        }

        setPatient(data.patient);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) fetchPatientData();
  }, [patientId]);

  // دالة مساعدة لترجمة أنواع زيارات عيادة التجميل
  const translateVisitType = (type) => {
    const types = {
      CONSULTATION: "كشف / استشارة",
      FOLLOW_UP: "إعادة / متابعة",
      LASER: "جلسة ليزر",
      BOTOX: "حقن بوتوكس",
      FILLER: "حقن فيلر",
      SURGERY: "عملية جراحية",
      SKINCARE: "العناية بالبشرة / تقشير",
    };
    return types[type] || type;
  };

  // دالة مساعدة لتلوين ستايل المواعيد
  const getAppointmentStatusStyle = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-50 text-green-700 border-green-200";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "COMPLETED":
        return "bg-stone-100 text-stone-600 border-stone-200";
      case "CANCELLED":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-stone-50 text-stone-600";
    }
  };

  const translateStatus = (status) => {
    const statuses = {
      PENDING: "قيد الانتظار",
      CONFIRMED: "مؤكد",
      COMPLETED: "مكتمل",
      CANCELLED: "ملغي",
    };
    return statuses[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin text-stone-700" size={40} />
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 font-cairo p-4">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h2 className="text-xl font-bold text-stone-900 mb-2">
          {error || "المريض غير موجود"}
        </h2>
        <Link
          href="/dashboard/patients"
          className="text-sm font-bold text-orange-500 hover:underline flex items-center gap-1"
        >
          <ArrowRight size={16} /> العودة لقائمة المرضى
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-stone-50 mt-15 p-4 lg:p-8 font-cairo"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-1">
            <Link
              href="/dashboard/patients"
              className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 font-bold text-xs transition-colors mb-2"
            >
              <ArrowRight size={14} /> سجلات المرضى
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl lg:text-3xl font-black text-stone-900 tracking-tight">
                {patient.fullName}
              </h1>
              <span className="text-xs font-bold text-stone-400 bg-stone-200/60 px-2.5 py-1 rounded-lg tracking-wide">
                {patient.patientCode}
              </span>
            </div>
          </div>

          {/* أزرار سريعة لإضافة كشف أو موعد جديد */}
          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/appointments/create?patientId=${patient.id}`}
              className="px-5 py-2.5 bg-white border border-stone-200 text-stone-700 font-bold text-sm rounded-xl hover:bg-stone-50 transition-all flex items-center gap-2"
            >
              <Clock size={16} /> حجز موعد
            </Link>
            <Link
              href={`/dashboard/visits/create?patientId=${patient.id}`}
              className="px-5 py-2.5 bg-stone-900 text-white font-bold text-sm rounded-xl hover:bg-orange-500 shadow-lg shadow-stone-900/10 transition-all flex items-center gap-2"
            >
              <Plus size={16} /> تسجيل زيارة/إجراء جديد
            </Link>
          </div>
        </div>

        {/* Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* العمود الأيمن: كارت التفاصيل الشخصية والطبية الحرجة (ثابت ومعروض دائماً) */}
          <div className="space-y-6 lg:col-span-1">
            {/* 1. الكارت الشخصي */}
            <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-4">
              <h3 className="font-black text-stone-900 text-base border-b border-stone-100 pb-3 flex items-center gap-2">
                <User size={18} className="text-orange-500" /> البيانات الشخصية
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-400 font-bold">الهاتف:</span>
                  <span className="font-bold text-stone-800" dir="ltr">
                    {patient.phone}
                  </span>
                </div>
                {patient.email && (
                  <div className="flex justify-between">
                    <span className="text-stone-400 font-bold">الإيميل:</span>
                    <span className="font-medium text-stone-700">
                      {patient.email}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-400 font-bold">الجنس:</span>
                  <span className="font-bold text-stone-800">
                    {patient.gender === "FEMALE" ? "أنثى" : "ذكر"}
                  </span>
                </div>
                {patient.birthDate && (
                  <div className="flex justify-between">
                    <span className="text-stone-400 font-bold">
                      تاريخ الميلاد:
                    </span>
                    <span className="font-medium text-stone-700">
                      {new Date(patient.birthDate).toLocaleDateString("ar-EG")}
                    </span>
                  </div>
                )}
                {patient.bloodType && (
                  <div className="flex justify-between">
                    <span className="text-stone-400 font-bold">
                      فصيلة الدم:
                    </span>
                    <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs font-black">
                      {patient.bloodType}
                    </span>
                  </div>
                )}
                {(patient.city || patient.address) && (
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-stone-400 font-bold whitespace-nowrap">
                      العنوان:
                    </span>
                    <span className="font-medium text-stone-700 text-left">
                      {patient.city} {patient.address}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 2. التاريخ الطبي والتحذيرات (أهم جزء لعيادات التجميل) */}
            <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-4">
              <h3 className="font-black text-stone-900 text-base border-b border-stone-100 pb-3 flex items-center gap-2">
                <HeartPulse size={18} className="text-red-500" /> التاريخ الطبي
                الحرج
              </h3>

              <div className="space-y-4">
                {/* الحساسية */}
                <div
                  className={`p-3.5 rounded-xl border ${patient.allergies ? "bg-red-50/50 border-red-100 text-red-900" : "bg-stone-50 border-stone-100"}`}
                >
                  <h4 className="text-xs font-black uppercase tracking-wider mb-1 flex items-center gap-1.5 text-stone-500">
                    <ShieldAlert
                      size={14}
                      className={patient.allergies ? "text-red-500" : ""}
                    />{" "}
                    الحساسية (Allergies)
                  </h4>
                  <p className="text-sm font-bold">
                    {patient.allergies || "لا يوجد"}
                  </p>
                </div>

                {/* الأمراض المزمنة */}
                <div className="p-3.5 rounded-xl border bg-stone-50 border-stone-100">
                  <h4 className="text-xs font-black text-stone-500 uppercase tracking-wider mb-1">
                    الأمراض المزمنة
                  </h4>
                  <p className="text-sm font-bold text-stone-800">
                    {patient.chronicDiseases || "لا يوجد أمراض مزمنة مسجلة"}
                  </p>
                </div>

                {/* الأدوية الحالية */}
                <div className="p-3.5 rounded-xl border bg-stone-50 border-stone-100">
                  <h4 className="text-xs font-black text-stone-500 uppercase tracking-wider mb-1">
                    الأدوية الحالية المستمرة
                  </h4>
                  <p className="text-sm font-bold text-stone-800">
                    {patient.medications || "لا يوجد"}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. جهة اتصال الطوارئ */}
            {(patient.emergencyContact || patient.emergencyPhone) && (
              <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-3 text-sm">
                <h3 className="font-black text-stone-900 text-base border-b border-stone-100 pb-2 mb-1">
                  طوارئ الأقارب
                </h3>
                <div className="flex justify-between">
                  <span className="text-stone-400 font-bold">جهة الاتصال:</span>
                  <span className="font-bold text-stone-800">
                    {patient.emergencyContact || "غير مسجل"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400 font-bold">رقم الطوارئ:</span>
                  <span className="font-bold text-stone-800" dir="ltr">
                    {patient.emergencyPhone || "غير مسجل"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* العمود الأيسر: الـ Tabs والبيانات التفصيلية (الزيارات، المواعيد، الملفات) */}
          <div className="lg:col-span-2 space-y-6">
            {/* نظام التنقل بين الـ Tabs */}
            <div className="bg-white p-2 border border-stone-100 shadow-sm rounded-2xl flex items-center gap-2">
              <button
                onClick={() => setActiveTab("visits")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === "visits" ? "bg-stone-900 text-white shadow-md" : "text-stone-500 hover:bg-stone-50"}`}
              >
                <Activity size={16} />
                <span>الزيارات والإجراءات ({patient.visits?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab("appointments")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === "appointments" ? "bg-stone-900 text-white shadow-md" : "text-stone-500 hover:bg-stone-50"}`}
              >
                <Clock size={16} />
                <span>
                  المواعيد وحجز التذاكر ({patient.appointments?.length || 0})
                </span>
              </button>

              <button
                onClick={() => setActiveTab("files")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === "files" ? "bg-stone-900 text-white shadow-md" : "text-stone-500 hover:bg-stone-50"}`}
              >
                <FileText size={16} />
                <span>الملفات والتقارير ({patient.files?.length || 0})</span>
              </button>
            </div>

            {/* محتوى الـ Tabs المتغير */}
            <div className="space-y-6">
              {/* TAB 1: الـ Visits والعمليات الإجرائية */}
              {activeTab === "visits" && (
                <>
                  {patient.visits && patient.visits.length > 0 ? (
                    patient.visits.map((visit) => (
                      <div
                        key={visit.id}
                        className="bg-white rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden"
                      >
                        {/* هيدر كل كشفية / زيارة */}
                        <div className="p-5 lg:p-6 bg-stone-50/70 border-b border-stone-100 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1.5 bg-orange-500 text-white text-xs font-black rounded-xl shadow-sm">
                              {translateVisitType(visit.visitType)}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-stone-400 font-bold">
                              <Calendar size={14} />
                              <span>
                                {new Date(visit.createdAt).toLocaleDateString(
                                  "ar-EG",
                                )}
                              </span>
                            </div>
                          </div>

                          {/* المقاييس الحيوية لو موجودة */}
                          {(visit.bloodPressure || visit.weight) && (
                            <div className="flex items-center gap-4 text-xs font-bold text-stone-500 bg-white border border-stone-200/60 px-3 py-1.5 rounded-xl">
                              {visit.weight && (
                                <span>الوزن: {visit.weight} كجم</span>
                              )}
                              {visit.bloodPressure && (
                                <span>الضغط: {visit.bloodPressure}</span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* محتوى الكشف بالتفصيل */}
                        <div className="p-6 space-y-5">
                          {/* التشخيص والشكوى */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {visit.chiefComplaint && (
                              <div>
                                <h5 className="text-xs font-black text-stone-400 uppercase tracking-wider mb-1">
                                  شكوى المريض الأساسية
                                </h5>
                                <p className="text-sm font-bold text-stone-800 bg-stone-50 p-3 rounded-xl">
                                  {visit.chiefComplaint}
                                </p>
                              </div>
                            )}
                            {visit.diagnosis && (
                              <div>
                                <h5 className="text-xs font-black text-stone-400 uppercase tracking-wider mb-1">
                                  التشخيص والرأي الطبي
                                </h5>
                                <p className="text-sm font-bold text-stone-800 bg-stone-50 p-3 rounded-xl">
                                  {visit.diagnosis}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* خطة العلاج والروشتة */}
                          {(visit.treatmentPlan || visit.prescription) && (
                            <div className="space-y-4 border-t border-stone-100 pt-4">
                              {visit.treatmentPlan && (
                                <div>
                                  <h5 className="text-xs font-black text-stone-400 uppercase tracking-wider mb-1">
                                    خطة العلاج / الجلسات المقررة
                                  </h5>
                                  <p className="text-sm font-medium text-stone-700">
                                    {visit.treatmentPlan}
                                  </p>
                                </div>
                              )}
                              {visit.prescription && (
                                <div className="bg-amber-50/40 border border-amber-100 p-4 rounded-2xl">
                                  <h5 className="text-xs font-black text-amber-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                                    💊 الروشتة العلاجية (Prescription)
                                  </h5>
                                  <p className="text-sm font-bold text-amber-900 whitespace-pre-line leading-relaxed">
                                    {visit.prescription}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* قائمة الإجراءات والخدمات المالية للزيارة */}
                          {visit.procedures && visit.procedures.length > 0 && (
                            <div className="border-t border-stone-100 pt-4 space-y-2">
                              <h5 className="text-xs font-black text-stone-400 uppercase tracking-wider mb-2">
                                الخدمات التجميلية المقدمة في هذه الزيارة
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {visit.procedures.map((proc) => (
                                  <div
                                    key={proc.id}
                                    className="flex items-center gap-2 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl text-xs font-bold text-stone-700"
                                  >
                                    <span>{proc.name}</span>
                                    {proc.price && (
                                      <span className="text-stone-400 border-r border-stone-200 pr-2 mr-1 flex items-center gap-0.5 text-stone-900 font-black">
                                        <DollarSign size={12} />
                                        {proc.price} ج.م
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* صور الحالة في عيادة التجميل (Before / After) */}
                          {visit.images && visit.images.length > 0 && (
                            <div className="border-t border-stone-100 pt-4">
                              <h5 className="text-xs font-black text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                                <ImageIcon size={14} /> معرض صور وتطور الحالة
                              </h5>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {visit.images.map((img) => (
                                  <div
                                    key={img.id}
                                    className="group relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 aspect-square"
                                  >
                                    <img
                                      src={img.imageUrl}
                                      alt={img.type}
                                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    <span
                                      className={`absolute bottom-2 right-2 text-[10px] font-black px-2 py-1 rounded-lg border uppercase ${img.type === "BEFORE" ? "bg-red-500 text-white border-red-600" : img.type === "AFTER" ? "bg-green-500 text-white border-green-600" : "bg-blue-500 text-white border-blue-600"}`}
                                    >
                                      {img.type === "BEFORE"
                                        ? "قبل الإجراء"
                                        : img.type === "AFTER"
                                          ? "بعد الإجراء"
                                          : "تقرير / أشعة"}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* موعد الزيارة القادمة إذا تم تحديده */}
                          {visit.nextVisitDate && (
                            <div className="border-t border-stone-100 pt-4 flex items-center gap-2 text-xs font-bold text-orange-600">
                              <Clock size={14} />
                              <span>
                                تاريخ الزيارة والمتابعة القادمة:{" "}
                                {new Date(
                                  visit.nextVisitDate,
                                ).toLocaleDateString("ar-EG")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white p-12 rounded-[2rem] border border-stone-100 text-center font-bold text-stone-400">
                      لا يوجد أي سجلات زيارات تجميلية سابقة لهذا المريض حتى
                      الآن.
                    </div>
                  )}
                </>
              )}

              {/* TAB 2: الـ Appointments (المواعيد وحجز التذاكر) */}
              {activeTab === "appointments" && (
                <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-6 overflow-hidden">
                  <h3 className="font-black text-stone-900 text-base mb-4">
                    جدول مواعيد الحجز لـ المريض
                  </h3>
                  {patient.appointments && patient.appointments.length > 0 ? (
                    <div className="divide-y divide-stone-100">
                      {patient.appointments.map((appt) => (
                        <div
                          key={appt.id}
                          className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-500 border border-stone-100">
                              <Calendar size={18} />
                            </div>
                            <div>
                              <p className="font-bold text-stone-900 text-sm">
                                {new Date(
                                  appt.appointmentDate,
                                ).toLocaleDateString("ar-EG", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                              <p
                                className="text-xs font-medium text-stone-400 mt-0.5"
                                dir="ltr"
                              >
                                {new Date(
                                  appt.appointmentDate,
                                ).toLocaleTimeString("ar-EG", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {appt.notes && (
                              <span className="text-xs font-medium text-stone-400 hidden md:inline max-w-xs truncate">
                                {appt.notes}
                              </span>
                            )}
                            <span
                              className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${getAppointmentStatusStyle(appt.status)}`}
                            >
                              {translateStatus(appt.status)}
                            </span>
                            <Link
                              href={`/dashboard/visits/create?patientId=${appt.patientId}&appointmentId=${appt.id}`}
                              className="px-3 py-1.5 bg-stone-950 text-white rounded-xl font-bold text-xs hover:bg-orange-500 transition-colors flex items-center gap-1"
                            >
                              <UserPlus size={14} />
                              <span>تسجيل حضور وزيارة</span>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-6 text-stone-400 font-bold text-sm">
                      لا يوجد مواعيد سابقة أو قادمة مسجلة.
                    </p>
                  )}
                </div>
              )}

              {/* TAB 3: الـ Files والملفات الخارجية المرفقة */}
              {activeTab === "files" && (
                <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-6">
                  <h3 className="font-black text-stone-900 text-base mb-4">
                    المستندات والملفات المرفقة بملف المريض
                  </h3>
                  {patient.files && patient.files.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {patient.files.map((file) => (
                        <div
                          key={file.id}
                          className="p-4 border border-stone-100 hover:border-stone-200 rounded-2xl bg-stone-50/50 flex items-center justify-between gap-3 group transition-all"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                              <FileText size={18} />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-stone-800 text-sm truncate">
                                {file.fileName}
                              </p>
                              <p className="text-[10px] text-stone-400 font-medium mt-0.5">
                                {new Date(file.createdAt).toLocaleDateString(
                                  "ar-EG",
                                )}
                              </p>
                            </div>
                          </div>

                          <a
                            href={file.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-stone-400 hover:text-stone-900 hover:bg-white rounded-xl border border-transparent hover:border-stone-200 transition-all shrink-0"
                            title="فتح الملف"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-6 text-stone-400 font-bold text-sm">
                      لا يوجد ملفات خارجية (مثل التحاليل الشاملة) مرفوعة بعد.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;
