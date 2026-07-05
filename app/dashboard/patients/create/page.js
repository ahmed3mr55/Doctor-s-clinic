"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  ShieldAlert, 
  HeartPulse, 
  FileText, 
  Loader2, 
  CheckCircle2 
} from "lucide-react";
import Link from "next/link";

const CreatePatientPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // الحالة الخاصة بالفورم متطابقة مع حقول الـ Prisma Model للـ Patient
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    gender: "FEMALE", // افتراضي لعيادات التجميل
    birthDate: "",
    bloodType: "",
    address: "",
    city: "",
    emergencyContact: "",
    emergencyPhone: "",
    allergies: "",
    chronicDiseases: "",
    medications: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "حدث خطأ أثناء حفظ بيانات المريض");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/patients"); // التوجيه لصفحة المرضى بعد النجاح
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 mt-15 p-4 lg:p-8 font-cairo" dir="rtl">
      <div className=" mx-auto">
        
        {/* Back Button & Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard/patients" 
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 font-bold text-sm mb-4 transition-colors"
          >
            <ArrowRight size={16} />
            <span>العودة لسجلات المرضى</span>
          </Link>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">
            إضافة مريض جديد
          </h1>
          <p className="text-stone-500 font-medium mt-1">
            إنشاء ملف طبي جديد متكامل للمريض في عيادة Tan Clinics
          </p>
        </div>

        {/* Notifications */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl font-bold text-sm flex items-center gap-2">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl font-bold text-sm flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>تم تسجيل المريض بنجاح! جاري تحويلك لوحة التحكم...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: البيانات الأساسية */}
          <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4 mb-2">
              <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                <User size={16} />
              </div>
              <h3 className="text-lg font-black text-stone-900">البيانات الشخصية والاتصال</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* الاسم الكامل */}
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider block">الاسم بالكامل *</label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="اسم المريض ثلاثي أو رباعي"
                    className="w-full pl-4 pr-11 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* رقم الهاتف */}
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider block">رقم الهاتف *</label>
                <div className="relative">
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01xxxxxxxxx"
                    className="w-full pl-4 pr-11 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* البريد الإلكتروني */}
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider block">البريد الإلكتروني (اختياري)</label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@clinic.com"
                    className="w-full pl-4 pr-11 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* الجنس */}
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider block">الجنس *</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex items-center justify-center gap-2 p-3.5 border rounded-2xl font-bold text-sm cursor-pointer transition-all ${formData.gender === "FEMALE" ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/10" : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"}`}>
                    <input type="radio" name="gender" value="FEMALE" checked={formData.gender === "FEMALE"} onChange={handleChange} className="hidden" />
                    <span>أنثى</span>
                  </label>
                  <label className={`flex items-center justify-center gap-2 p-3.5 border rounded-2xl font-bold text-sm cursor-pointer transition-all ${formData.gender === "MALE" ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/10" : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"}`}>
                    <input type="radio" name="gender" value="MALE" checked={formData.gender === "MALE"} onChange={handleChange} className="hidden" />
                    <span>ذكر</span>
                  </label>
                </div>
              </div>

              {/* تاريخ الميلاد */}
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider block">تاريخ الميلاد</label>
                <div className="relative">
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full pl-4 pr-11 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* فصيلة الدم */}
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider block">فصيلة الدم</label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm font-bold text-stone-700 focus:outline-none focus:border-orange-500 focus:bg-white transition-all appearance-none"
                >
                  <option value="">اختر فصيلة الدم</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* المدينة */}
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider block">المدينة</label>
                <div className="relative">
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="مثال: الإسكندرية"
                    className="w-full pl-4 pr-11 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* العنوان */}
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider block">العنوان السكني</label>
                <div className="relative">
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="الشارع، رقم المبنى، الدور"
                    className="w-full pl-4 pr-11 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: بيانات الطوارئ */}
          <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4 mb-2">
              <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                <ShieldAlert size={16} />
              </div>
              <h3 className="text-lg font-black text-stone-900">جهة اتصال للطوارئ</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider block">اسم شخص للطوارئ</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="اسم القريب (الأب، الزوج، ...)"
                  className="w-full px-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider block">رقم هاتف الطوارئ</label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  placeholder="رقم الهاتف الخاص به"
                  className="w-full px-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Section 3: التاريخ الطبي الحرج للـ تجميل */}
          <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4 mb-2">
              <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <HeartPulse size={16} />
              </div>
              <h3 className="text-lg font-black text-stone-900">التاريخ المرضي والصحي (هام جداً قبل الفيلر والليزر)</h3>
            </div>

            <div className="space-y-6">
              {/* الحساسية */}
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider block">أنواع الحساسية (Allergies)</label>
                <textarea
                  name="allergies"
                  rows={2}
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="مثال: حساسية من البنسلين، حساسية من كريمات معينة..."
                  className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* الأمراض المزمنة */}
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider block">أمراض مزمنة (Chronic Diseases)</label>
                <textarea
                  name="chronicDiseases"
                  rows={2}
                  value={formData.chronicDiseases}
                  onChange={handleChange}
                  placeholder="مثال: السكري، الضغط، أمراض سيولة الدم، ذئبة حمراء..."
                  className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* الأدوية المستمرة */}
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider block">الأدوية الحالية المستمرة (Medications)</label>
                <textarea
                  name="medications"
                  rows={2}
                  value={formData.medications}
                  onChange={handleChange}
                  placeholder="مثال: أدوية سيولة (أسبرين)، كورتيزون، أدوية روتان لحب الشباب..."
                  className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* ملاحظات عامة */}
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider block">ملاحظات إضافية</label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="أي ملاحظات إضافية تخص حالة المريض التجميلية أو طلباته الخاصة..."
                  className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Link
              href="/dashboard/patients"
              className="px-6 py-3.5 border border-stone-200 text-stone-600 rounded-2xl font-bold text-sm hover:bg-stone-100 transition-all"
            >
              إلغاء
            </Link>
            
            <button
              type="submit"
              disabled={loading || success}
              className="flex items-center justify-center gap-2 px-10 py-3.5 bg-stone-900 text-white rounded-2xl font-bold hover:bg-orange-500 disabled:bg-stone-300 shadow-xl shadow-stone-200/50 transition-all transform hover:-translate-y-1"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <span>حفظ ملف المريض</span>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreatePatientPage;