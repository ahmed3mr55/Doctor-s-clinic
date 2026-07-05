import React from "react";
import {
  ArrowLeft,
  Star,
  Activity,
  Users,
  Award,
  ShieldCheck,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
} from "@/app/Components/shared/MotionWrapper";
import Image from "next/image";

const services = [
  {
    title: "الجراحة التجميلية",
    tag: "تنسيق وتشكيل القوام",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_600/v1777934870/Untitled-design-2025-10-22T162454.315_z4umrg.png",
  },
  {
    title: "العناية بالبشرة",
    tag: "بروتوكولات النضارة الطبية",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_600/v1777934765/photo-1570172619644-dfd03ed5d881_uxz3ia.jpg",
  },
  {
    title: "التغذية العلاجية",
    tag: "أنظمة الاستشفاء الداخلي",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_600/v1777934802/photo-1490645935967-10de6ba17061_atnddz.jpg",
  },
  {
    title: "المساج الليمفاوي",
    tag: "الرعاية اللاحقة للعمليات",
    image:
      "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_600/v1777934838/Untitled-design_horopv.png",
  },
];

const stats = [
  {
    icon: <Users size={16} className="stroke-[1.25]" />,
    label: "حالة تم تجميلها بنجاح",
    value: "12,000+",
  },
  {
    icon: <Activity size={16} className="stroke-[1.25]" />,
    label: "إجراء جراحي دقيق",
    value: "5,500+",
  },
  {
    icon: <Star size={16} className="stroke-[1.25]" />,
    label: "تقييم مرضانا على جوجل",
    value: "4.9 / 5",
  },
  {
    icon: <Award size={16} className="stroke-[1.25]" />,
    label: "اعتماد زمالة دولية",
    value: "18",
  },
];

