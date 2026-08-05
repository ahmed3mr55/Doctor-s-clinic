import React from "react";
import {
  ArrowLeft,
  Star,
  Activity,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
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
    description: "أحدث تقنيات الفيزر الـ 4D لنحت العضلات وإبراز معالم الجسم الطبيعية بانسجام تام.",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_800/v1777934870/Untitled-design-2025-10-22T162454.315_z4umrg.png",
  },
  {
    title: "العناية بالبشرة",
    tag: "بروتوكولات النضارة",
    description: "جلسات استعادة مرونة الجلد وعلاج التصبغات بأحدث أجهزة الليزر الطبية العالمية.",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_800/v1777934765/photo-1570172619644-dfd03ed5d881_uxz3ia.jpg",
  },
  {
    title: "التغذية العلاجية",
    tag: "أنظمة الاستشفاء",
    description: "برامج مخصصة لتسريع عملية التعافي والحفاظ على القوام المثالي بشكل مستدام وصحي.",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_800/v1777934802/photo-1490645935967-10de6ba17061_atnddz.jpg",
  },
  {
    title: "المساج الليمفاوي",
    tag: "الرعاية اللاحقة",
    description: "تقنيات تدليك متخصصة لتصريف السوائل وتقليل التورم بعد جراحات القوام بأعلى معايير الراحة.",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_800/v1777934838/Untitled-design_horopv.png",
  },
];

const stats = [
  {
    icon: <Users className="w-5 h-5" />,
    label: "حالة تم تجميلها بنجاح",
    value: "12,000+",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    label: "إجراء جراحي دقيق",
    value: "5,500+",
  },
  {
    icon: <Star className="w-5 h-5" />,
    label: "تقييم مرضانا الموثق",
    value: "4.9 / 5",
  },
  {
    icon: <Award className="w-5 h-5" />,
    label: "اعتماد زمالة دولية",
    value: "18",
  },
];

