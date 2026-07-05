import React from "react";
import { CalendarDays } from "lucide-react";
import AppointmentFormClient from "@/app/features/book-appointment/AppointmentFormClient";

export const metadata = {
  title: "حجز موعد أونلاين | Tan Clinics",
  description: "قم بحجز موعدك الطبي الآن بكل سهولة وبدون الحاجة لتسجيل الدخول.",
};

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-cairo" dir="rtl">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-stone-900 flex items-center justify-center text-white shadow-md">
            <CalendarDays size={24} />
          </div>
        </div>
        <h2 className="text-center text-3xl font-black text-stone-900 tracking-tight">
          حجز موعد عيادة أونلاين
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-stone-500 max-w-sm mx-auto leading-relaxed">
          أدخل بياناتك الأساسية واختبر الفخامة والراحة في جدولة مواعيدك الطبية لدى عيادة Tan Clinics
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-sm border border-stone-100 rounded-[2.5rem] sm:px-10">
          {/* استدعاء المكون التفاعلي وإرسال البيانات */}
          <AppointmentFormClient />
        </div>
      </div>
    </div>
  );
}