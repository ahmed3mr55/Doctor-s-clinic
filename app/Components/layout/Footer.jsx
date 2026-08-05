"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer dir="rtl" className="bg-stone-950 text-stone-300">
      {/* Top Main Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & About Column (Spans 4 cols on large screens) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block focus:outline-none rounded-sm">
              <span className="text-3xl font-black tracking-tighter text-white">
                Tan
              </span>
              <span className="text-3xl font-medium italic text-amber-500">
                Clinic
              </span>
            </Link>
            <p className="text-stone-400 leading-relaxed text-sm md:text-base max-w-sm">
              نلتزم بتقديم أعلى معايير الجمال والطب التجميلي، معتمدين على أحدث التقنيات العالمية وبأيدي نخبة من الخبراء المتخصصين لضمان أفضل النتائج.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { Icon: FaInstagram, href: "#", label: "Instagram" },
                { Icon: FaFacebook, href: "#", label: "Facebook" },
                { Icon: FaYoutube, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-amber-600 hover:border-amber-600 hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <nav className="lg:col-span-2" aria-label="روابط سريعة">
            <h3 className="text-white font-semibold text-lg mb-6">روابط سريعة</h3>
            <ul className="space-y-3.5">
              {["عن العيادة", "الخدمات الطبية", "نتائج قبل وبعد", "الأسئلة الشائعة", "المدونة"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item}`}
                    className="text-stone-400 hover:text-amber-500 text-sm font-medium transition-all duration-200 inline-block hover:-translate-x-1.5"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info Column */}
          <address className="lg:col-span-3 not-italic">
            <h3 className="text-white font-semibold text-lg mb-6">معلومات التواصل</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-stone-400 text-sm">
                <MapPin className="text-amber-500 shrink-0 mt-0.5" size={18} />
                <span className="leading-relaxed">
                  الإسكندرية، سموحة <br />
                  شارع فوزي معاذ - أمام جياني للأثاث
                </span>
              </li>
              <li className="flex items-center gap-3 text-stone-400 text-sm">
                <Phone className="text-amber-500 shrink-0" size={18} />
                <a href="tel:01129333196" className="hover:text-amber-500 transition-colors" dir="ltr">
                  011 2933 3196
                </a>
              </li>
              <li className="flex items-center gap-3 text-stone-400 text-sm">
                <Mail className="text-amber-500 shrink-0" size={18} />
                <a href="mailto:info@tanclinics.net" className="hover:text-amber-500 transition-colors">
                  info@tanclinics.net
                </a>
              </li>
            </ul>
          </address>

          {/* Map Area Column */}
          <div className="lg:col-span-3 flex flex-col h-full">
            <h3 className="text-white font-semibold text-lg mb-6">موقعنا</h3>
            <div className="rounded-xl overflow-hidden h-36 bg-stone-900 border border-stone-800 flex-1 relative group">
              {/* Replace with actual iframe when ready */}
              <div className="absolute inset-0 flex items-center justify-center text-stone-500 text-sm">
                خريطة تفاعلية
              </div>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-stone-500">
          <p>© {currentYear} Tan Clinics. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">شروط الاستخدام</Link>
          </div>
        </div>
      </div>

      {/* WhatsApp Fixed Floating Button */}
      <a
        href="https://wa.me/201129333196"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        className="fixed bottom-6 left-6 md:bottom-8 md:left-8 bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300 z-[90] group flex items-center justify-center"
      >
        <span className="absolute right-full mr-4 bg-stone-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none shadow-xl whitespace-nowrap">
          تحدث معنا الآن
          {/* Tooltip Triangle */}
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-stone-900" />
        </span>
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.435 5.63 1.435h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  );
}