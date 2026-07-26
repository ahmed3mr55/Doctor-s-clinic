import Image from "next/image";
import { FadeIn, StaggerContainer } from "@/app/Components/shared/MotionWrapper";
import { ArrowLeft, ShieldCheck, Sparkles, Award } from "lucide-react";

const HeroSeciton = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-12 lg:py-12 overflow-hidden bg-[#FAF8F5]">
      <div className="absolute inset-y-0 right-0 w-full lg:w-2/5 bg-[#F3EDE2]/70 -z-10" />
      <div className="absolute inset-y-0 right-2/5 w-px bg-[#EBE3D5] hidden lg:block" />

      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#A47E56]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#F3EDE2] rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-15 hidden lg:block pointer-events-none -z-10">
        <svg width="600" height="200" viewBox="0 0 600 200" fill="none" stroke="#A47E56" strokeWidth="1">
          <path d="M0,100 C200,180 400,20 600,100" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full relative z-10">
        <div className="lg:col-span-7 space-y-6 text-right">
          <StaggerContainer>
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-[#FFF] border border-[#E6DFD5] px-4 py-1.5 rounded-full text-xs font-medium text-[#6E6156] shadow-sm">
                <ShieldCheck size={14} className="text-[#A47E56]" />
                <span>التميز الطبي في جراحات تنسيق القوام</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1F1916] leading-tight tracking-tight mt-2">
                حيث يتكامل الفن <br />
                <span className="font-serif italic font-normal text-[#A47E56] inline-block mt-1 relative">
                  مع المقاييس الطبية
                  <span className="absolute bottom-1 right-0 w-full h-0.5 bg-[#A47E56]/20 rounded-full" />
                </span>
              </h1>
              <p className="text-base md:text-lg font-normal text-[#594E45] mt-3">
                تحت إشراف الخبير الطبي د. عبد الرحمن عوف
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-[#6E6156] text-sm md:text-base leading-relaxed max-w-xl font-normal mt-3">
                نحن لا نغير ملامحك، بل نبرز تفاصيل جمالك الكامنة. عيادة متخصصة
                مصممة لتقديم تجربة نحت الجسم وتنسيق القوام بأحدث تقنيات الفيزر
                الـ 4D العالمية، في بيئة راقية تضمن لك الخصوصية المطلقة والراحة التامة.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button className="bg-[#1F1916] text-[#FAF7F2] px-7 py-3.5 text-xs md:text-sm font-medium rounded-xl hover:bg-[#A47E56] transition-all duration-300 flex items-center gap-2.5 group shadow-md hover:shadow-lg active:scale-98">
                  تواصل معنا واستشر طبيبك
                  <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-300" />
                </button>
                <button className="text-[#2D2621] text-xs md:text-sm font-medium border-b border-[#2D2621]/30 pb-1 hover:text-[#A47E56] hover:border-[#A47E56] transition-all duration-300">
                  تصفح معرض الحالات والنتائج
                </button>
              </div>
            </FadeIn>
          </StaggerContainer>
        </div>

        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <FadeIn delay={0.2} y={15}>
            <div className="relative w-75 sm:w-87.5 lg:w-95">
              <div className="absolute -inset-3 rounded-3xl bg-[#F3EDE2] border border-[#E6DFD5] -rotate-2 scale-98 -z-10" />

              <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-[#F3EDE2] border border-[#E6DFD5] shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_600/v1781601860/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441_ijtxn7.avif"
                  alt="دكتور عبدالرحمن عوف"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1916]/30 via-transparent to-transparent opacity-80" />
              </div>

              <div className="absolute -bottom-5 -right-4 bg-white/90 backdrop-blur-md border border-[#E6DFD5] p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F3EDE2] flex items-center justify-center text-[#A47E56]">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-xs text-[#6E6156] font-medium leading-none">تقنية الفيزر 4D</p>
                  <p className="text-xs font-semibold text-[#1F1916] mt-1">نحت وتنسيق القوام</p>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 bg-[#1F1916] text-[#FAF7F2] p-3 rounded-2xl shadow-lg hidden sm:flex items-center gap-2">
                <Award size={16} className="text-[#A47E56]" />
                <span className="text-xs font-medium">خبرة طبية متخصصة</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default HeroSeciton;