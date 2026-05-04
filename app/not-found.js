import React from 'react';
import Link from 'next/link';
import { Home, ArrowRight, Search, Phone, MessageSquare } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6 py-24 relative overflow-hidden" dir="rtl">
      
      {/* عناصر خلفية زخرفية (Hardware Accelerated) */}
      <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-amber-100/30 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-100 h-100 bg-stone-200/40 rounded-full blur-[100px] -z-10" />

      <div className="max-w-3xl w-full text-center">
        <div >
          {/* رقم الخطأ بتصميم فخم */}
          <div className="relative inline-block mb-8">
            <h1 className="text-[12rem] lg:text-[18rem] font-black text-stone-900/5 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-amber-900/10 border border-stone-100 transform -rotate-3">
                 <Search size={48} className="text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        <div >
          <h2 className="text-3xl lg:text-5xl font-black text-stone-900 mb-6">
            عذراً، هذه الصفحة <span className="text-amber-600">خارج التغطية</span>
          </h2>
          <p className="text-stone-500 text-lg lg:text-xl mb-12 max-w-lg mx-auto leading-relaxed">
            يبدو أن الرابط الذي اتبعته قد تغير مكانة، أو أن الصفحة خضعت لعملية "تجميل" ونقلناها إلى عنوان جديد!
          </p>
        </div>

        <div >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/" 
              className="w-full sm:w-auto bg-stone-900 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-amber-600 transition-all shadow-xl active:scale-95"
            >
              <Home size={20} />
              العودة للرئيسية
            </Link>
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-white border border-stone-200 text-stone-800 px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-stone-50 transition-all active:scale-95"
            >
              تواصل معنا
              <ArrowRight size={20} className="rotate-180" />
            </Link>
          </div>
        </div>

        {/* روابط سريعة للمريض لضمان عدم خروجه من الموقع */}
        <div>
          <div className="mt-20 pt-12 border-t border-stone-200/60">
            <p className="text-stone-400 font-bold mb-8 uppercase tracking-widest text-sm">قد تكون تبحث عن أحد هذه الأقسام:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "نتائج العمليات", link: "/results" },
                { name: "المجلة الطبية", link: "/blog" },
                { name: "عن د. مصطفى", link: "/about" },
                { name: "حجز موعد", link: "/booking" },
              ].map((item, i) => (
                <Link 
                  key={i} 
                  href={item.link}
                  className="px-4 py-3 rounded-xl bg-stone-100/50 text-stone-600 text-sm font-bold hover:bg-amber-50 hover:text-amber-700 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* المساعدة المباشرة */}
        <div >
          <div className="mt-16 flex items-center justify-center gap-8 text-stone-400">
             <div className="flex items-center gap-2">
                <MessageSquare size={18} />
                <span className="text-xs font-medium">دعم مباشر 24/7</span>
             </div>
             <div className="w-1 h-1 rounded-full bg-stone-300" />
             <div className="flex items-center gap-2">
                <Phone size={18} />
                <span className="text-xs font-medium">01XXXXXXXXXX</span>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}