"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, Printer, Edit3, Trash2, Calendar, User, 
  Activity, DollarSign, Image as ImageIcon, HeartPulse, 
  FileText, MapPin, Loader2, AlertCircle 
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function VisitDetailsPage({ params }) {
  const router = useRouter();
  
  // فك الـ params المتوافقة مع Next.js
  const unwrappedParams = use(params);
  const visitId = unwrappedParams.id;

  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    const fetchVisitDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/visits/${visitId}/detail`, { cache: "no-store" });
        const data = await res.json();
        
        if (!res.ok || !data.success) {
          throw new Error(data.error || "فشل في تحميل تفاصيل الزيارة");
        }
        setVisit(data.visit);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (visitId) fetchVisitDetails();
  }, [visitId]);

  // حساب إجمالي تكلفة الإجراءات الطبية المطبقة في الزيارة
  const calculateTotalCost = () => {
    if (!visit?.procedures) return 0;
    return visit.procedures.reduce((acc, proc) => acc + (proc.price || 0), 0);
  };

  // دالة الحذف السريع للزيارة
  const handleDelete = async () => {
    if (!confirm("هل أنت متأكد من حذف هذه الزيارة نهائياً؟ سيتم مسح كافة البيانات والصور الطبية المرتبطة بها.")) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/visits/${visitId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        router.push("/dashboard/visits");
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("حدث خطأ أثناء محاولة الحذف");
    } finally {
      setDeleting(false);
    }
  };

  // تفعيل خاصية طباعة الصفحة للتقرير الطبي
  const handlePrint = () => {
    window.print();
  };

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

  // معالجة حالة التحميل (Loading State)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin text-stone-700" size={40} />
      </div>
    );
  }

  // معالجة حالة الخطأ (Error State)
  if (error || !visit) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 font-cairo p-4">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h2 className="text-xl font-bold text-stone-900 mb-2">{error || "الزيارة الطبية غير موجودة"}</h2>
        <Link href="/dashboard/visits" className="text-sm font-bold text-orange-500 hover:underline flex items-center gap-1">
          <ArrowRight size={16} /> العودة لقائمة الزيارات
        </Link>
      </div>
    );
  }

  // تصفية فرعية للصور حسب النوع لعرضها في الجاليري
  const beforeImages = visit.images?.filter((img) => img.type === "BEFORE") || [];
  const afterImages = visit.images?.filter((img) => img.type === "AFTER") || [];
  const reportImages = visit.images?.filter((img) => img.type === "REPORT") || [];

  return (
    <div className="min-h-screen bg-stone-50 mt-15 p-4 lg:p-8 font-cairo" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* هيدر الصفحة - يختفي تلقائياً عند الطباعة print:hidden */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6 print:hidden">
          <div className="space-y-1">
            <Link href="/dashboard/visits" className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 font-bold text-xs transition-colors mb-2">
              <ArrowRight size={14} /> سجل الزيارات الطبية
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl lg:text-3xl font-black text-stone-900">تفاصيل الزيارة الطبية</h1>
              <span className="text-xs font-bold text-stone-500 bg-stone-200/60 px-3 py-1 rounded-xl">
                {translateVisitType(visit.visitType)}
              </span>
            </div>
          </div>

          {/* أزرار الإدارة والتحكم والطباعة */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-white border border-stone-200 text-stone-700 font-bold text-sm rounded-xl hover:bg-stone-50 transition-all flex items-center gap-2"
            >
              <Printer size={16} /> طباعة التقرير
            </button>
            <Link
              href={`/dashboard/visits/edit/${visit.id}`}
              className="px-4 py-2.5 bg-white border border-stone-200 text-blue-600 font-bold text-sm rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2"
            >
              <Edit3 size={16} /> تعديل البيانات
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2.5 bg-red-50 text-red-600 font-bold text-sm rounded-xl hover:bg-red-100 transition-all flex items-center gap-2 disabled:opacity-40"
            >
              <Trash2 size={16} /> {deleting ? "جاري الحذف..." : "حذف الزيارة"}
            </button>
          </div>
        </div>

        {/* هيدر ترويسة خاص يظهر فقط في ورقة الطباعة لشعار العيادة */}
        <div className="hidden print:flex items-center justify-between border-b-2 border-stone-900 pb-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-stone-900">Tan Clinics</h2>
            <p className="text-xs text-stone-500 mt-0.5">عيادة التجميل والعناية المتكاملة بالبشرة</p>
          </div>
          <div className="text-left text-xs text-stone-500">
            <p>التاريخ: {new Date(visit.createdAt).toLocaleDateString("ar-EG")}</p>
            <p>رقم السجل الرقمي للزيارة: {visit.id.substring(0, 8)}</p>
          </div>
        </div>

        {/* كتل البيانات الرئيسية للتقرير */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* الكارت الأيمن: بيانات المريض + القياسات الحيوية */}
          <div className="md:col-span-1 space-y-6">
            {/* أ- كارت المريض شخصياً */}
            <div className="bg-white p-5 rounded-[2rem] border border-stone-100 shadow-sm space-y-4 print:border-none print:p-0">
              <h3 className="font-black text-stone-900 text-sm border-b border-stone-100 pb-3 flex items-center gap-2 print:text-base">
                <User size={16} className="text-orange-500 print:hidden" /> بيانات ملف المريض
              </h3>
              <div className="space-y-2.5 text-xs font-bold">
                <div className="flex justify-between"><span className="text-stone-400">الاسم الكامل:</span><span className="text-stone-900">{visit.patient.fullName}</span></div>
                <div className="flex justify-between"><span className="text-stone-400">كود الملف:</span><span className="text-stone-800 tracking-wider">{visit.patient.patientCode}</span></div>
                <div className="flex justify-between"><span className="text-stone-400">رقم الهاتف:</span><span className="text-stone-800" dir="ltr">{visit.patient.phone}</span></div>
                <div className="flex justify-between"><span className="text-stone-400">الجنس:</span><span>{visit.patient.gender === "FEMALE" ? "أنثى" : "ذكر"}</span></div>
                {visit.patient.city && <div className="flex justify-between"><span className="text-stone-400">المدينة / المنطقة:</span><span>{visit.patient.city}</span></div>}
              </div>
            </div>

            {/* ب- كارت القياسات الحيوية السريرية */}
            {(visit.height || visit.weight || visit.bloodPressure) && (
              <div className="bg-white p-5 rounded-[2rem] border border-stone-100 shadow-sm space-y-4 print:border-none print:p-0">
                <h3 className="font-black text-stone-900 text-sm border-b border-stone-100 pb-3 flex items-center gap-2 print:text-base">
                  <Activity size={16} className="text-orange-500 print:hidden" /> المؤشرات والقياسات الحيوية
                </h3>
                <div className="space-y-2.5 text-xs font-bold">
                  {visit.height && <div className="flex justify-between"><span className="text-stone-400">الطول:</span><span className="text-stone-800">{visit.height} سم</span></div>}
                  {visit.weight && <div className="flex justify-between"><span className="text-stone-400">الوزن الحالي:</span><span className="text-stone-800">{visit.weight} كجم</span></div>}
                  {visit.bloodPressure && <div className="flex justify-between"><span className="text-stone-400">ضغط الدم:</span><span className="text-stone-800 text-left" dir="ltr">{visit.bloodPressure}</span></div>}
                </div>
              </div>
            )}
          </div>

          {/* الجزء الأيسر: تفاصيل الفحص الطبي والشكوى والروشتة */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-5 print:border-none print:p-0">
              
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-black text-stone-900 text-base flex items-center gap-2">
                  <FileText size={18} className="text-orange-500 print:hidden" /> سجل الفحص السريري والتشخيص
                </h3>
                <span className="text-xs font-bold text-stone-400" dir="ltr">
                  {new Date(visit.createdAt).toLocaleDateString("ar-EG", { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>

              {/* الشكوى والتشخيص */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {visit.chiefComplaint && (
                  <div className="space-y-1">
                    <h5 className="text-xs font-black text-stone-400 uppercase">الشكوى الأساسية والأعراض</h5>
                    <p className="text-sm font-bold text-stone-800 bg-stone-50 p-3 rounded-xl print:bg-none print:p-0">{visit.chiefComplaint}</p>
                  </div>
                )}
                {visit.diagnosis && (
                  <div className="space-y-1">
                    <h5 className="text-xs font-black text-stone-400 uppercase">التشخيص الطبي والتوصيف</h5>
                    <p className="text-sm font-bold text-stone-800 bg-stone-50 p-3 rounded-xl print:bg-none print:p-0">{visit.diagnosis}</p>
                  </div>
                )}
              </div>

              {/* الخطة العلاجية */}
              {visit.treatmentPlan && (
                <div className="space-y-1 border-t border-stone-50 pt-3">
                  <h5 className="text-xs font-black text-stone-400 uppercase">الخطة العلاجية المقررة</h5>
                  <p className="text-sm font-medium text-stone-700 leading-relaxed">{visit.treatmentPlan}</p>
                </div>
              )}

              {/* الروشتة الدوائية الطبية */}
              {visit.prescription && (
                <div className="p-4 bg-amber-50/40 border border-amber-100 rounded-2xl space-y-2 print:bg-none print:border-stone-200">
                  <h4 className="text-xs font-black text-amber-800 flex items-center gap-1">💊 الوصفة والروشتة الطبية (Rx)</h4>
                  <p className="text-sm font-bold text-amber-950 whitespace-pre-line leading-relaxed">{visit.prescription}</p>
                </div>
              )}

              {/* ملاحظات الطبيب */}
              {visit.notes && (
                <div className="space-y-1 border-t border-stone-50 pt-3 print:hidden">
                  <h5 className="text-xs font-black text-stone-400 uppercase">ملاحظات الطبيب الداخلية</h5>
                  <p className="text-xs font-medium text-stone-500 italic">{visit.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* قسم الإجراءات الطبية المطبقة وموجز الحسابات المالي */}
        {visit.procedures && visit.procedures.length > 0 && (
          <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-4 print:border-none print:p-0">
            <h3 className="font-black text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-3">
              <DollarSign size={18} className="text-orange-500 print:hidden" /> الإجراءات الطبية وتكلفتها المالية
            </h3>
            
            <div className="divide-y divide-stone-100">
              {visit.procedures.map((proc) => (
                <div key={proc.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">{proc.name}</h4>
                    {proc.description && <p className="text-xs text-stone-400 font-medium mt-0.5">{proc.description}</p>}
                  </div>
                  <span className="text-sm font-black text-stone-800">
                    {proc.price ? `${proc.price.toLocaleString("ar-EG")} ج.م` : "مجاني / مشمول"}
                  </span>
                </div>
              ))}
              
              {/* حساب وعرض الإجمالي */}
              <div className="pt-4 flex justify-between items-center text-base font-black text-stone-950">
                <span>إجمالي تكلفة زيارة المريض المعتمدة:</span>
                <span className="text-lg text-orange-600 bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-xl print:bg-none print:border-none print:p-0 print:text-stone-950">
                  {calculateTotalCost().toLocaleString("ar-EG")} ج.م
                </span>
              </div>
            </div>
          </div>
        )}

        {/* قسم معرض الصور التجميلية الاحترافي (يخفي تلقائياً في الطباعة لحفظ الورق والحبر) */}
        {visit.images && visit.images.length > 0 && (
          <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-6 print:hidden">
            <h3 className="font-black text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-3">
              <ImageIcon size={18} className="text-orange-500" /> معرض تطور وأرشفة الصور الطبية
            </h3>

            {/* تصنيف الصور وعرضها ديناميكياً */}
            <div className="space-y-6">
              {[
                { title: "الصور قبل بدء الإجراء (Before)", data: beforeImages, color: "bg-red-500" },
                { title: "الصور بعد الإجراء والنتائج (After)", data: afterImages, color: "bg-green-500" },
                { title: "التقارير الطبية والمستندات الخارجية (Reports)", data: reportImages, color: "bg-blue-500" }
              ].map((section, idx) => section.data.length > 0 && (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${section.color}`}></span>
                    <h4 className="text-xs font-black text-stone-700">{section.title}</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {section.data.map((img) => (
                      <div key={img.id} className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 aspect-square hover:shadow-md transition-shadow group">
                        <img src={img.imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <a 
                          href={img.imageUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-xs font-bold text-white"
                        >
                          عرض حجم كامل
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* قسم موعد المتابعة القادمة الموصى به */}
        {visit.nextVisitDate && (
          <div className="bg-white p-5 rounded-[2rem] border border-stone-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <div>
                <h4 className="text-sm font-black text-stone-900">موعد جلسة المتابعة القادمة المقررة</h4>
                <p className="text-xs text-stone-400 font-medium mt-0.5">يُرجى التنبيه على المريض بضرورة الالتزام بموعد المراجعة الدورية</p>
              </div>
            </div>
            <span className="text-sm font-black text-orange-600 bg-orange-50 border border-orange-100 px-4 py-2 rounded-xl" dir="ltr">
              {new Date(visit.nextVisitDate).toLocaleDateString("ar-EG", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        )}

      </div>
    </div>
  );
}