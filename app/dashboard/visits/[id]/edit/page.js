"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowRight, Save, Plus, Trash2, ImagePlus, Loader2, 
  AlertTriangle, CheckCircle, Activity, FileText, LayoutGrid, CalendarDays
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function EditVisitPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const visitId = unwrappedParams.id;

  // لافتات الحالات العامة
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // بيانات المريض (للعرض فقط)
  const [patient, setPatient] = useState(null);

  // الكائن الرئيسي لبيانات الزيارة والقياسات الحيوية
  const [visitData, setVisitData] = useState({
    visitType: "",
    chiefComplaint: "",
    diagnosis: "",
    treatmentPlan: "",
    prescription: "",
    notes: "",
    height: "",
    weight: "",
    bloodPressure: "",
    nextVisitDate: ""
  });

  // مصفوفات الإجراءات والصور الديناميكية
  const [procedures, setProcedures] = useState([]);
  const [images, setImages] = useState([]);

  // دالة جلب بيانات الزيارة الحالية وملء النموذج
  useEffect(() => {
    const fetchVisitData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/visits/${visitId}/edit`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "فشل في جلب بيانات الزيارة");
        }

        const v = data.visit;
        setPatient(v.patient);
        
        // تحويل وتنسيق التاريخ ليتناسب مع حقل الإدخال <input type="date">
        let formattedDate = "";
        if (v.nextVisitDate) {
          formattedDate = new Date(v.nextVisitDate).toISOString().split("T")[0];
        }

        setVisitData({
          visitType: v.visitType,
          chiefComplaint: v.chiefComplaint || "",
          diagnosis: v.diagnosis || "",
          treatmentPlan: v.treatmentPlan || "",
          prescription: v.prescription || "",
          notes: v.notes || "",
          height: v.height?.toString() || "",
          weight: v.weight?.toString() || "",
          bloodPressure: v.bloodPressure || "",
          nextVisitDate: formattedDate
        });

        setProcedures(v.procedures || []);
        setImages(v.images || []);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (visitId) fetchVisitData();
  }, [visitId]);

  // التحكم بمصفوفة الإجراءات الطبية (إضافة، حذف، تعديل)
  const handleAddProcedure = () => {
    setProcedures([...procedures, { name: "", price: "", description: "" }]);
  };

  const handleRemoveProcedure = (index) => {
    setProcedures(procedures.filter((_, i) => i !== index));
  };

  const handleUpdateProcedure = (index, field, value) => {
    const updated = [...procedures];
    updated[index][field] = value;
    setProcedures(updated);
  };

  // التحكم بمصفوفة الصور الطبية (إضافة وحذف)
  const handleAddImage = (type) => {
    const dummyUrl = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=300";
    setImages([...images, { imageUrl: dummyUrl, type }]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // إرسال البيانات المحدثة وحفظها
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Front-end Validation سريع
    for (let proc of procedures) {
      if (!proc.name.trim()) {
        setError("يرجى ملء اسم الإجراء لجميع الخدمات الطبية المدرجة.");
        return;
      }
    }

    try {
      setSubmitting(true);
      const payload = {
        ...visitData,
        procedures,
        images
      };

      const res = await fetch(`/api/visits/${visitId}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "حدث خطأ أثناء تحديث البيانات");
      }

      setSuccess("تم حفظ التعديلات وإغلاق المعاملة الطبية بنجاح!");
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        router.push(`/dashboard/visits/${visitId}`);
      }, 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin text-stone-700" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 mt-15 p-4 lg:p-8 font-cairo" dir="rtl">
      <form onSubmit={handleFormSubmit} className="max-w-4xl mx-auto space-y-8">
        
        {/* هيدر الصفحة */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href={`/dashboard/visits/${visitId}`} className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-900 font-bold text-xs mb-2">
              <ArrowRight size={14} /> العودة لتفاصيل الزيارة
            </Link>
            <h1 className="text-2xl lg:text-3xl font-black text-stone-900">تعديل سجل الزيارة الطبية</h1>
          </div>
        </div>

        {/* تنبيهات النجاح والخطأ */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-center gap-3 font-bold text-sm">
            <AlertTriangle className="shrink-0" size={20} /> <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl flex items-center gap-3 font-bold text-sm">
            <CheckCircle className="shrink-0" size={20} /> <span>{success}</span>
          </div>
        )}

        {/* كارت معلومات المريض الحالي (غير قابل للتعديل لتجنب الأخطاء الإدارية) */}
        {patient && (
          <div className="bg-stone-900 text-white p-6 rounded-[2rem] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-stone-400 text-xs font-bold">ملف المريض الذى يتم التعديل عليه:</p>
              <h3 className="text-lg font-black mt-1">{patient.fullName}</h3>
              <div className="flex gap-4 text-xs font-bold text-stone-300 mt-1">
                <span>كود: {patient.patientCode}</span>
                <span>الهاتف: {patient.phone}</span>
              </div>
            </div>
            <span className="px-3 py-1.5 bg-white/10 rounded-xl text-xs font-bold border border-white/10">سجل نشط</span>
          </div>
        )}

        {/* 1. قسم البيانات الطبية والسريرية */}
        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-6">
          <h3 className="font-black text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-3">
            <FileText size={18} className="text-stone-900" /> 1. الفحص والتشخيص الطبي
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-700">نوع الزيارة الحالي *</label>
              <select
                value={visitData.visitType}
                onChange={(e) => setVisitData({ ...visitData, visitType: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold focus:outline-none focus:border-stone-900"
              >
                <option value="CONSULTATION">كشف / استشارة رئيسية</option>
                <option value="FOLLOW_UP">جلسة متابعة وإعادة</option>
                <option value="LASER">جلسة إزالة بالليزر</option>
                <option value="BOTOX">حقن مادة البوتوكس</option>
                <option value="FILLER">حقن الفيلر التجميلي</option>
                <option value="SURGERY">عملية جراحية تجميلية</option>
                <option value="SKINCARE">جلسة تقشير وعناية بالبشرة</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-black text-stone-700">الشكوى الرئيسية (Chief Complaint)</label>
              <input
                type="text"
                value={visitData.chiefComplaint}
                onChange={(e) => setVisitData({ ...visitData, chiefComplaint: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-700">التشخيص النهائي (Diagnosis)</label>
              <textarea
                rows={3}
                value={visitData.diagnosis}
                onChange={(e) => setVisitData({ ...visitData, diagnosis: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:border-stone-900 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-stone-700">الخطة العلاجية (Treatment Plan)</label>
              <textarea
                rows={3}
                value={visitData.treatmentPlan}
                onChange={(e) => setVisitData({ ...visitData, treatmentPlan: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:border-stone-900 resize-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-stone-700">الروشتة والوصفة الدوائية (Prescription)</label>
            <textarea
              rows={4}
              value={visitData.prescription}
              onChange={(e) => setVisitData({ ...visitData, prescription: e.target.value })}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-stone-700">ملاحظات الطبيب الداخلية</label>
            <input
              type="text"
              value={visitData.notes}
              onChange={(e) => setVisitData({ ...visitData, notes: e.target.value })}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>

        {/* 2. قسم القياسات والمؤشرات الحيوية */}
        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-4">
          <h3 className="font-black text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-3">
            <Activity size={18} className="text-stone-900" /> 2. القياسات الحيوية الحالية
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-700">الطول (سم)</label>
              <input
                type="number"
                step="0.1"
                value={visitData.height}
                onChange={(e) => setVisitData({ ...visitData, height: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-700">الوزن (كجم)</label>
              <input
                type="number"
                step="0.1"
                value={visitData.weight}
                onChange={(e) => setVisitData({ ...visitData, weight: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-700">ضغط الدم</label>
              <input
                type="text"
                value={visitData.bloodPressure}
                onChange={(e) => setVisitData({ ...visitData, bloodPressure: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none text-left"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* 3. قسم إدارة وتعديل الإجراءات الطبية المطبقة */}
        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-black text-stone-900 text-base flex items-center gap-2">
              <LayoutGrid size={18} className="text-stone-900" /> 3. الخدمات والإجراءات الطبية المرفقة
            </h3>
            <button
              type="button"
              onClick={handleAddProcedure}
              className="px-4 py-2 bg-stone-900 text-white font-bold text-xs rounded-xl hover:bg-stone-800 transition-colors flex items-center gap-1"
            >
              <Plus size={14} /> إضافة إجراء جديد
            </button>
          </div>

          {procedures.length === 0 ? (
            <p className="text-center py-4 text-xs font-bold text-stone-400">لا توجد إجراءات مسجلة لهذه الزيارة حالياً.</p>
          ) : (
            <div className="space-y-4">
              {procedures.map((proc, idx) => (
                <div key={idx} className="p-4 border border-stone-100 bg-stone-50/50 rounded-2xl relative space-y-4">
                  <button
                    type="button"
                    onClick={() => handleRemoveProcedure(idx)}
                    className="absolute top-4 left-4 p-2 text-stone-400 hover:text-red-600 hover:bg-white rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pl-8">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-stone-500">اسم الإجراء *</label>
                      <input
                        type="text"
                        required
                        value={proc.name}
                        onChange={(e) => handleUpdateProcedure(idx, "name", e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-stone-500">سعر الخدمة (ج.م)</label>
                      <input
                        type="number"
                        value={proc.price || ""}
                        onChange={(e) => handleUpdateProcedure(idx, "price", e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-stone-500">وصف فني فوري</label>
                      <input
                        type="text"
                        value={proc.description || ""}
                        onChange={(e) => handleUpdateProcedure(idx, "description", e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. قسم معرض الصور التجميلية وتعديلها */}
        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-4">
          <h3 className="font-black text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-3">
            <ImagePlus size={18} className="text-stone-900" /> 4. معرض الصور والتوثيق الطبي للحالة
          </h3>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => handleAddImage("BEFORE")} className="px-3 py-1.5 border border-dashed border-red-200 text-red-700 bg-red-50 text-xs font-black rounded-xl">
              + صورة (قبل الإجراء Before)
            </button>
            <button type="button" onClick={() => handleAddImage("AFTER")} className="px-3 py-1.5 border border-dashed border-green-200 text-green-700 bg-green-50 text-xs font-black rounded-xl">
              + صورة (بعد الإجراء After)
            </button>
            <button type="button" onClick={() => handleAddImage("REPORT")} className="px-3 py-1.5 border border-dashed border-blue-200 text-blue-700 bg-blue-50 text-xs font-black rounded-xl">
              + مستند فحص / تقرير خارجي
            </button>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {images.map((img, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden border border-stone-200 aspect-square group">
                  <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="px-3 py-1.5 bg-white text-red-600 rounded-xl font-bold text-xs shadow hover:bg-red-50"
                    >
                      إزالة الصورة
                    </button>
                  </div>
                  <span className={`absolute bottom-2 right-2 text-[10px] font-black px-2 py-0.5 rounded shadow text-white ${
                    img.type === "BEFORE" ? "bg-red-500" : img.type === "AFTER" ? "bg-green-500" : "bg-blue-500"
                  }`}>
                    {img.type === "BEFORE" ? "قبل" : img.type === "AFTER" ? "بعد" : "تقرير"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5. قسم جدولة المتابعة المستقبلية */}
        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="font-black text-stone-900 text-base flex items-center gap-2">
              <CalendarDays size={18} className="text-stone-900" /> 5. تحديث موعد المتابعة القادمة
            </h3>
            <p className="text-xs font-medium text-stone-400">تعديل موعد المراجعة الدورية الموصى بها للمريض داخل العيادة</p>
          </div>

          <input
            type="date"
            value={visitData.nextVisitDate}
            onChange={(e) => setVisitData({ ...visitData, nextVisitDate: e.target.value })}
            className="px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold focus:outline-none"
          />
        </div>

        {/* أزرار الحفظ والإغلاق النهائي */}
        <div className="flex justify-end gap-3">
          <Link
            href={`/dashboard/visits/${visitId}`}
            className="px-6 py-3.5 border border-stone-200 bg-white text-stone-700 rounded-xl font-bold text-sm hover:bg-stone-50 transition-colors"
          >
            إلغاء الأمر
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3.5 bg-stone-900 text-white font-black text-sm rounded-xl hover:bg-orange-500 shadow-md transition-all flex items-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                <span>جاري حفظ المعاملة...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>حفظ السجل وتعديل البيانات</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}