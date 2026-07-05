import React from 'react';
import { Calendar, ShieldCheck, Star, MapPin } from 'lucide-react';
import AppointmentFormClient from '@/app/features/book-appointment/AppointmentFormClient';

export default async function BookingPage() {
  return (
    <main className="bg-[#FAF9F6] min-h-screen pt-32 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* الجانب الأيمن: معلومات ونصائح */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-6">
              <Calendar size={14} />
              <span>مواعيد دقيقة - خصوصية تامة</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black text-stone-900 mb-6 leading-tight">
              ابدأ رحلة <span className="text-amber-600">التحول</span> اليوم
            </h1>
            
            <p className="text-stone-500 text-lg leading-relaxed mb-10">
              احجز استشارتك الخاصة مع د. عبدالرحمن عوف لمناقشة أهدافك الجمالية والحصول على خطة علاجية مخصصة تناسب تطلعاتك.
            </p>

            {/* مميزات الحجز */}
            <div className="space-y-8">
              {[
                {
                  icon: <ShieldCheck className="text-amber-600" />,
                  title: "استشارة طبية شاملة",
                  desc: "فحص دقيق وتقييم كامل للحالة قبل البدء في أي إجراء."
                },
                {
                  icon: <Star className="text-amber-600" />,
                  title: "أحدث التقنيات العالمية",
                  desc: "نستخدم أجهزة الفيزر والـ 4D الحديثة لضمان أفضل النتائج."
                },
                {
                  icon: <MapPin className="text-amber-600" />,
                  title: "موقع متميز وهادئ",
                  desc: "العيادة مجهزة لراحتك التامة في أرقى مناطق القاهرة."
                }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-5">
                  <div className="w-12 h-12 shrink-0 bg-white shadow-sm rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 mb-1">{feature.title}</h4>
                    <p className="text-stone-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الجانب الأيسر: فورم الحجز */}
          <div className="lg:col-span-7">
            <AppointmentFormClient />
          </div>

        </div>

        {/* سيكشن ملاحظة هامة */}
        <div className="mt-20 p-8 rounded-[2rem] bg-stone-100 border border-stone-200 text-center">
          <p className="text-stone-600 text-sm font-medium">
            <span className="text-amber-600 font-bold">ملاحظة:</span> هذا الحجز يعتبر طلباً مبدئياً، وسيتم اعتماده نهائياً بعد تواصل السكرتارية الطبية معك لتأكيد الموعد المتوفر بدقة.
          </p>
        </div>

      </div>
    </main>
  );
}