export default function Home() {
  return (
    <div className="bg-[#FAFAF9] antialiased text-[#1C1A19] selection:bg-[#A88C6A]/20 selection:text-[#1C1A19] overflow-x-hidden" dir="rtl">
      
      {/* Do NOT modify HeroSection */}
      <HeroSection />

      {/* Stats Section - Refined for clarity and breathability */}
      <section className="bg-white py-14 lg:py-20 border-y border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <StaggerContainer>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
              {stats.map((stat, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-right group">
                    <div className="flex items-center gap-3 mb-3 text-[#A88C6A]">
                      {stat.icon}
                      <span className="text-3xl lg:text-4xl font-light text-[#1C1A19] tracking-tight transition-colors duration-300 group-hover:text-[#A88C6A]">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[#8C857E] tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* About / Experience Section - Redesigned for an editorial look */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Images Layout - Architectural Composition */}
          <div className="relative">
            <FadeIn>
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-[#E8E6E1] rounded-2xl hidden md:block pointer-events-none" />
              
              <div className="relative w-4/5 ml-auto aspect-[3/4] rounded-2xl overflow-hidden bg-[#F5F5F0] shadow-[0_20px_40px_rgba(28,26,25,0.06)] z-10">
                <Image
                  src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_800/v1777934362/photo-1519494026892-80bbd2d6fd0d_inhfzj.jpg"
                  fill
                  quality={90}
                  className="object-cover"
                  alt="البيئة الطبية الفاخرة"
                  sizes="(max-width: 768px) 80vw, 40vw"
                />
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute bottom-8 -right-4 md:-right-8 w-1/2 aspect-square rounded-2xl overflow-hidden bg-[#F5F5F0] shadow-[0_12px_32px_rgba(28,26,25,0.12)] z-20 border-4 border-[#FAFAF9]">
                <Image
                  src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_600/v1777934551/photo-1527613426441-4da17471b66d_prm9fx.jpg"
                  fill
                  quality={90}
                  className="object-cover"
                  alt="استشارة طبية متخصصة"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Floating Trust Badge - Solid background for performance */}
              <div className="absolute top-8 -left-4 md:-left-8 bg-white border border-[#E8E6E1] px-5 py-3.5 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex items-center gap-3 z-30">
                <CheckCircle2 className="w-5 h-5 text-[#A88C6A]" />
                <span className="text-sm font-semibold text-[#1C1A19]">رعاية طبية بمعايير عالمية</span>
              </div>
            </FadeIn>
          </div>

          {/* Text Content */}
          <div className="space-y-8 flex flex-col justify-center">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-[#E8E6E1] rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <Sparkles className="w-4 h-4 text-[#A88C6A]" strokeWidth={2} />
                <span className="text-xs font-semibold text-[#5C5752] tracking-wide">
                  التجربة الحصرية
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl text-[#1C1A19] leading-[1.3] font-light mt-6">
                عيادة مصممة <br />
                <span className="relative inline-block mt-3 text-[#A88C6A] font-serif pr-2">
                  لرعايتك واستشفائك الفاخر
                  <span className="absolute bottom-2 right-0 w-full h-[1px] bg-[#A88C6A]/40" />
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-[#6B6560] text-lg leading-[1.8] font-normal">
                في عيادتنا، نتفهم تماماً أن رحلة التجميل هي استثمار ذكي في ثقتك وراحتك. لذلك لا نقدم مجرد إجراءات طبية نمطية، بل نرافقك في تجربة رعاية متكاملة تبدأ من التخطيط المخصص لشكل قوامك وتستمر بمتابعة دورية دقيقة تضمن لك النتائج الطبيعية التي تطمح إليها.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <button className="text-[#3A3633] text-sm font-semibold hover:text-[#A88C6A] transition-colors relative after:absolute after:bottom-0 after:right-0 after:w-full after:h-[1px] after:bg-current after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-0 pb-1 mt-2 inline-flex items-center gap-2">
                اكتشف فلسفة الرعاية لدينا
                <ArrowLeft className="w-4 h-4" />
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Section - Clean, minimal, premium cards */}
      <section className="bg-white py-24 lg:py-32 px-6 lg:px-8 border-t border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-16 max-w-2xl">
              <span className="text-xs font-semibold tracking-widest text-[#A88C6A] mb-3 block">
                التخصصات الطبية
              </span>
              <h2 className="text-4xl lg:text-5xl font-light text-[#1C1A19] leading-[1.3]">
                برامج علاجية{" "}
                <span className="font-serif text-[#A88C6A]">متكاملة</span>
              </h2>
              <p className="text-[#6B6560] text-lg mt-5 font-normal leading-[1.8]">
                خدماتنا مصممة بدقة متناهية لتلبي أعلى المعايير الطبية العالمية وتضمن أعلى مستويات الأمان والجمال الطبيعي.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {services.map((service, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="group flex flex-col h-full bg-[#FAFAF9] rounded-2xl border border-[#E8E6E1] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_32px_rgba(28,26,25,0.06)] hover:-translate-y-1">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F5F0]">
                      <Image
                        src={service.image}
                        fill
                        quality={85}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                        alt={service.title}
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                      
                      <div className="absolute top-4 right-4 z-10">
                        <span className="text-[11px] font-semibold text-[#1C1A19] bg-white px-3 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                          {service.tag}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="text-xl font-medium text-[#1C1A19] transition-colors duration-300 group-hover:text-[#A88C6A]">
                          {service.title}
                        </h3>
                        <p className="text-sm text-[#6B6560] mt-3 leading-[1.8] font-normal">
                          {service.description}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-[#E8E6E1] flex items-center justify-between text-sm font-semibold text-[#A88C6A]">
                        <span>اكتشف البرنامج</span>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-1 border border-[#E8E6E1]">
                          <ArrowLeft className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* NEW SECTION: Cosmetic Dentistry - Seamless extension of the premium aesthetic */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-[#FAFAF9] border-t border-[#E8E6E1] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Text Content */}
            <div className="space-y-8 order-2 lg:order-1">
              <FadeIn>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-[#E8E6E1] rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                  <ShieldCheck className="w-4 h-4 text-[#A88C6A]" strokeWidth={2} />
                  <span className="text-xs font-semibold text-[#5C5752] tracking-wide">
                    قسم تجميل الأسنان
                  </span>
                </div>

                <h2 className="text-4xl lg:text-5xl text-[#1C1A19] leading-[1.3] font-light mt-6">
                  تصميم الابتسامة
                  <br />
                  <span className="relative inline-block mt-3 text-[#A88C6A] font-serif pr-2">
                    المتقدم والرقمي
                    <span className="absolute bottom-2 right-0 w-full h-[1px] bg-[#A88C6A]/40" />
                  </span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className="text-[#6B6560] text-lg leading-[1.8] font-normal">
                  يجمع قسم تجميل الأسنان لدينا بين دقة الطب وجمال الفن. نستخدم أحدث تقنيات التصميم الرقمي ثلاثي الأبعاد لنمنحك ابتسامة طبيعية، صحية، تتناغم تماماً مع ملامح وجهك وتعكس ثقتك الداخلية.
                </p>
              </FadeIn>

              <StaggerContainer>
                <div className="space-y-4 pt-2">
                  {["ابتسامة هوليود بالتصميم الرقمي (3D)", "زراعة الأسنان الفورية بأحدث التقنيات", "تبييض الأسنان بالليزر الآمن والفعال"].map((feature, index) => (
                    <FadeIn key={index} delay={0.2 + (index * 0.1)}>
                      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#E8E6E1] shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-[#A88C6A]" />
                        </div>
                        <span className="text-[#1C1A19] font-medium">{feature}</span>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </StaggerContainer>

              <FadeIn delay={0.5}>
                <button className="mt-6 w-full sm:w-auto group flex items-center justify-center gap-3 bg-[#1C1A19] text-white px-8 py-4 rounded-xl text-sm font-medium transition-colors duration-200 hover:bg-[#3A3633]">
                  <span>احجز استشارة الأسنان</span>
                  <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" strokeWidth={2} />
                </button>
              </FadeIn>
            </div>

            {/* Premium Dental Image */}
            <div className="relative order-1 lg:order-2">
              <FadeIn delay={0.2}>
                <div className="absolute -inset-4 border border-[#E8E6E1] rounded-2xl hidden md:block pointer-events-none" />
                
                <div className="relative aspect-square lg:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#F5F5F0] shadow-[0_20px_40px_rgba(28,26,25,0.06)]">
                  <Image
                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80"
                    fill
                    quality={90}
                    className="object-cover"
                    alt="تصميم الابتسامة وتجميل الأسنان"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
}