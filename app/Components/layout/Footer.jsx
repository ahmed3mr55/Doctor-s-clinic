"use client";
import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer dir="rtl" className="bg-stone-900 text-stone-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <span className="text-3xl font-bold text-white">
              Tan<span className="text-amber-500">Clinic</span>
            </span>
            <p className="text-stone-400 leading-relaxed italic">
              نلتزم بتقديم أعلى معايير الجمال والطب التجميلي بأحدث التقنيات العالمية وبأيدي خبراء متخصصين.
            </p>
            <div className="flex gap-4">
              {[FaInstagram, FaFacebook, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 border-r-4 border-amber-500 pr-4">روابط سريعة</h4>
            <ul className="space-y-4">
              {['عن العيادة', 'خدمات الجراحة', 'نتائج قبل وبعد', 'الأسئلة الشائعة', 'انضم لفريقنا'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-amber-500 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-800" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 border-r-4 border-amber-500 pr-4">معلومات التواصل</h4>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <MapPin className="text-amber-500 shrink-0" size={20} />
                <span>الإسكندرية، سموحة، شارع فوزي معاذ - أمام جياني للاثاث.</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-amber-500 shrink-0" size={20} />
                <span dir="ltr">01129333196</span>
              </li>
              <li className="flex gap-3">
                <Mail className="text-amber-500 shrink-0" size={20} />
                <span>info@Tan Clinics.net</span>
              </li>
            </ul>
          </div>

          {/* Map Area */}
          <div className="relative group">
            <h4 className="text-white font-bold text-lg mb-6 border-r-4 border-amber-500 pr-4">موقعنا</h4>
            <div className="rounded-2xl overflow-hidden h-44 bg-stone-800 border border-stone-700">
               {/* هنا يتم وضع Iframe الخريطة الفعلي */}
               <div className="w-full h-full flex items-center justify-center text-stone-500 text-sm italic">
                  جاري تحميل الخريطة التفاعلية...
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <p>© {new Date().getFullYear()} Tan Clinics. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">سياسة الخصوصية</Link>
            <Link href="#" className="hover:text-white">شروط الاستخدام</Link>
          </div>
        </div>
      </div>

      {/* WhatsApp - Production Level Button */}
      <a 
        href="https://wa.me/01129333196" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-[99] group"
      >
        <span className="absolute right-full ml-3 bg-white text-stone-800 px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          تحدث معنا الآن
        </span>
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.435 5.63 1.435h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  );
};

export default Footer;