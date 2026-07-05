"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  UserSearch, Plus, Trash2, ImagePlus, CheckCircle, 
  AlertTriangle, Loader2, FileSpreadsheet, Activity, CalendarDays 
} from "lucide-react";

export default function CreateVisitPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // قراءة حقل patientId من رابط الـ URL
  const patientIdFromUrl = searchParams.get("patientId");
  const appointmentIdFromUrl = searchParams.get("appointmentId");
  
  // لافتات التحميل والحالات العامة
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // حالات البحث عن المريض واختياره
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loadingPatientFromUrl, setLoadingPatientFromUrl] = useState(false);

  // حالة بيانات الزيارة والقياسات الأساسية
  const [visitData, setVisitData] = useState({
    visitType: "CONSULTATION",
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

  // حالة مصفوفة الإجراءات المتعددة الديناميكية
  const [procedures, setProcedures] = useState([]);

  // حالة مصفوفة الصور الطبية (روابط محاكاة للرفع السريع)
  const [images, setImages] = useState([]);

  // 🛠️ تأثير (Effect) مخصص لجلب بيانات المريض تلقائياً من الـ URL عند أول render
  useEffect(() => {
    async function fetchPatientById() {
      if (!patientIdFromUrl) return;

      try {
        setLoadingPatientFromUrl(true);
        setError(""); // تصفية أي أخطاء سابقة
        
        // استدعاء الـ API الـ Existing المتاح بالمشروع
        const res = await fetch(`/api/patients/${patientIdFromUrl}`);
        const data = await res.json();

        // التحقق من استجابة الخادم وتوفر المريض
        if (res.ok && data) {
          // إذا كان الـ API يرجع المريض بداخل كائن مثل data.patient قم بتعديلها هنا، المعتاد هو إرجاع الكائن مباشرة
          const patientRecord = data.patient ? data.patient : data;
          
          if (patientRecord && patientRecord.id) {
            setSelectedPatient(patientRecord);
          } else {
            setError("ملف المريض المطلوب غير موجود أو تم حذفه من النظام.");
          }
        } else {
          setError("فشل في العثور على ملف المريض من الرابط، برجاء البحث عنه يدوياً.");
        }
      } catch (err) {
        console.error("Error fetching patient by URL id:", err);
        setError("حدث خطأ غير متوقع أثناء تحميل بيانات المريض تلقائياً.");
      } finally {
        setLoadingPatientFromUrl(false);
      }
    }

    fetchPatientById();
  }, [patientIdFromUrl]);

  // تأثير (Effect) للبحث الفوري عن المريض بناءً على مدخلات المستخدم اليدوية
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        try {
          setSearching(true);
          const res = await fetch(`/api/visits/create?search=${encodeURIComponent(searchQuery)}`);
          const data = await res.json();
          if (data.success) setSearchResults(data.patients);
        } catch (err) {
          console.error(err);
        } finally {
          setSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // إدارة مصفوفة الإجراءات الطبية الإضافية
  const addProcedureField = () => {
    setProcedures([...procedures, { name: "", price: "", description: "" }]);
  };

  const removeProcedureField = (index) => {
    setProcedures(procedures.filter((_, i) => i !== index));
  };

  const updateProcedureField = (index, field, value) => {
    const updated = [...procedures];
    updated[index][field] = value;
    setProcedures(updated);
  };

  // إدارة قسم رفع الصور (محاكاة لاستلام روابط سريعة)
  const addImageField = (type) => {
    const dummyUrl = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=300";
    setImages([...images, { imageUrl: dummyUrl, type: type }]);
  };

  const removeImageField = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // معالجة وتقديم النموذج بالكامل وحفظه
  const handleSubmitVisit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // التحقق الفوري والـ Validation بالواجهة الأمامية
    if (!selectedPatient) {
      setError("يجب البحث عن مريض واختياره أولاً قبل حفظ الاستمارة الطبية.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // التحقق من صحة الإجراءات المدخلة
    for (let proc of procedures) {
      if (!proc.name.trim()) {
        setError("برجاء تحديد اسم الإجراء لجميع الخدمات الطبية المضافة.");
        return;
      }
    }

    try {
      setSubmitting(true);
      const payload = {
        patientId: selectedPatient.id,
        appointmentId: appointmentIdFromUrl,
        ...visitData,
        procedures,
        images
      };

      const res = await fetch("/api/visits/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "فشل في حفظ الزيارة");
      }

      setSuccess("تم تسجيل الزيارة وحفظ المعاملة الطبية الموحدة بنجاح!");
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      setTimeout(() => {
        router.push("/dashboard/visits");
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 mt-15 p-4 lg:p-8 font-cairo" dir="rtl">
      <form onSubmit={handleSubmitVisit} className="max-w-4xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-black text-stone-900">تسجيل زيارة طبية جديدة</h1>
          <p className="text-stone-500 font-medium mt-1">تضمين التشخيصات، الصور الطبية والإجراءات المالية في سجل موحد</p>
        </div>

        {/* عرض إشعارات النجاح أو الأخطاء في الأعلى */}
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

        {/* 1. قسم البحث واختيار المريض */}
        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-4">
          <h3 className="font-black text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-3">
            <UserSearch size={18} className="text-orange-500" /> خطوة 1: تحديد ملف المريض
          </h3>
          
          {/* حالة مؤشر التحميل الخاص بجلب المريض من الرابط التلقائي */}
          {loadingPatientFromUrl ? (
            <div className="p-6 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-center gap-3 text-stone-500 text-sm font-bold">
              <Loader2 className="animate-spin text-stone-600" size={20} />
              <span>جاري استدعاء وربط بيانات المريض المحول تلقائياً...</span>
            </div>
          ) : !selectedPatient ? (
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث هنا عن مريض بكتابة (الاسم الكامل، كود المريض، أو رقم الجوال)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
              />
              {searching && <Loader2 className="absolute left-4 top-3.5 animate-spin text-stone-400" size={18} />}
              
              {/* قائمة نتائج البحث السريعة المنسدلة */}
              {searchResults.length > 0 && (
                <div className="absolute z-20 w-full mt-2 bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden divide-y divide-stone-100">
                  {searchResults.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setSelectedPatient(p);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className="w-full text-right p-4 hover:bg-stone-50 flex items-center justify-between text-sm transition-colors"
                    >
                      <span className="font-bold text-stone-900">{p.fullName}</span>
                      <div className="flex gap-4 text-xs font-medium text-stone-400">
                        <span>كود: {p.patientCode}</span>
                        <span>هاتف: {p.phone}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // عرض بيانات المريض الأساسية بعد الاختيار (أو بعد الجلب التلقائي الناجح من الرابط)
            <div className="p-4 bg-stone-50 border border-stone-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-stone-400">المريض المحدد حالياً:</p>
                <h4 className="text-base font-black text-stone-900">{selectedPatient.fullName}</h4>
                <div className="flex items-center gap-4 text-xs font-bold text-stone-500 mt-1">
                  <span>الكود الإداري: {selectedPatient.patientCode || "غير متوفر"}</span>
                  <span>رقم الهاتف: {selectedPatient.phone}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedPatient(null);
                  // عند تغيير المريض نقوم بمسح الـ param من الرابط لتصفية حالة الصفحة تماماً
                  router.replace("/dashboard/visits/create");
                }}
                className="text-xs font-black text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl transition-colors"
              >
                تغيير المريض
              </button>
            </div>
          )}
        </div>

        {/* 2. قسم البيانات السريرية والطبية للزيارة */}
        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-6">
          <h3 className="font-black text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-3">
            <FileSpreadsheet size={18} className="text-orange-500" /> خطوة 2: الفحص والتشخيص الطبي للزيارة
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-2">
              <label className="text-xs font-black text-stone-700">نوع وهدف الزيارة الحالي *</label>
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
              <label className="text-xs font-black text-stone-700">الشكوى الرئيسية للمريض (Chief Complaint)</label>
              <input
                type="text"
                value={visitData.chiefComplaint}
                onChange={(e) => setVisitData({ ...visitData, chiefComplaint: e.target.value })}
                placeholder="مثال: تجاعيد حول العين، الرغبة في زيادة حجم الشفاه..."
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-700">التشخيص والرأي الطبي النهائي (Diagnosis)</label>
              <textarea
                rows={3}
                value={visitData.diagnosis}
                onChange={(e) => setVisitData({ ...visitData, diagnosis: e.target.value })}
                placeholder="اكتب تفاصيل الفحص الطبي بدقة هنا..."
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:border-stone-900 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-stone-700">الخطة العلاجية المقررة ومراحلها (Treatment Plan)</label>
              <textarea
                rows={3}
                value={visitData.treatmentPlan}
                onChange={(e) => setVisitData({ ...visitData, treatmentPlan: e.target.value })}
                placeholder="توضيح الجلسات المستقبلية الموصى بها..."
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:border-stone-900 resize-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-stone-700">الروشتة والوصفة الطبية الدوائية (Prescription)</label>
            <textarea
              rows={4}
              value={visitData.prescription}
              onChange={(e) => setVisitData({ ...visitData, prescription: e.target.value })}
              placeholder="اكتب أسماء الأدوية، الكريمات المرممة والجرعات المحددة بعد الإجراء..."
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-stone-700">ملاحظات الطبيب السرية الداخلية</label>
            <input
              type="text"
              value={visitData.notes}
              onChange={(e) => setVisitData({ ...visitData, notes: e.target.value })}
              placeholder="ملاحظات تذكيرية إضافية تظهر للطبيب فقط..."
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>

        {/* 3. قسم القياسات الحيوية والطبية للمريض */}
        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-4">
          <h3 className="font-black text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-3">
            <Activity size={18} className="text-orange-500" /> خطوة 3: القياسات والمؤشرات الحيوية
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-700">الطول (سم)</label>
              <input
                type="number"
                step="0.1"
                placeholder="مثال: 168.5"
                value={visitData.height}
                onChange={(e) => setVisitData({ ...visitData, height: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:border-stone-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-700">الوزن (كجم)</label>
              <input
                type="number"
                step="0.1"
                placeholder="مثال: 72"
                value={visitData.weight}
                onChange={(e) => setVisitData({ ...visitData, weight: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:border-stone-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-700">ضغط الدم (Blood Pressure)</label>
              <input
                type="text"
                placeholder="مثال: 120/80"
                value={visitData.bloodPressure}
                onChange={(e) => setVisitData({ ...visitData, bloodPressure: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:border-stone-900 text-left"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* 4. قسم الإجراءات الطبية المتعددة (نموذج ديناميكي مكرر) */}
        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-black text-stone-900 text-base flex items-center gap-2">
              <CheckCircle size={18} className="text-orange-500" /> خطوة 4: الخدمات والإجراءات التجميلية المطبقة
            </h3>
            <button
              type="button"
              onClick={addProcedureField}
              className="px-4 py-2 bg-stone-900 text-white font-bold text-xs rounded-xl hover:bg-stone-800 transition-colors flex items-center gap-1.5"
            >
              <Plus size={14} /> إضافة إجراء طبي
            </button>
          </div>

          {procedures.length === 0 ? (
            <p className="text-center py-6 text-sm text-stone-400 font-bold">لم يتم إدراج أي إجراء خاص أو خدمة مالية لهذه الزيارة حتى الآن.</p>
          ) : (
            <div className="space-y-4">
              {procedures.map((proc, index) => (
                <div key={index} className="p-4 border border-stone-100 bg-stone-50/50 rounded-2xl relative space-y-4">
                  <button
                    type="button"
                    onClick={() => removeProcedureField(index)}
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
                        placeholder="مثال: فوتوشوب ليزر، فيلر شفايف 1ML"
                        value={proc.name}
                        onChange={(e) => updateProcedureField(index, "name", e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-stone-500">سعر الخدمة (ج.م)</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={proc.price}
                        onChange={(e) => updateProcedureField(index, "price", e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-stone-500">وصف فني مختصر للإجراء</label>
                      <input
                        type="text"
                        placeholder="المنطقة المستهدفة، عدد النبضات..."
                        value={proc.description}
                        onChange={(e) => updateProcedureField(index, "description", e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5. قسم الصور التجميلية وتطور الحالة */}
        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-4">
          <h3 className="font-black text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-3">
            <ImagePlus size={18} className="text-orange-500" /> خطوة 5: معرض الأرشفة الطبية وصور الحالة
          </h3>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addImageField("BEFORE")}
              className="px-4 py-2 border.5 border-dashed border-red-200 text-red-700 bg-red-50/50 hover:bg-red-50 text-xs font-black rounded-xl transition-all"
            >
              + إضافة صورة (قبل الإجراء)
            </button>
            <button
              type="button"
              onClick={() => addImageField("AFTER")}
              className="px-4 py-2 border.5 border-dashed border-green-200 text-green-700 bg-green-50/50 hover:bg-green-50 text-xs font-black rounded-xl transition-all"
            >
              + إضافة صورة (بعد الإجراء)
            </button>
            <button
              type="button"
              onClick={() => addImageField("REPORT")}
              className="px-4 py-2 border.5 border-dashed border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-50 text-xs font-black rounded-xl transition-all"
            >
              + إضافة (أشعة / مستند فحص)
            </button>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {images.map((img, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden border border-stone-200 aspect-square group">
                  <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button
                      type="button"
                      onClick={() => removeImageField(i)}
                      className="p-2 bg-white text-red-600 rounded-xl font-bold text-xs shadow"
                    >
                      حذف الصورة
                    </button>
                  </div>
                  <span className={`absolute bottom-2 right-2 text-[9px] font-black px-2 py-0.5 rounded shadow text-white ${
                    img.type === "BEFORE" ? "bg-red-500" : img.type === "AFTER" ? "bg-green-500" : "bg-blue-500"
                  }`}>
                    {img.type === "BEFORE" ? "قبل" : img.type === "AFTER" ? "بعد" : "مستند"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 6. قسم جدولة المتابعة وحفظ السجل بالكامل */}
        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm space-y-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-black text-stone-900 text-base flex items-center gap-2">
              <CalendarDays size={18} className="text-orange-500" /> خطوة 6: حجز المتابعة المستقبلية
            </h3>
            <p className="text-xs font-medium text-stone-400">تحديد موعد مسبق ومقترح لزيارة المريض القادمة للعيادة تلقائياً</p>
          </div>
          
          <input
            type="date"
            value={visitData.nextVisitDate}
            onChange={(e) => setVisitData({ ...visitData, nextVisitDate: e.target.value })}
            className="px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold focus:outline-none focus:border-stone-900"
          />
        </div>

        {/* زر التقديم النهائي */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-8 py-4 bg-stone-900 text-white font-black text-sm rounded-2xl hover:bg-orange-500 shadow-xl shadow-stone-900/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>برجاء الانتظار، جاري تشغيل الـ Transaction...</span>
              </>
            ) : (
              <span>اعتماد وحفظ السجل الطبي النهائي</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}