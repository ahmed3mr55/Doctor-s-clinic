import React from "react";
import Image from "next/image";
import { FadeIn, StaggerContainer } from "@/app/Components/shared/MotionWrapper";
import { ArrowLeft, ShieldCheck, Award, CheckCircle2 } from "lucide-react";

const CLINICAL_HIGHLIGHTS = [
  {
    title: "تقنية الفيزر 4D",
    description: "نحت عالي الدقة لإبراز المعالم العضلية",
  },
  {
    title: "خصوصية مطلقة",
    description: "مسارات رعاية مستقلة ومعايير أمان عالمية",
  },
  {
    title: "إشراف استشاري",
    description: "تخطيط وتنفيذ طبي مباشر لكل حالة",
  },
];

export const HeroSection = () => {
  return (
    <section
      aria-label="التعريف بالعيادة والخدمات الرئيسية"
      className="relative min-h-[88vh] flex items-center pt-28 pb-16 lg:py-20 bg-[#FBF9F5] text-[#1E1A17] overflow-hidden selection:bg-[#E5DCCF]"
      dir="rtl"
    >
      {/* Subtle architectural accent lines (lightweight, zero-cost CSS) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#F0EBE1_1px,transparent_1px)] bg-[size:6rem_1rem] opacity-40 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E2DCD1] to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content Column */}
          <div className="lg:col-span-7 space-y-8">
            <StaggerContainer>
              
              {/* Practice Accreditation Badge */}
              <FadeIn>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-[#F4EFE6] border border-[#E5DFD3] text-[#6B5E53] text-xs font-medium tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-[#8C6D46] shrink-0" aria-hidden="true" />
                  <span>تخصص دقيق في جراحات نحت وتنسيق القوام</span>
                </div>
              </FadeIn>

              {/* Main Architectural Headline */}
              <FadeIn delay={0.05}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1E1A17] leading-[1.25] sm:leading-[1.2] mt-4">
                  حيث يتكامل الفن الجراحي
                  <span className="block font-serif italic font-normal text-[#8C6D46] mt-1.5">
                    مع أدق المقاييس الطبية
                  </span>
                </h1>
              </FadeIn>

              {/* Editorial Statement */}
              <FadeIn delay={0.1}>
                <div className="mt-5 space-y-3 max-w-xl">
                  <p className="text-base sm:text-lg font-medium text-[#4A4039]">
                    تحت إشراف الخبير الطبي د. عبد الرحمن عوف
                  </p>
                  <p className="text-sm sm:text-base text-[#6B5E53] leading-[1.85] font-normal">
                    نحن لا نغير ملامحك، بل نبرز تفاصيل جمالك الكامنة. عيادة متخصصة
                    مصممة لتقديم تجربة نحت الجسم بأحدث تقنيات الفيزر الـ 4D العالمية،
                    في بيئة طبية راقية تضمن لك الخصوصية المطلقة والراحة التامة.
                  </p>
                </div>
              </FadeIn>

              {/* Action Area */}
              <FadeIn delay={0.15}>
                <div className="flex flex-wrap items-center gap-5 pt-4">
                  <a
                    href="#consultation"
                    className="inline-flex items-center justify-center gap-3 bg-[#1E1A17] text-[#FBF9F5] px-7 py-3.5 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 hover:bg-[#8C6D46] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6D46] shadow-sm"
                  >
                    <span>تواصل معنا واستشر طبيبك</span>
                    <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
                  </a>

                  <a
                    href="#gallery"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#4A4039] hover:text-[#8C6D46] transition-colors duration-200 py-2 group"
                  >
                    <span className="underline decoration-[#D4CCC0] underline-offset-8 transition-colors duration-200 group-hover:decoration-[#8C6D46]">
                      تصفح معرض الحالات والنتائج
                    </span>
                  </a>
                </div>
              </FadeIn>

              {/* Grounded Clinical Benchmarks (Replaces floating stickers) */}
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-4 border-t border-[#E8E2D8]/80">
                  {CLINICAL_HIGHLIGHTS.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center gap-2 text-[#1E1A17] font-medium text-xs sm:text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8C6D46]" aria-hidden="true" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-[#7A6E65] leading-relaxed pr-5">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>

            </StaggerContainer>
          </div>

          {/* Portrait Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <FadeIn delay={0.15}>
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[440px]">
                
                {/* Clean architectural frame with matte border */}
                <div className="relative rounded-xl p-2.5 bg-[#FAF7F0] border border-[#E4DDD3] shadow-[0_10px_30px_-15px_rgba(30,26,23,0.08)]">
                  <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-[#EFEAE1]">
                    <Image
                      src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_800/v1781601860/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441_ijtxn7.avif"
                      alt="دكتور عبدالرحمن عوف - استشاري جراحات تنسيق القوام"
                      fill
                      priority
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 420px, 440px"
                      className="object-cover object-top filter contrast-[1.02]"
                    />
                    
                    {/* Subtle contrast gradient for caption readability */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#1E1A17]/60 via-transparent to-transparent opacity-60"
                    />
                  </div>

                  {/* Integrated Editorial Caption Block */}
                  <div className="mt-2.5 px-3 py-2 flex items-center justify-between text-xs border-t border-[#E8E2D8]">
                    <div className="flex items-center gap-2 text-[#4A4039] font-medium">
                      <Award className="w-4 h-4 text-[#8C6D46]" aria-hidden="true" />
                      <span>اعتماد دولي في تقنيات نحت القوام</span>
                    </div>
                    <span className="text-[#8C6D46] font-serif tracking-wider uppercase text-[10px]">
                      VASER™ 4D
                    </span>
                  </div>
                </div>

                {/* Subtle depth layer behind frame */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-3 -left-3 w-full h-full rounded-xl border border-[#EBE4DA] -z-10 bg-[#F5F0E6]/50"
                />
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;