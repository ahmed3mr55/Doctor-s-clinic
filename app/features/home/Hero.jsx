import React from "react";
import {
  ArrowLeft,
  Star,
  Activity,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
} from "@/app/Components/shared/MotionWrapper";
import Image from "next/image";
import HeroSection from "./HeroSection";

const services = [
  {
    title: "الجراحة التجميلية",
    tag: "تنسيق وتشكيل القوام",
    description: "أحدث تقنيات الفيزر الـ 4D لنحت العضلات وإبراز معالم الجسم الطبيعية.",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_1200/v1777934870/Untitled-design-2025-10-22T162454.315_z4umrg.png",
  },
  {
    title: "العناية بالبشرة",
    tag: "بروتوكولات النضارة الطبية",
    description: "جلسات استعادة مرونة الجلد وعلاج التصبغات بأحدث أجهزة الليرزر العالمية.",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_1200/v1777934765/photo-1570172619644-dfd03ed5d881_uxz3ia.jpg",
  },
  {
    title: "التغذية العلاجية",
    tag: "أنظمة الاستشفاء الداخلي",
    description: "برامج مخصصة لتسريع عملية التعافي والحفاظ على القوام المثالي بشكل مستدام.",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_1200/v1777934802/photo-1490645935967-10de6ba17061_atnddz.jpg",
  },
  {
    title: "المساج الليمفاوي",
    tag: "الرعاية اللاحقة للعمليات",
    description: "تقنيات تدليك متخصصة لتصريف السوائل وتقليل التورم بعد جراحات القوام.",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_1200/v1777934838/Untitled-design_horopv.png",
  },
];

const stats = [
  {
    icon: <Users className="w-5 h-5 stroke-[1.25]" />,
    label: "حالة تم تجميلها بنجاح",
    value: "12,000+",
  },
  {
    icon: <Activity className="w-5 h-5 stroke-[1.25]" />,
    label: "إجراء جراحي دقيق",
    value: "5,500+",
  },
  {
    icon: <Star className="w-5 h-5 stroke-[1.25]" />,
    label: "تقييم مرضانا على جوجل",
    value: "4.9 / 5",
  },
  {
    icon: <Award className="w-5 h-5 stroke-[1.25]" />,
    label: "اعتماد زمالة دولية",
    value: "18",
  },
];

export default function Hero() {
  return (
    <div className="bg-[#FAF7F2] antialiased text-[#2D2621] selection:bg-[#E6DFD5] selection:text-[#2D2621] overflow-x-hidden">
      <HeroSection />

      <section className="bg-[#FAF7F2] py-12 md:py-16 border-y border-[#E6DFD5]/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y divide-[#E6DFD5]/40 sm:divide-y-0">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center lg:items-start text-center lg:text-right pt-6 sm:pt-0 group"
              >
                <div className="flex items-center gap-2 mb-2 text-[#A47E56]">
                  {stat.icon}
                  <span className="text-2xl md:text-3xl lg:text-4xl font-light text-[#1F1916] tracking-tight group-hover:text-[#A47E56] transition-colors duration-300">
                    {stat.value}
                  </span>
                </div>
                <p className="text-xs md:text-sm font-normal text-[#6E6156] tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-12 gap-4 sm:gap-6 items-center relative">
              <div className="col-span-7">
                <div className="aspect-3/4 relative w-full p-2 bg-white rounded-3xl border border-[#E6DFD5] shadow-xl">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#F3EDE2]">
                    <Image
                      src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_1200/v1777934362/photo-1519494026892-80bbd2d6fd0d_inhfzj.jpg"
                      fill
                      quality={95}
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      alt="داخلية العيادة الفاخرة"
                      sizes="(max-width: 768px) 60vw, 35vw"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-5 pt-8 sm:pt-12">
                <div className="aspect-3/4 relative w-full p-2 bg-white rounded-3xl border border-[#E6DFD5] shadow-lg">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#F3EDE2]">
                    <Image
                      src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_1200/v1777934551/photo-1527613426441-4da17471b66d_prm9fx.jpg"
                      fill
                      quality={95}
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      alt="جلسة استشارة طبية"
                      sizes="(max-width: 768px) 40vw, 25vw"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 right-1/2 translate-x-1/2 sm:right-6 sm:translate-x-0 bg-white/95 backdrop-blur-md border border-[#E6DFD5] px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 whitespace-nowrap">
                <CheckCircle2 className="w-5 h-5 text-[#A47E56]" />
                <span className="text-xs font-medium text-[#1F1916]">بيئة طبية معتمدة مع راحة 100%</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 bg-[#F3EDE2] border border-[#E6DFD5] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#A47E56] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#A47E56]" />
              <span>التجربة الحصرية</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1F1916] leading-tight">
              عيادة مصممة <br />
              <span className="font-serif italic font-normal text-[#A47E56]">
                لرعايتك واستشفائك الفاخر
              </span>
            </h2>

            <p className="text-[#594E45] text-base md:text-lg leading-relaxed font-normal">
              في عيادة فيرا، نتفهم تماماً أن رحلة التجميل هي استثمار ذكي في ثقتك
              وراحتك. لذلك لا نقدم مجرد إجراءات طبية نمطية، بل نرافقك في تجربة
              رعاية متكاملة تبدأ من التخطيط المخصص لشكل قوامك وتستمر بمتابعة
              دورية دقيقة تضمن لك النتائج الطبيعية التي تطمح إليها.
            </p>

            <div className="pt-2">
              <button className="inline-flex items-center gap-3 text-[#1F1916] font-semibold text-sm tracking-wide border-b-2 border-[#1F1916] pb-1 hover:text-[#A47E56] hover:border-[#A47E56] transition-colors duration-300 group">
                اكتشف فلسفة الرعاية لدينا
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EDE2]/60 py-20 md:py-28 px-6 lg:px-8 border-t border-[#E6DFD5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-right mb-14 max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-[#A47E56] uppercase block mb-2">
              تخصصاتنا والعيادات
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#1F1916]">
              برامج علاجية{" "}
              <span className="font-serif italic font-normal text-[#A47E56]"> ومتكاملة</span>
            </h2>
            <p className="text-[#6E6156] text-sm md:text-base mt-3 font-normal leading-relaxed">
              خدماتنا مصممة بدقة متناهية لتلبي أعلى المعايير الطبية العالمية
              وتضمن أعلى مستويات الأمان والجمال الطبيعي.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl border border-[#E6DFD5] overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-xl hover:shadow-[#A47E56]/10 hover:-translate-y-1.5"
              >
                <div className="relative aspect-4/3 w-full bg-[#FAF7F2] overflow-hidden">
                  <Image
                    src={service.image}
                    fill
                    quality={95}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    alt={service.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[11px] font-medium tracking-wide text-[#1F1916] bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#E6DFD5] shadow-xs">
                      {service.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 text-right flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F1916] tracking-tight group-hover:text-[#A47E56] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#6E6156] mt-2 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E6DFD5]/50 flex items-center justify-between text-xs font-semibold text-[#A47E56]">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      اكتشف البرنامج
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#FAF7F2] group-hover:bg-[#A47E56] group-hover:text-white flex items-center justify-center transition-all duration-300 border border-[#E6DFD5]">
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}