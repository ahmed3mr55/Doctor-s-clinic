"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Phone, Mail, Calendar, MessageSquare, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export default function AppointmentFormClient() {
  // الحالات التفاعلية للنموذج
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    appointmentDate: "",
    notes: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. واجهة التحقق المبدئي (Frontend Validation)
    if (!formData.fullName.trim()) {
      setError("اسم المريض بالكامل حقل مطلوب لا يمكن تركه فارغاً");
      return;
    }
    if (!formData.phone.trim()) {
      setError("رقم الهاتف حقل مطلوب للتواصل وتأكيد الحجز");
      return;
    }
    if (!formData.appointmentDate) {
      setError("يرجى تحديد التاريخ المفضّل للزيارة");
      return;
    }

    try {
      setSubmitting(true); // منع تكرار الإرسال وتعطيل الزر فوراً
      setError("");

      const response = await fetch("/api/booking-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.error || "فشل إرسال طلب الحجز، يرجى المحاولة مرة أخرى");
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err.message || "حدث خطأ غير متوقع أثناء إرسال طلبك");
    } finally {
      setSubmitting(false);
    }
  };

  // واجهة عرض النجاح بعد إتمام الحجز بنجاح
  if (isSuccess) {
    return (
      <div className="text-center py-6 space-y-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto text-green-600">
          <CheckCircle2 size={40} className="fill-green-50" />
        </div>
        <h3 className="text-xl font-black text-stone-900">تم استلام طلب حجزك بنجاح!</h3>
        <p className="text-stone-500 text-sm leading-relaxed max-w-sm mx-auto">
          شكراً لثقتك بـ <strong className="text-stone-800">Tan Clinics</strong>. سيقوم موظف الاستقبال لدينا بالتواصل معك عبر الهاتف قريباً جداً لتأكيد موعدك النهائي وضبط الوقت المناسب.
        </p>
        <div className="pt-4">
          <button 
            onClick={() => {
              setIsSuccess(false);
              setFormData({ fullName: "", phone: "", email: "", appointmentDate: "", notes: "" });
            }}
            className="text-xs font-bold text-stone-500 hover:text-stone-900 underline underline-offset-4 transition-colors"
          >
            حجز موعد آخر جديد
          </button>
        </div>
      </div>
    );
  }

  // احصل على تاريخ اليوم بتنسيق YYYY-MM-DD لمنع اختيار تواريخ سابقة في حقل التقويم
  const todayString = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* عرض الأخطاء في حال وجودها */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700 font-medium text-sm animate-shake">
          <AlertCircle className="shrink-0" size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* حقل الاسم بالكامل */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-stone-700 block">الاسم بالكامل <span className="text-orange-500">*</span></label>
        <div className="relative">
          <User className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
          <input 
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            disabled={submitting}
            className="w-full pl-4 pr-11 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all disabled:opacity-60"
            placeholder="اكتب اسمك الثلاثي أو الرباعي كالمعتاد"
          />
        </div>
      </div>

      {/* حقل رقم الهاتف */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-stone-700 block">رقم الهاتف <span className="text-orange-500">*</span></label>
        <div className="relative">
          <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
          <input 
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={submitting}
            className="w-full pl-4 pr-11 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all text-right disabled:opacity-60"
            placeholder="01xxxxxxxxx"
          />
        </div>
      </div>

      {/* حقل البريد الإلكتروني */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-stone-700 block">البريد الإلكتروني <span className="text-stone-400">(اختياري)</span></label>
        <div className="relative">
          <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={submitting}
            className="w-full pl-4 pr-11 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all disabled:opacity-60"
            placeholder="name@example.com"
          />
        </div>
      </div>

      {/* حقل تاريخ الحجز المفضل */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-stone-700 block">التاريخ المفضل للحجز <span className="text-orange-500">*</span></label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
          <input 
            type="date"
            name="appointmentDate"
            min={todayString}
            value={formData.appointmentDate}
            onChange={handleInputChange}
            disabled={submitting}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all disabled:opacity-60"
          />
        </div>
      </div>

      {/* حقل الملاحظات */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-stone-700 block">أي ملاحظات أو شكوى طبية تفضل إرفاقها؟</label>
        <div className="relative">
          <MessageSquare className="absolute right-4 top-3 text-stone-400" size={16} />
          <textarea 
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleInputChange}
            disabled={submitting}
            className="w-full pl-4 pr-11 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-all resize-none disabled:opacity-60"
            placeholder="مثال: ليزر، استشارة جلدية، متابعة عملية جراحية، إلخ..."
          />
        </div>
      </div>

      {/* زر الإرسال محمي ضد الضغط المتعدد (Debounce / Disabled Button) */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-black text-white bg-stone-900 hover:bg-stone-800 focus:outline-none transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>جاري إرسال طلب الحجز...</span>
            </>
          ) : (
            <span>تأكيد طلب حجز الموعد الآن</span>
          )}
        </button>
      </div>

    </form>
  );
}