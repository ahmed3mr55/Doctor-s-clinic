import React from 'react';
import Link from 'next/link';
import { 
  Search, 
  Calendar, 
  Clock, 
  BookOpen,
  ChevronLeft,
  User
} from 'lucide-react';

// 1. البيانات (الداتا)
const articles = [
  {
    id: 1,
    title: "مستقبل نحت القوام: الفرق بين الفيزر والـ 4D",
    excerpt: "تعرف على أحدث التقنيات العالمية في إعادة رسم تفاصيل الجسم وكيف تختار الإجراء المناسب لك...",
    category: "نحت القوام",
    date: "15 مايو 2024",
    readTime: "5 دقائق",
    image: "https://images.unsplash.com/photo-1512677859289-868722942457?auto=format&fit=crop&q=80",
    author: "د. مصطفى العكازي"
  },
  {
    id: 2,
    title: "كيفية الحفاظ على نتائج عملية شفط الدهون للأبد",
    excerpt: "العملية هي البداية فقط. إليك الدليل الشامل للنظام الغذائي والرياضي لضمان استدامة قوامك الجديد...",
    category: "نصائح طبية",
    date: "10 مايو 2024",
    readTime: "7 دقائق",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80",
    author: "د. مصطفى العكازي"
  },
  {
    id: 3,
    title: "حقن الدهون الذاتية: ثورة في عالم تجميل الوجه",
    excerpt: "لماذا تعتبر الدهون الذاتية أفضل من الفيلر الصناعي؟ وكيف يتم استخلاصها وإعادة حقنها بأمان؟",
    category: "تجميل الوجه",
    date: "02 مايو 2024",
    readTime: "4 دقائق",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80",
    author: "د. مصطفى العكازي"
  },
  {
    id: 4,
    title: "شد الترهلات بعد فقدان الوزن الكبير",
    excerpt: "كل ما تريد معرفته عن جراحات قص الجلد المترهل والتعافي منها والنتائج المتوقعة بكل شفافية...",
    category: "جراحة التجميل",
    date: "28 أبريل 2024",
    readTime: "6 دقائق",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
    author: "د. مصطفى العكازي"
  }
];

const categories = ["الكل", "نحت القوام", "تجميل الوجه", "جراحة التجميل", "نصائح طبية"];

// مكون الصفحة (Server Component)
export default async function BlogPage({ searchParams }) {
  // حل المشكلة: لازم نعمل await للـ searchParams في Next.js 15
  const params = await searchParams;
  const activeCategory = params.category || "الكل";

  // فلترة المقالات في السيرفر
  const filteredArticles = activeCategory === "الكل" 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <main className="bg-[#FAF9F6] min-h-screen pt-32 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* الهيدر */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-600 font-bold mb-4">
              <BookOpen size={20} />
              <span className="tracking-widest uppercase text-sm">المجلة الطبية</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-stone-900 mb-6 leading-tight">
              مقالات تعليمية بقلم <br/> <span className="text-amber-600">د. مصطفى العكازي</span>
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed">
              نهتم بتوعية مرضانا بكل ما هو جديد في عالم الطب التجميلي، لنساعدك على اتخاذ قراراتك بناءً على أسس علمية دقيقة.
            </p>
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="ابحث عن موضوع..." 
              className="w-full md:w-80 px-6 py-4 rounded-2xl bg-white border border-stone-100 shadow-sm focus:border-amber-500 outline-none pr-12 transition-all"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
          </div>
        </div>

        {/* التصفية (Filters) */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`?category=${cat}`}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeCategory === cat 
                ? "bg-stone-900 text-white shadow-lg border-stone-900" 
                : "bg-white text-stone-500 hover:bg-amber-50 border-stone-100"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* شبكة المقالات */}
        <div className="grid md:grid-cols-2 gap-10">
          {filteredArticles.map((article) => (
            <article 
              key={article.id}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500 flex flex-col lg:flex-row"
            >
              {/* صورة المقال */}
              <div className="lg:w-2/5 relative overflow-hidden h-64 lg:h-auto">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-black text-stone-900 uppercase tracking-wider">
                  {article.category}
                </div>
              </div>

              {/* محتوى المقال */}
              <div className="lg:w-3/5 p-8 flex flex-col">
                <div className="flex items-center gap-4 text-stone-400 text-xs mb-4">
                  <span className="flex items-center gap-1"><Calendar size={14}/> {article.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14}/> {article.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-stone-900 mb-4 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {article.title}
                </h2>
                
                <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 mb-8">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-stone-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                      <User size={14} />
                    </div>
                    <span className="text-xs font-bold text-stone-800">{article.author}</span>
                  </div>
                  
                  <Link 
                    href={`/blog/${article.id}`} 
                    className="flex items-center gap-1 text-amber-600 font-bold text-sm hover:gap-3 transition-all"
                  >
                    إقرأ المقال
                    <ChevronLeft size={18} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* الترقيم (Pagination) */}
        <div className="flex justify-center mt-20 gap-3">
          {[1, 2, 3].map((num) => (
            <Link 
              key={num}
              href="#"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all ${
                num === 1 
                ? "bg-amber-600 text-white shadow-xl shadow-amber-600/20" 
                : "bg-white text-stone-400 border border-stone-100 hover:border-amber-200"
              }`}
            >
              {num}
            </Link>
          ))}
        </div>

        {/* سيكشن التواصل (CTA) */}
        <section className="mt-32 bg-stone-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-600 opacity-5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6">
              هل لديك استفسار <span className="text-amber-500">طبي</span> خاص؟
            </h3>
            <p className="text-stone-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              لا تتردد في مراسلتنا. فريقنا الطبي متاح للإجابة على تساؤلاتك حول تقنيات التجميل الحديثة.
            </p>
            <button className="bg-amber-600 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-amber-500 hover:-translate-y-1 transition-all shadow-2xl">
              تحدث مع المنسقة الطبية
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}