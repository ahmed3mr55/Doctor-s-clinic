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
} from "lucide-react";
import { FadeIn } from "@/app/Components/shared/MotionWrapper";
import Image from "next/image";

// 1. بيانات القيم (Values)
const values = [
  {
    title: "التميز الطبي",
    desc: "نلتزم بتطبيق أحدث ما توصل إليه العلم واستخدام أفضل التقنيات لضمان نتائج فائقة الدقة والأمان.",
    icon: <Stethoscope className="text-amber-600" size={32} />,
  },
  {
    title: "المريض أولاً",
    desc: "أنت محور اهتمامنا. نصغي إليك، نتفهم أهدافك، ونصمم خطة علاجية فريدة تناسبك وحدك.",
    icon: <Heart className="text-amber-600" size={32} />,
  },
  {
    title: "الشفافية والمصداقية",
    desc: "نبني علاقاتنا على الصدق والوضوح. نشرح لك كل الخيارات المتاحة والتوقعات الواقعية لكل إجراء.",
    icon: <ShieldCheck className="text-amber-600" size={32} />,
  },
  {
    title: "الجمال الطبيعي",
    desc: "نؤمن بأن أفضل النتائج هي تلك التي تبرز جمالك الفريد دون أن تغير من ملامحك الأصيلة.",
    icon: <Sparkles className="text-amber-600" size={32} />,
  },
  {
    title: "التكامل والشمولية",
    desc: "نقدم رعاية شاملة تجمع بين مختلف التخصصات لتحقيق توازن مثالي بين صحة الجسم ومظهر الروح.",
    icon: <Users className="text-amber-600" size={32} />,
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen" dir="rtl">
      {/* 1. Hero Section - قصة شغف */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_1200,c_limit/v1777934870/Untitled-design-2025-10-22T162454.315_z4umrg.png"
            alt="Tan Clinics Interior"
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
            loading="eager"
          />

          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <FadeIn y={30}>
            <h1 className="text-6xl lg:text-8xl font-black mb-6 tracking-tight">
              Tan Clinics
            </h1>
            <p className="text-xl lg:text-3xl font-medium text-amber-400">
              قصة شغف، رؤية للتميز، وقيم نلتزم بها
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Our Story - من حلم إلى حقيقة */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn x={-30}>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-amber-600 font-bold tracking-widest uppercase text-sm">
                <span className="w-8 h-px bg-amber-600" /> قصتنا
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-stone-900 leading-tight">
                من حلم إلى حقيقة: <br /> كيف بدأت قصة فيرا؟
              </h2>
              <div className="text-stone-600 text-lg leading-loose space-y-6">
                <p>
                  لم تكن "فيرا" مجرد فكرة عابرة، بل كانت حلماً يراود مؤسسها،{" "}
                  <strong>الدكتور عبدالرحمن عوف</strong>، لسنوات طويلة. بعد
                  مسيرة مهنية حافلة بالنجاح والخبرة في أعرق المؤسسات الطبية، رأى
                  د. مصطفى فجوة بين تقديم الخدمات الطبية التقليدية وبين التجربة
                  الإنسانية المتكاملة التي يستحقها كل مريض.
                </p>
                <p>
                  من هنا، نشأت "فيرا" لتكون أكثر من مجرد عيادة. تأسست على مبدأ
                  أن الجمال والصحة لا ينفصلان، وأن الوصول إليهما يتطلب رحلة
                  مبنية على الثقة، العلم، والاهتمام بأدق التفاصيل. أردناها مساحة
                  آمنة وملهمة، حيث يشعر كل زائر بالراحة والاطمئنان، ويثق بأنه
                  بين أيادٍ أمينة تسعى لتحقيق أفضل نسخة من ذاته.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
                  <p className="text-4xl font-black text-amber-600 mb-1">
                    +12,000
                  </p>
                  <p className="text-stone-500 font-bold">زيارة ناجحة</p>
                </div>
                <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                  <p className="text-4xl font-black text-stone-900 mb-1">
                    +5,500
                  </p>
                  <p className="text-stone-500 font-bold">عميل سعيد</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn x={30} delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-100 rounded-[3rem] rotate-3 -z-10" />

              <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dxxeujg8z/image/upload/v1781601860/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441_ijtxn7.avif"
                  alt="Dr. Abdelrahman Aouf"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={false}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. Vision & Mission - الرؤية والرسالة */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <FadeIn y={20}>
            <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-stone-100 h-full">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-8">
                <Target className="text-amber-600" size={32} />
              </div>
              <h3 className="text-3xl font-black text-stone-900 mb-6">
                رؤيتنا
              </h3>
              <p className="text-stone-500 text-lg leading-loose font-medium">
                أن نكون الوجهة الأولى والموثوقة للرعاية الصحية والتجميلية في مصر
                والشرق الأوسط، من خلال تقديم حلول مبتكرة وشخصية تضع معايير جديدة
                للجودة والتميز في عالم الطب.
              </p>
            </div>
          </FadeIn>

          <FadeIn y={20} delay={0.2}>
            <div className="bg-stone-900 p-12 rounded-[3rem] shadow-xl h-full text-white">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                <Lightbulb className="text-amber-500" size={32} />
              </div>
              <h3 className="text-3xl font-black mb-6">رسالتنا</h3>
              <p className="text-stone-300 text-lg leading-loose font-medium">
                تمكين كل فرد من الوصول إلى أفضل إمكاناته الصحية والجمالية عبر
                تقديم رعاية طبية متكاملة، مبنية على العلم، ومحاطة بالثقة
                والاهتمام الشخصي، في بيئة احترافية ودافئة.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. Core Values - المبادئ التي توجه عملنا */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="text-4xl lg:text-5xl font-black text-stone-900 mb-6">
              المبادئ التي توجه عملنا كل يوم
            </h2>
            <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full" />
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {values.map((val, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="text-center group">
                <div className="mb-6 inline-block p-6 bg-amber-50 rounded-full transition-transform duration-500 group-hover:scale-110 group-hover:bg-amber-100">
                  {val.icon}
                </div>
                <h4 className="text-2xl font-black text-stone-900 mb-4">
                  {val.title}
                </h4>
                <p className="text-stone-500 leading-relaxed font-medium">
                  {val.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 5. Team CTA - فريقنا الاستثنائي */}
      <section className="relative py-32 overflow-hidden bg-stone-900">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_1200,c_limit/v1777934362/photo-1519494026892-80bbd2d6fd0d_inhfzj.jpg"
            alt="Medical Team"
            fill
            sizes="100vw"
            className="object-cover grayscale"
            priority
            loading="eager"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
              نجاحنا يكتمل بفريقنا الاستثنائي من الأطباء والمتخصصين الذين
              يشاركوننا نفس الشغف والقيم
            </h2>
            <button className="bg-amber-600 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-amber-500 transition-all shadow-2xl hover:-translate-y-1">
              قابل فريق الخبراء لدينا
            </button>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
