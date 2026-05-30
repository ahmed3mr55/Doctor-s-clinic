import Image from "next/image";

const SERVICES = [
  {
    title: "الجراحة التجميلية",
    image: "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_600/v1777934870/Untitled-design-2025-10-22T162454.315_z4umrg.png",
  },
  {
    title: "العناية بالبشرة",
    image: "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_600/v1777934765/photo-1570172619644-dfd03ed5d881_uxz3ia.jpg",
  },
  {
    title: "التغذية العلاجية",
    image: "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_600/v1777934802/photo-1490645935967-10de6ba17061_atnddz.jpg",
  },
  {
    title: "المساج الليمفاوي",
    image: "https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_600/v1777934838/Untitled-design_horopv.png",
  },
];

export default function ClinicLandingPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#FCFCFC] text-[#1A1A1A] font-sans pb-24">
      
      {/* 1. Hero Section - Fixed Dimensions */}
      <section className="pt-16 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          
          {/* Text Content - Right Side */}
          <div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-1 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              أعلى معايير الدقة والجمال
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter">
              دكتور <br />
              <span className="text-orange-600">مصطفى العكازي</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-md">
              فن نحت القوام وتنسيقه بأحدث التقنيات العالمية. استمتع بتجربة طبية فاخرة تضمن لك النتائج التي تطمح إليها.
            </p>
            <div className="flex flex-row-reverse gap-4 pt-4">
              <button className="bg-black text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-black/10">
                احجز استشارتك
              </button>
              <button className="border border-gray-200 px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:border-black transition-all">
                قصة النجاح
              </button>
            </div>
          </div>

          {/* Hero Image Container - Fixed height for fill */}
          <div className="w-full lg:w-[500px] order-1 lg:order-2">
            <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden rounded-[40px] md:rounded-[80px] shadow-2xl bg-gray-100">
              <Image 
                src="https://res.cloudinary.com/dxxeujg8z/image/upload/f_auto,q_auto,w_800,c_fill,g_face/v1777934920/WhatsApp-Image-2022-01-26-at-12.02.27-AM-1_jfdglk.jpg"
                alt="دكتور مصطفى العكازي"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Section - Ultra Minimalist */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { v: "12,000+", l: "عميل سعيد" },
            { v: "5,500+", l: "عملية ناجحة" },
            { v: "4.9/5", l: "تقييم جوجل" },
            { v: "18", l: "جائزة دولية" }
          ].map((s, i) => (
            <div key={i} className="p-8 border border-gray-50 rounded-3xl text-center hover:bg-white hover:shadow-sm transition-all">
              <div className="text-3xl font-bold mb-1 tracking-tight">{s.v}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Services Section - Small Premium Cards */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-r-2 border-orange-600 pr-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">خدماتنا المتخصصة</h2>
            <p className="text-gray-400 mt-2">نخبة من أفضل الحلول التجميلية</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <div key={i} className="group relative overflow-hidden rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
              {/* Image Container with fixed height for fill */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="p-6 text-center">
                <h3 className="font-bold text-lg mb-1 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">عرض التفاصيل</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. New Section: High-End Clinic Standards (Zara Style) */}
      <section className="py-24 bg-black text-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-5xl font-bold leading-tight tracking-tighter">
              لماذا تعتبر <br /> عيادة فيرا الأفضل؟
            </h2>
            <div className="grid grid-cols-1 gap-8">
              {[
                { t: "التكنولوجيا الألمانية", d: "نستخدم أحدث أجهزة الفيزر الأصلية لضمان أدق النتائج." },
                { t: "رعاية ما بعد الجراحة", d: "فريق تمريض متخصص لمتابعتك لحظة بلحظة حتى الاستشفاء." },
                { t: "تصميم الجمال", d: "لا نقوم بعمليات تجميل، بل نصمم الجمال بما يتناسب مع ملامحك." }
              ].map((f, i) => (
                <div key={i} className="border-r border-white/20 pr-6">
                  <h4 className="text-orange-500 font-bold mb-2 tracking-widest uppercase text-xs">{f.t}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[400px] w-full border border-white/10 rounded-[40px] flex items-center justify-center italic text-white/10 text-8xl font-bold select-none">
            VERA
          </div>
        </div>
      </section>

      {/* 5. New Section: Professional Quote (Minimalist) */}
      <section className="py-32 px-6 text-center max-w-3xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-light leading-relaxed italic text-gray-800">
          "الجمال ليس مجرد تغيير في المظهر، بل هو تعزيز للثقة التي تنعكس على حياتك بالكامل."
        </h3>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-gray-200"></div>
          <span className="font-bold text-sm tracking-widest uppercase text-orange-600">د. مصطفى العكازي</span>
          <div className="w-12 h-px bg-gray-200"></div>
        </div>
      </section>

    </main>
  );
}