import React from "react";
import {
  ArrowLeft,
  Stethoscope,
  User,
  Droplets,
  Smile,
  Plus,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "01",
    icon: <Stethoscope size={24} />,
    title: "الجراحة التجميلية وتنسيق القوام",
    description:
      "نستخدم تقنيات الـ 4D والفيزر لنحت القوام بأسلوب فني يبرز تفاصيل الجمال الطبيعي، مع ضمان أمان تام وفترة تعافي قياسية تحت إشراف نخبة من الاستشاريين.",
    image:
      "https://veraclinics.net/wp-content/uploads/2025/10/Untitled-design-2025-10-25T003157.523.png",
    details: [
      "شفط الدهون الجراحي",
      "شد الترهلات",
      "تجميل الأنف",
      "تجميل الجفون",
    ],
    pageLink: "/plastic-surgery",
  },
  {
    id: "02",
    icon: <User size={24} />,
    title: "الجلدية والتجميل غير الجراحي",
    description:
      "نعيد لبشرتك حيويتها عبر أحدث بروتوكولات الحقن التجميلي (فيلر وبوتوكس) وتقنيات الليزر العالمية، لنتائج فورية وطبيعية تعكس شبابك الدائم.",
    image:
      "https://veraclinics.net/wp-content/uploads/2025/10/Untitled-design-2025-10-26T005303.131.png",
    details: [
      "حقن الفيلر والبوتوكس",
      "خيوط شد الوجه",
      "ليزر النضارة",
      "علاج الندبات",
    ],
    pageLink: "/dermatology",
  },
  {
    id: "03",
    icon: <Droplets size={24} />,
    title: "التغذية العلاجية والتحكم في الوزن",
    description:
      "صحتك هي استثمارك الأول. نصمم أنظمة غذائية متكاملة تعتمد على التحاليل الطبية لضمان الوصول للوزن المثالي وتحسين كفاءة الجسم الحيوية.",
    image:
      "https://veraclinics.net/wp-content/uploads/2025/10/Untitled-design-2025-10-26T012140.160.png",
    details: ["تخسيس موضعي", "أنظمة غذائية علاجية", "متابعة كتلة الجسم"],
    pageLink: "/nutrition",
  },
  {
    id: "04",
    icon: <Smile size={24} />,
    title: "المساج الليمفاوي والعناية بعد الجراحة",
    description:
      "برامج استشفاء متخصصة لتقليل التورم وتسريع التئام الأنسجة بعد العمليات، مما يضمن ظهور النتائج النهائية في وقت أسرع وبأفضل شكل ممكن.",
    image:
      "https://veraclinics.net/wp-content/uploads/2025/10/Untitled-design-2025-10-26T015553.561.png",
    details: ["تصريف ليمفاوي يدوي", "علاج التورم", "تحسين الدورة الدموية"],
    pageLink: "/postSurgeryCare",
  },
];

const ServiceCard = ({ service, idx }) => {
  const isEven = idx % 2 === 0;

  return (
    <div
      className={`py-10 lg:py-14 ${idx % 2 !== 0 ? "bg-stone-50/80" : "bg-white"}`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 relative flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-12`}
      >
        {/* خلفية ترقيم شفافة */}
        <span
          className={`hidden lg:block absolute top-0 ${isEven ? "left-6" : "right-6"} text-[8rem] font-black text-stone-200/40 -z-0 pointer-events-none`}
        >
          {service.id}
        </span>

        {/* الجانب الصوري - حجم أصغر ومحكم */}
        <div className="w-full lg:w-[32%] relative z-10">
          <div className="relative overflow-hidden rounded-[2rem] shadow-lg border-2 border-white transition-transform duration-500 hover:scale-[1.02]">
            <img
              src={service.image}
              alt={service.title}
              className="w-full aspect-square object-cover"
            />
          </div>
        </div>

        {/* الجانب النصي */}
        <div className="w-full lg:w-[60%] space-y-4 relative z-10">
          <div className="flex items-center gap-3 text-amber-600">
            <div className="p-2 bg-amber-100/50 rounded-lg">{service.icon}</div>
            <span className="text-xs font-black tracking-widest uppercase">
              Expert Care
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            {service.title}
          </h2>

          <p className="text-stone-500 text-lg leading-relaxed max-w-2xl">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 py-3 border-t border-stone-200/60">
            {service.details.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-stone-700 font-bold text-sm"
              >
                <Plus size={12} className="text-amber-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <Link
            href={service.pageLink}
            className="flex items-center gap-3 group pt-2"
          >
            <span className="w-10 h-10 flex items-center justify-center bg-stone-900 text-white rounded-full transition-all group-hover:bg-amber-600">
              <ArrowLeft size={18} />
            </span>
            <span className="text-md font-black text-stone-900 group-hover:text-amber-600 transition-colors">
              اكتشفي المزيد
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen font-cairo" dir="rtl">
      {/* Hero Section - مع صورة معبرة ومسافات مضغوطة */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 px-6 overflow-hidden bg-[#FCFBFA]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 space-y-6 z-10 text-center lg:text-right">
            <div className="inline-block px-4 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold">
              مركز فيرا الطبي - الخبرة تجتمع مع الفن
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-stone-900 leading-[1.1]">
              خدماتنا <br />
              <span className="text-amber-600">التجميلية</span>
            </h1>
            <p className="text-stone-500 text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
              نحن لا نغير ملامحك، بل نبرز أجمل ما فيها. اكتشفي مجموعة خدماتنا
              المتكاملة المصممة خصيصاً لتناسب احتياجاتك.
            </p>
          </div>

          <div className="w-full lg:w-1/2 relative group">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop"
                alt="Vera Clinic Interior"
                className="w-full aspect-[4/3] object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 to-transparent" />
            </div>
            {/* زخرفة خلف الصورة */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-100/30 rounded-full blur-[80px]" />
          </div>
        </div>
      </section>

      {/* قائمة الخدمات - الخلفية تتبادل داخل الـ Component */}
      <div className="flex flex-col">
        {services.map((service, idx) => (
          <ServiceCard key={service.id} service={service} idx={idx} />
        ))}
      </div>

      {/* CTA Section - مدمج وأكثر جاذبية */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="relative rounded-[2.5rem] bg-stone-900 overflow-hidden p-10 lg:p-14 text-center">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black text-white">
              ابدئي رحلة التغيير الآن
            </h2>
            <p className="text-stone-400 text-lg max-w-xl mx-auto">
              فريقنا الطبي مستعد لتقديم أفضل الحلول التجميلية التي تناسبك.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-amber-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-amber-700 transition-all">
                احجزي موعدك
              </button>
              <button className="w-full sm:w-auto border border-stone-700 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-stone-800 transition-all">
                تواصل واتساب
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
