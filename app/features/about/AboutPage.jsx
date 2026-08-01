import React from "react";
import {
  Target,
  Lightbulb,
  Stethoscope,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
  ArrowLeft,
  CheckCircle2,
  Award,
  Quote,
} from "lucide-react";
import { FadeIn } from "@/app/Components/shared/MotionWrapper";
import Image from "next/image";

// 1. مصفوفة القيم متضمنة المكونات المباشرة لمعالجة الهوفر
const values = [
  {
    number: "01",
    title: "التميز الطبي",
    desc: "نلتزم بتطبيق أحدث ما توصل إليه العلم واستخدام أفضل التقنيات لضمان نتائج فائقة الدقة والأمان.",
    icon: Stethoscope,
  },
  {
    number: "02",
    title: "المريض أولاً",
    desc: "أنت محور اهتمامنا. نصغي إليك، نتفهم أهدافك، ونصمم خطة علاجية فريدة تناسبك وحدك.",
    icon: Heart,
  },
  {
    number: "03",
    title: "الشفافية والمصداقية",
    desc: "نبني علاقاتنا على الصدق والوضوح. نشرح لك كل الخيارات المتاحة والتوقعات الواقعية لكل إجراء.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "الجمال الطبيعي",
    desc: "نؤمن بأن أفضل النتائج هي تلك التي تبرز جمالك الفريد دون أن تغير من ملامحك الأصيلة.",
    icon: Sparkles,
  },
  {
    number: "05",
    title: "التكامل والشمولية",
    desc: "نقدم رعاية شاملة تجمع بين مختلف التخصصات لتحقيق توازن مثالي بين صحة الجسم ومظهر الروح.",
    icon: Users,
  },
];

