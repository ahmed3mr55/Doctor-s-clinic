import React from "react";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/app/Components/shared/MotionWrapper";
import Image from "next/image";

const PlasticSurgeryPage = () => {
  const services = [
    {
      title: "نحت الجسم الديناميكي رباعي الأبعاد (4D Lipo)",
      desc: "ليست مجرد عملية شفط دهون، بل هي تقنية فنية متقدمة تستخدم جهاز الفيزر لنحت العضلات وإبراز معالمها الجمالية، مما يمنحك قواماً رياضياً ومنحوتاً بدقة متناهية.",
      image:
        "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_1200,c_limit/v1778063811/Untitled-design-2025-10-25T003157.523_lauhh7.png",
    },
    {
      title: "عمليات شد الترهلات (Body Lifts)",
      desc: "الحل الأمثل للتخلص من الجلد الزائد بعد فقدان الوزن الكبير أو الحمل. تشمل عمليات شد البطن، الذراعين، والأفخاذ لاستعادة مظهر الجسم المشدود والشبابي.",
      image:
        "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_1200,c_limit/v1780188270/Untitled-design-2025-10-22T141404.557_vtvvln.png",
    },
    {
      title: "جراحات الثدي (Breast Surgery)",
      desc: "سواء كنتِ تبحثين عن تكبير، تصغير، أو شد ورفع الثدي، نقدم لكِ خيارات آمنة ونتائج طبيعية تعزز أنوثتك وتناسق جسمك، كما نقدم حلولاً فعالة لمشكلة التثدي لدى الرجال.",
      image:
        "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_1200,c_limit/v1780188338/Untitled-design-2025-10-22T164002.487_b0dozh.png",
    },
    {
      title: "حقن الدهون الذاتية(Fat Grafting)",
      desc: "إجراء طبيعي وآمن يتم فيه استخدام دهون الجسم الذاتية لإعادة الحجم والنضارة لمناطق أخرى مثل الوجه، اليدين، أو المؤخرة، مما يمنح نتائج طويلة الأمد ومظهراً طبيعياً بالكامل.",
      image:
        "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_1200,c_limit/v1780188406/Untitled-design-2025-10-22T152442.074_pqjzd2.png",
    },
  ];

  return (
    <div className="bg-white text-stone-800 selection:bg-amber-100" dir="rtl">
      {/* 1. Hero Section */}
      <section className="relative pt-25 min-h-[90vh] flex items-center bg-[#FAF9F6] py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10 items-center">
          <FadeIn y={30}>
            <div className="text-stone-900">
              <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                Tan Medical Excellence
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
                الجراحة التجميلية: <br />
                <span className="text-amber-600 font-serif italic font-medium">
                  فن الدقة والجمال
                </span>
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-10 max-w-xl font-light">
                تحت قيادة الدكتور عبدالرحمن عوف، نجمع بين أحدث التقنيات العالمية
                والنظرة الفنية الدقيقة لنحت كل تفصيلة في الجسم والوجه، مع ضمان
                أقصى درجات الأمان.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-stone-900 hover:bg-amber-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg hover:-translate-y-1">
                  احجز استشارتك الآن
                </button>
                <button className="border border-stone-200 hover:bg-stone-100 text-stone-800 px-10 py-4 rounded-full font-bold transition-all">
                  مشاهدة النتائج
                </button>
              </div>
            </div>
          </FadeIn>

          <div className="hidden lg:block relative">
            <FadeIn x={-50} delay={0.2}>
              <div className="relative z-10 w-[420px] h-[520px] mx-auto rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_900,c_limit/v1777934870/Untitled-design-2025-10-22T162454.315_z4umrg.png"
                  alt="Surgery Excellence"
                  fill
                  priority
                  sizes="420px"
                  className="object-cover"
                />
              </div>

              <div className="absolute -top-10 -left-10 w-64 h-64 bg-amber-100 rounded-full blur-3xl -z-10 opacity-60" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-stone-200 rounded-full blur-2xl -z-10 opacity-50" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. Services Section */}
      <section>
        {services.map((service, index) => (
          <div
            key={index}
            className={`${index % 2 !== 0 ? "bg-stone-50" : "bg-white"} py-24 px-6 transition-colors duration-500`}
          >
            <div className="max-w-7xl mx-auto">
              <FadeIn y={30}>
                <div
                  className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16`}
                >
                  <div className="flex-1 w-full">
                    <div className="relative group overflow-hidden rounded-[2rem] shadow-xl aspect-video">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        priority={false}
                      />

                      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem]" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <span className="text-amber-600 font-mono font-bold text-sm tracking-tighter">
                      0{index + 1} — SERVICES
                    </span>
                    <h2 className="text-4xl font-bold text-stone-900 tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-stone-500 text-lg leading-relaxed font-light">
                      {service.desc}
                    </p>
                    <button className="group flex items-center gap-3 text-stone-900 font-bold hover:text-amber-600 transition-colors">
                      إكتشف المزيد عن الخدمة
                      <ArrowLeft
                        size={18}
                        className="group-hover:-translate-x-2 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Why Choose Tan */}
      <section className="bg-stone-900 py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn y={20}>
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-12 leading-tight text-white">
                  لماذا تختار عيادة فيرا <br />
                  <span className="text-amber-500">لقرارك التجميلي؟</span>
                </h2>

                <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    {
                      t: "إشراف استشاري",
                      d: "دقة في التشخيص تحت إشراف د. عبدالرحمن عوف.",
                    },
                    {
                      t: "تقنيات FDA",
                      d: "أجهزة عالمية تضمن الأمان التام والنتائج المبهرة.",
                    },
                    {
                      t: "خصوصية تامة",
                      d: "نهتم بخصوصية المريض في كافة مراحل العلاج.",
                    },
                    {
                      t: "متابعة دقيقة",
                      d: "رعاية ما بعد الجراحة لضمان تعافي مثالي.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group border-r border-white/10 pr-6 hover:border-amber-500 transition-colors"
                    >
                      <h4 className="font-bold text-lg mb-2 text-white">
                        {item.t}
                      </h4>
                      <p className="text-stone-400 text-sm leading-relaxed font-light">
                        {item.d}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn scale={0.95} delay={0.2}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10 aspect-[4/3]">
                  <Image
                    src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_1200,c_limit/v1780188479/photo-1579684385127-1ef15d508118_jamqth.jpg"
                    alt="Professional Team"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full -z-0" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlasticSurgeryPage;
