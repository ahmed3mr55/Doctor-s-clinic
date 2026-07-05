"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  User, Phone, Mail, Calendar, Heart, ShieldAlert, 
  Stethoscope, MapPin, AlertCircle, Save, ArrowRight, Loader2 
} from "lucide-react";

export default function EditPatientFormClient({ initialPatient, serverError, patientId }) {
  const router = useRouter();

  // حالات الصفحة التفاعلية
  const [saving, setSaving] = useState(false);
  const [globalError, setGlobalError] = useState(serverError || "");
  const [successMessage, setSuccessMessage] = useState("");

  // في حال فشل السيرفر في العثور على المريض أو حدوث خطأ فادح قبل الرندر
  if (globalError && !initialPatient) {
    return (
      <div className="min-h-screen bg-stone-50 p-6 flex flex-col items-center justify-center font-cairo" dir="rtl">
        <div className="max-w-md w-full bg-white border border-stone-200 p-8 rounded-[2rem] shadow-sm text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-xl font-black text-stone-900 mb-2">خطأ في تحميل البيانات</h2>
          <p className="text-stone-500 text-sm mb-6 leading-relaxed">{globalError}</p>
          <Link href="/dashboard/patients" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all text-sm w-full">
            <ArrowRight size={16} />
            <span>العودة لسجلات المرضى</span>
          </Link>
        </div>
      </div>
    );
  }

  // ملء النموذج الأولي مباشرة بالبيانات المستلمة من السيرفر بدون التسبب في وميض Loading
  const [formData, setFormData] = useState({
    fullName: initialPatient?.fullName || "",
    phone: initialPatient?.phone || "",
    email: initialPatient?.email || "",
    gender: initialPatient?.gender || "MALE",
    birthDate: initialPatient?.birthDate ? initialPatient.birthDate.split("T")[0] : "",
    bloodType: initialPatient?.bloodType || "",
    allergies: initialPatient?.allergies || "",
    chronicDiseases: initialPatient?.chronicDiseases || "",
    medications: initialPatient?.medications || "",
    city: initialPatient?.city || "",
    address: initialPatient?.address || "",
    emergencyContact: initialPatient?.emergencyContact || "",
    emergencyPhone: initialPatient?.emergencyPhone || "",
    notes: initialPatient?.notes || ""
  });

  // صياغة بيانات القراءة فقط المستلمة من السيرفر
  const readOnlyData = {
    patientCode: initialPatient?.patientCode || "غير متوفر",
    createdAt: initialPatient?.createdAt ? new Date(initialPatient.createdAt).toLocaleDateString("ar-EG", { year: 'numeric', month: 'long', day: 'numeric' }) : "",
    updatedAt: initialPatient?.updatedAt ? new Date(initialPatient.updatedAt).toLocaleDateString("ar-EG", { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ""
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName.trim()) {
      setGlobalError("اسم المريض بالكامل حقل مطلوب لا يمكن تركه فارغاً");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!formData.phone.trim()) {
      setGlobalError("رقم هاتف المريض حقل مطلوب لإتمام عملية التحديث");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setSaving(true);
      setGlobalError("");
      setSuccessMessage("");

      const response = await fetch(`/api/patients/${patientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.error || "فشل تحديث ملف المريض، يرجى مراجعة البيانات");
      }

      setSuccessMessage("تم تحديث بيانات المريض بنجاح وأرشفة التعديلات لـ Tan Clinics");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      setTimeout(() => {
        router.refresh();
      }, 1500);

    } catch (error) {
      setGlobalError(error.message || "فشلت العملية، تأكد من الاتصال بالخادم");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 mt-15 p-4 lg:p-8 font-cairo" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-stone-400 mb-1">
              <Link href="/dashboard/patients" className="hover:text-stone-900 transition-colors">سجلات المرضى</Link>
              <span>/</span>
              <span className="text-stone-600">تعديل الملف الطبي</span>
            </div>
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">تعديل ملف المريض</h1>
            <p className="text-stone-500 font-medium text-sm mt-1">تحديث التاريخ والبيانات الحيوية لعيادة Tan Clinics</p>
          </div>
          <Link 
            href="/dashboard/patients"
            className="inline-flex items-center gap-2 text-stone-600 bg-white border border-stone-200 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-stone-50 transition-all shadow-sm"
          >
            <ArrowRight size={16} />
            <span>إلغاء والعودة</span>
          </Link>
        </div>

        {globalError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 font-medium text-sm">
            <AlertCircle className="shrink-0" size={18} />
            <span>{globalError}</span>
          </div>
        )}
        {successMessage && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-green-700 font-medium text-sm">
            <Heart className="shrink-0 fill-green-700" size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* قسم البيانات الأساسية */}
          <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-900">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-black text-stone-900">البيانات الشخصية والأساسية</h3>
                <p className="text-stone-400 text-xs font-medium">المعلومات الحيوية الثابتة للهوية</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600">الاسم بالكامل <span className="text-orange-500">*</span></label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-11 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                    placeholder="اسم المريض الثلاثي أو الرباعي"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600">رقم الهاتف النشط <span className="text-orange-500">*</span></label>
                <div className="relative">
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input 
                    type="text" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-11 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                    placeholder="01xxxxxxxxx"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600">البريد الإلكتروني (اختياري)</label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-11 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-600">الجنس <span className="text-orange-500">*</span></label>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all appearance-none"
                  >
                    <option value="MALE">ذكر</option>
                    <option value="FEMALE">أنثى</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-600">تاريخ الميلاد</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
                    <input 
                      type="date" 
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* قسم البيانات الطبية والحساسية */}
          <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-900">
                <Stethoscope size={20} />
              </div>
              <div>
                <h3 className="font-black text-stone-900">الملف والتاريخ الطبي</h3>
                <p className="text-stone-400 text-xs font-medium">الأمراض المزمنة، الحساسية، والأدوية الحالية</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="md:col-span-1 space-y-1.5">
                <label className="text-xs font-bold text-stone-600">فصيلة الدم</label>
                <select 
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                >
                  <option value="">غير معروف</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3 space-y-1.5">
                <label className="text-xs font-bold text-stone-600">أنواع الحساسية المرفقة (إن وجدت)</label>
                <input 
                  type="text" 
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                  placeholder="حساسية البنسلين، أطعمة معينة، إلخ..."
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-stone-600">الأمراض المزمنة</label>
                <textarea 
                  name="chronicDiseases"
                  value={formData.chronicDiseases}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all resize-none"
                  placeholder="الضغط، السكري، أمراض القلب..."
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-stone-600">الأدوية الحالية المنتظم عليها</label>
                <textarea 
                  name="medications"
                  value={formData.medications}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all resize-none"
                  placeholder="أسماء الأدوية والجرعات الحالية..."
                />
              </div>
            </div>
          </div>

          {/* قسم بيانات العنوان والسكن */}
          <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-900">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-black text-stone-900">تفاصيل العنوان والسكن</h3>
                <p className="text-stone-400 text-xs font-medium">المنطقة الجغرافية لتوزيع خدمات Tan Clinics</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600">المدينة / المحافظة</label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                  placeholder="الإسكندرية، القاهرة..."
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-stone-600">العنوان التفصيلي</label>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                  placeholder="الشارع، رقم المبنى، رقم الشقة أو الطابق"
                />
              </div>
            </div>
          </div>

          {/* قسم بيانات الاتصال في حالات الطوارئ */}
          <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-900">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3 className="font-black text-stone-900">بيانات الاتصال في الطوارئ</h3>
                <p className="text-stone-400 text-xs font-medium">شخص مقرب يمكن الرجوع إليه فوراً عند الضرورة</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600">اسم شخص مقرب للاتصال</label>
                <input 
                  type="text" 
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                  placeholder="مثال: قريب، الزوج/الزوجة، الوالد"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600">رقم هاتف الطوارئ</label>
                <input 
                  type="text" 
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                  placeholder="01xxxxxxxxx"
                />
              </div>
            </div>
          </div>

          {/* قسم ملاحظات الطبيب والعيادة */}
          <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-4">
            <label className="text-sm font-black text-stone-900 block">ملاحظات طبية وإدارية عامة</label>
            <textarea 
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
              placeholder="أي ملاحظات فنية إضافية حول سلوك الجلسات أو التفضيلات الشخصية للمريض..."
            />
          </div>

          {/* قسم معلومات للقراءة فقط (Read-Only) */}
          <div className="bg-stone-100/50 p-6 rounded-[2rem] border border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-right">
            <div>
              <p className="text-xs font-bold text-stone-400">كود ملف المريض الثابت</p>
              <p className="text-sm font-black text-stone-700 mt-1">{readOnlyData.patientCode}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400">تاريخ تسجيل الملف</p>
              <p className="text-sm font-medium text-stone-700 mt-1">{readOnlyData.createdAt}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400">آخر تحديث ومزامنة للسيرفر</p>
              <p className="text-sm font-medium text-stone-700 mt-1">{readOnlyData.updatedAt}</p>
            </div>
          </div>

          {/* أزرار الحفظ والإرسال */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Link 
              href="/dashboard/patients"
              className="px-6 py-3.5 bg-white text-stone-600 border border-stone-200 font-bold rounded-xl text-sm hover:bg-stone-50 transition-all shadow-sm"
            >
              إلغاء التغييرات
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-stone-900 text-white font-black rounded-xl text-sm hover:bg-orange-500 shadow-lg shadow-stone-900/10 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>جاري حفظ التحديثات...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>حفظ وتحديث الملف</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}