export default function AboutPage() {
  return (
    <main
      className="bg-[#FAF8F5] text-[#1C1714] antialiased selection:bg-[#E5DDD3] selection:text-[#1C1714] overflow-x-hidden"
      dir="rtl"
    >
      {/* 1. Hero Section - قسم الهيرو الرئيسي */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center border-b border-[#E5DDD3] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_1200/v1777934870/Untitled-design-2025-10-22T162454.315_z4umrg.png"
            alt="Tan Clinics Interior"
            fill
            sizes="100vw"
            className="object-cover object-center scale-105"
            priority
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14100E] via-[#14100E]/75 to-[#14100E]/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 py-24">
          <FadeIn y={20}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full mb-8">
              <Sparkles className="w-3.5 h-3.5 text-[#A47E56]" />
              <span className="text-xs font-semibold tracking-widest text-white uppercase">
                فلسفة تان كلينكس
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 leading-[1.15]">
              قصة شغف، رؤية للتميز، <br />
              <span className="font-serif italic font-normal text-[#A47E56]">
                وقيم نلتزم بها
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#E5DDD3] max-w-2xl mx-auto font-normal leading-relaxed">
              نعيد تعريف تجربة الرعاية الصحية والتجميلية بمزيج فريد بين الدقة الطبية والرفاهية الإنسانية المخصصة لك.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Story & Founder Section - قصتنا والدكتور */}
      <section className="py-24 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* نص القصّة والشهادات */}
          <div className="lg:col-span-7 space-y-8 text-right">
            <FadeIn x={-20}>
              <div className="inline-flex items-center gap-2 bg-[#F3EDE3] border border-[#E5DDD3] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#A47E56] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A47E56]" />
                <span>من حلم إلى حقيقة</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1714] mt-4 leading-tight">
                كيف بدأت رحلتنا في <br />
                <span className="font-serif italic font-normal text-[#A47E56]">
                  صياغة مفهوم جديد للجمال؟
                </span>
              </h2>

              <div className="text-[#685E55] text-base md:text-lg leading-relaxed space-y-4 pt-2 font-normal">
                <p>
                  لم تكن "تان كلينكس" مجرد مركز طبي آاخر، بل رؤية استثنائية صممها مؤسسها،{" "}
                  <strong className="text-[#1C1714] font-semibold">الدكتور عبدالرحمن عوف</strong>،
                  لسنوات طويلة. بعد مسيرة حافلة بالخبرة والاعتمادات في أعرق المؤسسات الطبية الدولية، لاحظ وجود فجوة بين العلاج النمطي وبين التجربة الإنسانية المخصصة التي يحتاجها كل مريض.
                </p>
                <p>
                  من هنا، نشأت "تان كلينكس" لتكون ملاذاً آمناً يدمج التكنولوجيا الطبية المتقدمة باللمسة الفنية، لنقدم لك نتائج طبيعية تعزز من ثقتك بذاتك دون تغيير معالمك الأصيلة.
                </p>
              </div>

              {/* اقتباس المؤسس */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5DDD3] relative overflow-hidden shadow-xs">
                <Quote className="absolute -bottom-2 left-4 w-16 h-16 text-[#A47E56]/10 rotate-180" />
                <p className="text-sm md:text-base italic font-serif text-[#1C1714] leading-relaxed relative z-10">
                  "التجميل بالنسبة لنا ليس تغييراً للملامح، بل هو كشف عن أبهى نسخ الجمال المكنون داخل كل فرد بحس فني ودقة طبية لا تهاون فيها."
                </p>
                <span className="block mt-3 text-xs font-semibold text-[#A47E56]">
                  — د. عبدالرحمن عوف، المؤسس
                </span>
              </div>

              {/* الأرقام والإحصائيات */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-[#E5DDD3]">
                <div className="bg-white p-5 rounded-2xl border border-[#E5DDD3] shadow-xs">
                  <p className="text-3xl md:text-4xl font-light text-[#1C1714] mb-1">
                    +12,000
                  </p>
                  <p className="text-xs md:text-sm font-medium text-[#685E55]">
                    استشارة طبية ناجحة
                  </p>
                </div>
                <div className="bg-[#F3EDE3]/70 p-5 rounded-2xl border border-[#E5DDD3] shadow-xs">
                  <p className="text-3xl md:text-4xl font-light text-[#A47E56] mb-1">
                    +5,500
                  </p>
                  <p className="text-xs md:text-sm font-medium text-[#685E55]">
                    حالة تم نحتها وتجميلها
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* صورة د. عبدالرحمن عوف */}
          <div className="lg:col-span-5">
            <FadeIn x={20} delay={0.2}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-4/5 relative w-full p-2.5 bg-white rounded-3xl border border-[#E5DDD3] shadow-xl">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#F3EDE3]">
                    <Image
                      src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_1200/v1781601860/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441_ijtxn7.avif"
                      alt="Dr. Abdelrahman Aouf"
                      fill
                      quality={95}
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Badge العائم */}
                <div className="absolute -bottom-6 right-6 bg-white/95 backdrop-blur-md border border-[#E5DDD3] p-4 rounded-2xl shadow-xl flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#F3EDE3] flex items-center justify-center text-[#A47E56] shrink-0 border border-[#E5DDD3]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C1714]">د. عبدالرحمن عوف</h4>
                    <p className="text-xs text-[#685E55]">المؤسس والرئيس الطبي</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* 3. Vision & Mission - الرؤية والرسالة */}
      <section className="py-24 bg-[#F3EDE3]/60 border-y border-[#E5DDD3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* بطاقة الرؤية (Light Luxury) */}
            <FadeIn y={20}>
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E5DDD3] shadow-xs h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-[#FAF8F5] rounded-2xl border border-[#E5DDD3] flex items-center justify-center mb-8">
                    <Target className="w-7 h-7 text-[#A47E56]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-[#1C1714] mb-4">
                    رؤيتنـا
                  </h3>
                  <p className="text-[#685E55] text-base md:text-lg leading-relaxed font-normal">
                    أن نكون المركز المرجعي الموثوق للرعاية الصحية والتجميلية الفاخرة في الشرق الأوسط، من خلال ارتقائنا بمعايير الأمان، الابتكار، والنتائج الطبيعية المبهرة.
                  </p>
                </div>
                <div className="pt-8 mt-6 border-t border-[#E5DDD3] flex items-center gap-2 text-xs font-semibold text-[#A47E56]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>معايير طبية دولية معتمدة</span>
                </div>
              </div>
            </FadeIn>

            {/* بطاقة الرسالة (Dark Luxury Obsidian) */}
            <FadeIn y={20} delay={0.2}>
              <div className="bg-[#14100E] text-white p-8 md:p-12 rounded-3xl border border-[#26201C] shadow-xl h-full flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center mb-8">
                    <Lightbulb className="w-7 h-7 text-[#A47E56]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                    رسالتنـا
                  </h3>
                  <p className="text-[#E5DDD3] text-base md:text-lg leading-relaxed font-normal">
                    تمكين كل زائر من استعادة أبهى مستويات صحته وجماله عبر خطط علاجية فردية، تعتمد على العلم وتوفر أقصى درجات الخصوصية والراحة.
                  </p>
                </div>
                <div className="pt-8 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-[#A47E56] relative z-10">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>خطط علاجية مخصصة 100%</span>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 4. Core Values Section - المبادئ (تم إصلاح مشكلة الهوفر) */}
      <section className="py-24 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn>
            <span className="text-xs font-semibold tracking-widest text-[#A47E56] uppercase block mb-2">
              دستور عملنا
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1714]">
              المبادئ التي{" "}
              <span className="font-serif italic font-normal text-[#A47E56]">
                توجه عملنا اليومي
              </span>
            </h2>
            <p className="text-[#685E55] text-sm md:text-base mt-3 font-normal">
              قيم ومبادئ ثابتة نضعها في صميم كل إجراء واستشارة طبية.
            </p>
          </FadeIn>
        </div>

        {/* شبكة القيم (3 في الأعلى و2 بالأسفل) */}
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {values.slice(0, 3).map((val, idx) => {
              const IconComponent = val.icon;
              return (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="group bg-white p-8 rounded-3xl border border-[#E5DDD3] h-full flex flex-col justify-between text-right hover:shadow-xl hover:shadow-[#A47E56]/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    
                    {/* رقم مائي خفيف للجمالية */}
                    <span className="absolute top-4 left-6 text-3xl font-serif text-[#E5DDD3]/60 group-hover:text-[#A47E56]/20 transition-colors duration-300 select-none">
                      {val.number}
                    </span>

                    <div>
                      {/* الحاوية والإيقونة المعالجة بالكامل */}
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD3] flex items-center justify-center mb-6 group-hover:bg-[#A47E56] group-hover:border-[#A47E56] transition-colors duration-300">
                        <IconComponent className="w-6 h-6 text-[#A47E56] group-hover:text-white transition-colors duration-300" />
                      </div>

                      <h3 className="text-xl font-semibold text-[#1C1714] mb-3 group-hover:text-[#A47E56] transition-colors duration-300">
                        {val.title}
                      </h3>
                      
                      <p className="text-sm text-[#685E55] leading-relaxed font-normal">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.slice(3, 5).map((val, idx) => {
              const IconComponent = val.icon;
              return (
                <FadeIn key={idx + 3} delay={(idx + 3) * 0.1}>
                  <div className="group bg-white p-8 rounded-3xl border border-[#E5DDD3] h-full flex flex-col justify-between text-right hover:shadow-xl hover:shadow-[#A47E56]/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    
                    {/* رقم مائي خفيف */}
                    <span className="absolute top-4 left-6 text-3xl font-serif text-[#E5DDD3]/60 group-hover:text-[#A47E56]/20 transition-colors duration-300 select-none">
                      {val.number}
                    </span>

                    <div>
                      {/* الحاوية والإيقونة المعالجة بالكامل */}
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD3] flex items-center justify-center mb-6 group-hover:bg-[#A47E56] group-hover:border-[#A47E56] transition-colors duration-300">
                        <IconComponent className="w-6 h-6 text-[#A47E56] group-hover:text-white transition-colors duration-300" />
                      </div>

                      <h3 className="text-xl font-semibold text-[#1C1714] mb-3 group-hover:text-[#A47E56] transition-colors duration-300">
                        {val.title}
                      </h3>
                      
                      <p className="text-sm text-[#685E55] leading-relaxed font-normal">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Team CTA - دعوة للتواصل وفريق العمل */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#14100E]">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto:best,w_1200/v1777934362/photo-1519494026892-80bbd2d6fd0d_inhfzj.jpg"
            alt="Medical Team Background"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <span className="text-xs font-semibold tracking-widest text-[#A47E56] uppercase block mb-4">
              نخبة الاستشاريين
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight">
              نجاحنا يكتمل بفريقنا الاستثنائي <br />
              <span className="font-serif italic font-normal text-[#A47E56]">
                من الأطباء والمتخصصين
              </span>
            </h2>

            <p className="text-[#E5DDD3] text-base md:text-lg mb-10 max-w-2xl mx-auto font-normal leading-relaxed">
              تجمعنا نفس الرؤية والشغف بتقديم أفضل النتائج العلاجية والتجميلية في بيئة مريحة.
            </p>

            <button className="inline-flex items-center gap-3 bg-[#A47E56] text-white px-9 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-[#8A6743] transition-all duration-300 shadow-2xl hover:shadow-[#A47E56]/30 hover:-translate-y-0.5 group">
              <span>قابل فريق الخبراء لدينا</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            </button>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}