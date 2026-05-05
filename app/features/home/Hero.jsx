import React from "react";
import { ArrowLeft, Star, Activity, Users, Award } from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
} from "@/app/Components/shared/MotionWrapper";
import Image from "next/image";

const services = [
  {
    title: "الجراحة التجميلية",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_600/v1777934870/Untitled-design-2025-10-22T162454.315_z4umrg.png",
  },
  {
    title: "العناية بالبشرة",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_600/v1777934765/photo-1570172619644-dfd03ed5d881_uxz3ia.jpg",
  },
  {
    title: "التغذية العلاجية",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_600/v1777934802/photo-1490645935967-10de6ba17061_atnddz.jpg",
  },
  {
    title: "المساج الليمفاوي",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_600/v1777934838/Untitled-design_horopv.png",
  },
];
const stats = [
  { icon: <Users size={24} />, label: "عميل سعيد", value: "+12,000" },
  { icon: <Activity size={24} />, label: "عملية ناجحة", value: "+5,500" },
  { icon: <Star size={24} />, label: "تقييم جوجل", value: "4.9/5" },
  { icon: <Award size={24} />, label: "جائزة دولية", value: "18" },
];

export default function Hero() {
  return (
    <div className="selection:bg-amber-100 selection:text-amber-900">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 lg:pt-0 bg-white overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-50/50 -z-10 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7">
            <StaggerContainer>
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold mb-8 border border-amber-100">
                  <Award size={14} />
                  <span className="tracking-wide">
                    رائد جراحات تنسيق القوام في مصر
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-5xl lg:text-8xl font-black text-stone-900 mb-8 leading-[1.1] tracking-tight">
                  دكتور <br />
                  <span className="text-amber-600 relative">مصطفى العكازي</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-stone-500 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl font-medium">
                  نجمع بين الفن والطب لنمنحك القوام الذي تحلم به. باستخدام أحدث
                  تقنيات الفيزر والـ 4D العالمية.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-stone-900 text-white px-10 py-5 rounded-2xl hover:bg-amber-600 transition-all duration-300 flex items-center gap-3 shadow-2xl shadow-stone-200 font-bold group will-change-transform active:scale-95">
                    احجز استشارتك
                    <ArrowLeft className="group-hover:-translate-x-2 transition-transform duration-300" />
                  </button>
                  <button className="bg-white border border-stone-200 text-stone-800 px-10 py-5 rounded-2xl hover:bg-stone-50 transition-all duration-300 font-bold active:scale-95">
                    قصة نجاح فيرا
                  </button>
                </div>
              </FadeIn>
            </StaggerContainer>
          </div>

          {/* Hero Image with Optimized Animation */}
          <div className="lg:col-span-5 relative">
            <FadeIn delay={0.4} y={0} x={20}>
              <div className="relative aspect-4/5 lg:aspect-square w-full max-w-md mx-auto group">
                <div className="absolute -inset-4 bg-amber-100/40 rounded-[3rem] rotate-6 -z-10 transition-transform duration-1000 group-hover:rotate-2 will-change-transform" />
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] border-8 border-white relative z-10 bg-stone-100">
                  <Image
                    src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_800,c_fill,g_face/v1777934920/WhatsApp-Image-2022-01-26-at-12.02.27-AM-1_jfdglk.jpg"
                    alt="Dr. Mostafa"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-105 will-change-transform"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. Stats Section - Ultra Fast (No Motion Library) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-y border-stone-100 py-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className="text-amber-600 flex justify-center mb-5 transition-transform duration-300 group-hover:-translate-y-2">
                  {stat.icon}
                </div>
                <p className="text-4xl font-black text-stone-900 mb-2">
                  {stat.value}
                </p>
                <p className="text-stone-400 text-sm font-bold tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="grid grid-cols-12 gap-4">
              <Image
                src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_800/v1777934362/photo-1519494026892-80bbd2d6fd0d_inhfzj.jpg"
                className="col-span-7 w-full h-auto rounded-4xl shadow-xl mt-12 hover:scale-[1.02] transition-transform duration-500"
                alt="Clinic"
                width={300}
                height={300}
              />
              <Image
                src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_800/v1777934551/photo-1527613426441-4da17471b66d_prm9fx.jpg"
                className="col-span-5 w-full h-auto rounded-4xl shadow-xl hover:-translate-y-2 transition-transform duration-500"
                alt="Interior"
                width={250}
                height={250}
              />
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black text-stone-900 leading-tight">
              حيث تلتقي الخبرة الطبية <br />
              <span className="text-amber-600">باللمسة الفنية</span>
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed font-medium">
              في عيادة فيرا، نتجاوز مفهوم العلاج التقليدي. نحن نصمم تجربة
              استشفاء وتجميل متكاملة تبدأ من الاستشارة الدقيقة وتنتهي بمتابعة ما
              بعد الإجراء لضمان استدامة النتائج.
            </p>
            <button className="inline-flex items-center gap-2 text-stone-900 font-black text-lg border-b-4 border-amber-500 pb-2 hover:text-amber-600 transition-all duration-300">
              اكتشف عالم فيرا
              <ArrowLeft size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Services Grid - (Optimized with Pure CSS Hover) */}
      <section className="bg-stone-50 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-stone-900">
              خدماتنا المتخصصة
            </h2>
            <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group relative h-125 rounded-[3rem] overflow-hidden cursor-pointer bg-stone-200 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl will-change-transform"
              >
                <Image
                  src={service.image}
                  fill
                  sizes="(max-width: 768px) 100vw, 
         (max-width: 1024px) 50vw, 
         25vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={service.title}
                />

                {/* High-Performance Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <h3 className="text-2xl font-black text-white mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {service.title}
                  </h3>
                  <div className="h-1.5 w-0 group-hover:w-full bg-amber-500 transition-all duration-700 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
