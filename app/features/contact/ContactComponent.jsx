"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Send, 
  Instagram, 
  Facebook 
} from 'lucide-react';

// 1. إعدادات الأنميشن (Variants) لسهولة الاستخدام داخل الملف
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const ContactComponent = () => {
  return (
    <main className="bg-[#FAF9F6] min-h-screen pt-24 pb-16 overflow-x-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Header Section --- */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-amber-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">إحجز إستشارتك الآن</span>
          <h1 className="text-4xl lg:text-6xl font-black text-stone-900 mb-6 leading-tight">
            نحن هنا لنرسم <span className="text-amber-600 italic">جمالك</span> القادم
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed">
            فريق عيادة فيرا الطبي جاهز للإجابة على جميع استفساراتكم وتحديد موعد لرحلة التغيير الخاصة بكم.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* --- قنوات التواصل (Right Side) --- */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { 
                icon: <Phone className="text-amber-600" size={24} />, 
                title: "إتصال هاتفي", 
                value: "01023456789", 
                desc: "متاح للحجز والاستفسار الفوري" 
              },
              { 
                icon: <MessageSquare className="text-amber-600" size={24} />, 
                title: "واتساب", 
                value: "تحدث مع المنسقة", 
                desc: "رد سريع لجميع الأسئلة والأسعار" 
              },
              { 
                icon: <MapPin className="text-amber-600" size={24} />, 
                title: "العنوان", 
                value: "القاهرة، التجمع الخامس", 
                desc: "مول فيرا الطبي - الدور الثالث" 
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-[2rem] border border-stone-100 flex items-start gap-5 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300 group"
              >
                <div className="bg-amber-50 p-4 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900 mb-1">{item.title}</h3>
                  <p className="text-stone-800 font-medium mb-1">{item.value}</p>
                  <p className="text-stone-400 text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* ساعات العمل */}
            <motion.div 
              variants={fadeInUp}
              className="bg-stone-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-amber-600/20 rounded-full blur-3xl -translate-x-10 -translate-y-10" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Clock className="text-amber-500" size={20} />
                  ساعات العمل الرسمية
                </h3>
                <div className="space-y-3 text-sm opacity-90">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span>من السبت إلى الخميس</span>
                    <span className="font-bold text-amber-500">10:00 ص - 09:00 م</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span>يوم الجمعة</span>
                    <span className="text-stone-400 italic">للطوارئ والعمليات فقط</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* --- نموذج التواصل (Left Side) --- */}
          <motion.div 
            className="lg:col-span-7 bg-white p-8 lg:p-12 rounded-[3rem] shadow-2xl shadow-stone-200/50 border border-stone-100 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 block px-2">الاسم بالكامل</label>
                  <input type="text" placeholder="مثال: سارة أحمد" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-transparent focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 block px-2">رقم الموبايل</label>
                  <input type="tel" placeholder="01xxxxxxxxx" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-transparent focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all text-left" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 block px-2">الخدمة المطلوبة</label>
                <div className="relative">
                  <select className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-transparent focus:bg-white focus:border-amber-500 outline-none transition-all appearance-none cursor-pointer">
                    <option>تنسيق القوام (فيزر)</option>
                    <option>حقن الدهون الذاتية</option>
                    <option>شد الترهلات</option>
                    <option>تجميل الوجه</option>
                  </select>
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">▼</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 block px-2">رسالتك (اختياري)</label>
                <textarea rows={4} placeholder="اكتب استفسارك هنا..." className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-transparent focus:bg-white focus:border-amber-500 outline-none transition-all resize-none"></textarea>
              </div>

              <button className="w-full bg-stone-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-4 hover:bg-amber-600 transition-all duration-500 group shadow-xl shadow-stone-900/10">
                إرسال الطلب الآن
                <Send size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="text-center text-xs text-stone-400 mt-6">
              * سيتم التواصل معك خلال أقل من 24 ساعة من قبل المنسقة الطبية.
            </p>
          </motion.div>
        </div>

        {/* --- الخريطة (Full Width) --- */}
        <motion.div 
          className="mt-20 rounded-[3rem] overflow-hidden h-[400px] border-[10px] border-white shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 group"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
           <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.21!2d31.332!3d30.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAzJzM2LjAiTiAzMcKwMTknNTUuMiJF!5e0!3m2!1sen!2seg!4v1625000000000!5m2!1sen!2seg" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
            ></iframe>
        </motion.div>

      </div>
    </main>
  );
};

export default ContactComponent;