export default function Hero() {
  return (
    <div className="bg-[#FAF7F2] antialiased text-[#2D2621] selection:bg-[#E6DFD5] selection:text-[#2D2621]">
      {/* 1. Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-24 lg:pt-1 overflow-hidden">
        {/* خلفية هندسية راقية */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[42%] bg-[#F3EDE2] -z-10" />
        <div className="absolute inset-y-0 right-[42%] w-[1px] bg-[#EBE3D5] hidden lg:block" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full relative z-10">
          {/* Content Box */}
          <div className="lg:col-span-7 space-y-8 text-right">
            <StaggerContainer>
              <FadeIn>
                <div className="inline-flex items-center gap-2.5 bg-[#FFF]/60 backdrop-blur-md border border-[#E6DFD5] px-4 py-2 rounded-full text-xs font-medium tracking-wide text-[#6E6156]">
                  <ShieldCheck size={14} className="text-[#A47E56]" />
                  <span>التميز الطبي في جراحات تنسيق القوام</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.05}>
                <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-light text-[#1F1916] leading-[1.15] tracking-tight mt-2">
                  حيث يتكامل الفن <br />
                  <span className="font-serif italic font-normal text-[#A47E56] block lg:inline lg:mt-0 mt-2">
                    مع المقاييس الطبية
                  </span>
                </h1>
                <p className="text-lg lg:text-xl font-light text-[#594E45] mt-4 tracking-wide">
                  تحت إشراف الخبير الطبي د. عبد الرحمن عوف
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className="text-[#6E6156] text-base lg:text-lg leading-relaxed max-w-xl font-normal mt-6">
                  نحن لا نغير ملامحك، بل نبرز تفاصيل جمالك الكامنة. عيادة متخصصة
                  مصممة لتقديم تجربة نحت الجسم وتنسيق القوام بأحدث تقنيات الفيزر
                  الـ 4D العالمية، في بيئة راقية تضمن لك الخصوصية المطلقة
                  والراحة التامة.
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="flex flex-wrap items-center gap-6 pt-6">
                  <button className="bg-[#1F1916] text-[#FAF7F2] px-8 py-4 text-sm font-medium rounded-xl hover:bg-[#A47E56] transition-all duration-300 flex items-center gap-3 group shadow-xl shadow-amber-950/5 active:scale-[0.98]">
                    تواصل معنا واستشر طبيبك
                    <ArrowLeft
                      size={16}
                      className="group-hover:-translate-x-1 transition-transform duration-300"
                    />
                  </button>
                  <button className="text-[#2D2621] text-sm font-medium tracking-wide border-b border-[#2D2621]/40 pb-1 hover:text-[#A47E56] hover:border-[#A47E56] transition-all duration-300">
                    تصفح معرض الحالات والنتائج
                  </button>
                </div>
              </FadeIn>
            </StaggerContainer>
          </div>

          {/* Image Container (تم تحديث الرابط والوسم لضمان الظهور الفوري) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <FadeIn delay={0.2} y={15}>
              <div className="relative aspect-[4/5] w-[340px] md:w-[380px] p-2 bg-[#FFF] rounded-2xl shadow-[0_24px_60px_-15px_rgba(45,38,33,0.08)] border border-[#E6DFD5]/60 isolate">
                <div className="w-full h-full rounded-xl overflow-hidden relative bg-[#F3EDE2]">
                  <img
                    src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_600/v1781601860/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441_ijtxn7.avif"
                    alt="دكتور عبدالرحمن عوف"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03] will-change-transform transform-gpu"
                    loading="eager"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="bg-[#FAF7F2] py-16 border-y border-[#E6DFD5]/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center lg:items-start lg:text-right gap-1.5 group"
              >
                <span className="text-3xl font-light text-[#1F1916] tracking-tight transition-colors duration-300 group-hover:text-[#A47E56]">
                  {stat.value}
                </span>
                <div className="flex items-center gap-2 text-[#6E6156]">
                  <span className="text-[#A47E56]/80">{stat.icon}</span>
                  <p className="text-xs font-normal tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Section */}
      <section className="py-28 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Images Grid */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-7">
                <div className="aspect-[3/4] relative w-full p-2 bg-[#FFF] rounded-2xl border border-[#E6DFD5]/50 shadow-sm isolate">
                  <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <Image
                      src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_800/v1777934362/photo-1519494026892-80bbd2d6fd0d_inhfzj.jpg"
                      fill
                      className="object-cover"
                      alt="Vera Clinic Interior"
                      sizes="30vw"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-5 pt-16">
                <div className="aspect-[3/4] relative w-full p-2 bg-[#FFF] rounded-2xl border border-[#E6DFD5]/50 shadow-sm isolate">
                  <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <Image
                      src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_800/v1777934551/photo-1527613426441-4da17471b66d_prm9fx.jpg"
                      fill
                      className="object-cover"
                      alt="Vera Clinic Consultation"
                      sizes="20vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Info */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-right">
            <span className="text-xs font-semibold tracking-widest text-[#A47E56] uppercase block">
              التجربة الحصرية
            </span>
            <h2 className="text-3xl lg:text-5xl font-light text-[#1F1916] leading-tight">
              عيادة مصممة <br />
              <span className="font-serif italic font-normal text-[#A47E56]">
                لرعايتك واستشفائك الفاخر
              </span>
            </h2>
            <p className="text-[#594E45] text-base lg:text-lg leading-relaxed font-light">
              في عيادة فيرا، نتفهم تماماً أن رحلة التجميل هي استثمار ذكي في ثقتك
              وراحتك. لذلك لا نقدم مجرد إجراءات طبية نمطية، بل نرافقك في تجربة
              رعاية متكاملة تبدأ من التخطيط المخصص لشكل قوامك وتستمر بمتابعة
              دورية دقيقة تضمن لك النتائج الطبيعية التي تطمح إليها.
            </p>
            <div className="pt-4">
              <button className="inline-flex items-center gap-3 text-[#1F1916] font-medium text-sm tracking-wide border-b border-[#1F1916] pb-1 hover:text-[#A47E56] hover:border-[#A47E56] transition-colors duration-300">
                اكتشف فلسفة الرعاية لدينا
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Grid (تم حل مشكلة انغماش الحواف والخروج من الكارد هنا) */}
      <section className="bg-[#F3EDE2] py-28 px-6 lg:px-8 border-t border-[#E6DFD5]/70">
        <div className="max-w-7xl mx-auto">
          <div className="text-right mb-16 max-w-xl">
            <span className="text-xs font-semibold tracking-widest text-[#A47E56] uppercase block mb-2">
              تخصصاتنا والعيادات
            </span>
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-[#1F1916]">
              برامج علاجية{" "}
              <span className="font-serif italic text-[#A47E56]">ومتكاملة</span>
            </h2>
            <p className="text-[#6E6156] text-sm mt-3 font-light leading-relaxed">
              خدماتنا مصممة بدقة متناهية لتلبي أعلى المعايير الطبية العالمية
              وتضمن أعلى مستويات الأمان والجمال الطبيعي.
            </p>
          </div>

          {/* Cards Grid Architecture */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group relative h-[440px] bg-[#FFF] p-6 rounded-2xl border border-[#E6DFD5]/40 flex flex-col justify-between transition-all duration-500 ease-out hover:shadow-[0_32px_64px_-20px_rgba(45,38,33,0.12)] hover:-translate-y-1 overflow-hidden isolate transform-gpu"
              >
                {/* Image Box */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none">
                  <Image
                    src={service.image}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] will-change-transform transform-gpu"
                    alt={service.title}
                  />
                </div>

                {/* Editorial Overlay Layer */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#FFF] via-[#FFF]/10 to-transparent opacity-95 group-hover:from-[#FAF7F2] transition-colors duration-500 pointer-events-none" />

                <div className="relative z-20 text-right">
                  <span className="text-[10px] font-medium tracking-wider text-[#1F1916] bg-[#FAF7F2]/90 backdrop-blur-xs px-3 py-1.5 rounded-md border border-[#E6DFD5]">
                    {service.tag}
                  </span>
                </div>

                <div className="relative z-20 text-right space-y-3">
                  <h3 className="text-xl font-medium text-[#1F1916] tracking-tight">
                    {service.title}
                  </h3>
                  <div className="flex items-center justify-end gap-2 text-[#A47E56] text-xs font-medium opacity-90 transition-all duration-300">
                    <span className="border-b border-[#A47E56]/0 group-hover:border-[#A47E56]/60 pb-0.5">
                      اكتشف البرنامج
                    </span>
                    <ArrowLeft
                      size={12}
                      className="group-hover:-translate-x-0.5 transition-transform duration-300"
                    />
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
