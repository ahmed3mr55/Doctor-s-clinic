import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  Share2, 
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { FaFacebookF, FaTwitter, X } from "react-icons/fa";

// محاكاة لجلب البيانات (في الواقع ستجلبها من Database أو API)
const getArticleData = (id) => ({
  id: id,
  title: "مستقبل نحت القوام: الفرق بين الفيزر والـ 4D",
  category: "نحت القوام",
  date: "15 مايو 2024",
  readTime: "5 دقائق",
  image: "https://images.unsplash.com/photo-1512677859289-868722942457?auto=format&fit=crop&q=80",
  author: "د. مصطفى العكازي",
  content: `
    <p className="text-xl leading-loose text-stone-600 mb-8">
      يعتبر نحت القوام حلم الكثيرين للحصول على جسم متناسق ومثالي. ومع تطور التكنولوجيا الطبية، ظهرت تقنيات متقدمة مثل الفيزر (Vaser) والـ 4D. لكن يبقى السؤال الأهم: ما الفرق بينهما وأيهما الأنسب لك؟
    </p>
    
    <h2 className="text-3xl font-black text-stone-900 mb-6 mt-12">ما هي تقنية الفيزر (Vaser Liposuction)؟</h2>
    <p className="text-lg leading-relaxed text-stone-500 mb-6">
      تعتمد تقنية الفيزر على الموجات فوق الصوتية لتفتيت الدهون بشكل انتقائي دون المساس بالأوعية الدموية أو الأعصاب المحيطة، مما يقلل من فترة التعافي والكدمات بشكل كبير مقارنة بالشفط التقليدي.
    </p>

    <div className="bg-amber-50 border-r-4 border-amber-500 p-8 my-10 rounded-2xl">
      <h4 className="text-amber-900 font-bold mb-2 text-xl">ملحوظة طبية:</h4>
      <p className="text-amber-800 leading-relaxed">
        الفيزر ليس وسيلة لإنقاص الوزن، بل هو أداة لرسم وتنسيق المناطق التي لا تستجيب للرياضة والأنظمة الغذائية.
      </p>
    </div>

    <h2 className="text-3xl font-black text-stone-900 mb-6 mt-12">نحت القوام رباعي الأبعاد (4D Body Contouring)</h2>
    <p className="text-lg leading-relaxed text-stone-500 mb-6">
      هذه ليست مجرد تقنية، بل هي فلسفة جراحية. الـ 4D يعني نحت الجسم مع مراعاة أبعاد العضلات أثناء الحركة والسكون، مما يعطي مظهراً طبيعياً جداً للبطن والأجناب والظهر.
    </p>
  `,
  tags: ["الفيزر", "نحت الجسم", "4D", "تنسيق القوام"]
});

export default async function SingleArticlePage({ params }) {
  const { id } = await params;
  const article = getArticleData(id);

  return (
    <main className="bg-[#FAF9F6] min-h-screen pt-32 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* زر العودة والمسار (Breadcrumbs) */}
        <div className="mb-12 flex flex-wrap items-center gap-4 text-sm font-bold text-stone-400">
          <Link href="/blog" className="flex items-center gap-1 hover:text-amber-600 transition-colors">
            <ChevronRight size={18} />
            المدونة
          </Link>
          <span className="w-1 h-1 rounded-full bg-stone-300" />
          <span className="text-amber-600">{article.category}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* محتوى المقال (الجزء الأكبر) */}
          <article className="lg:col-span-8">
            <header className="mb-10">
              <h1 className="text-4xl lg:text-6xl font-black text-stone-900 mb-8 leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 py-6 border-y border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden">
                    <img src="https://veraclinics.net/wp-content/uploads/2025/10/WhatsApp-Image-2022-01-26-at-12.02.27-AM-1.jpeg" alt={article.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 mb-0.5">الكاتب</p>
                    <p className="text-sm font-black text-stone-800">{article.author}</p>
                  </div>
                </div>
                
                <div className="h-10 w-px bg-stone-100 hidden md:block" />

                <div className="flex items-center gap-6 text-stone-500 text-sm">
                  <span className="flex items-center gap-2"><Calendar size={18} className="text-amber-600" /> {article.date}</span>
                  <span className="flex items-center gap-2"><Clock size={18} className="text-amber-600" /> {article.readTime} قراءة</span>
                </div>
              </div>
            </header>

            {/* الصورة الرئيسية */}
            <div className="relative h-[400px] lg:h-[550px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
              <img 
                src={article.image} 
                className="w-full h-full object-cover shadow-inner" 
                alt={article.title} 
              />
            </div>

            {/* جسم المقال */}
            <div 
              className="prose prose-stone prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* الكلمات الدلالية ومشاركة المقال */}
            <div className="mt-16 pt-8 border-t border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-stone-100 text-stone-600 rounded-xl text-sm font-bold">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <span className="font-bold text-stone-900">شارك المقال:</span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-white border border-stone-100 flex items-center justify-center text-stone-600 hover:bg-amber-600 hover:text-white transition-all">
                    <FaFacebookF size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white border border-stone-100 flex items-center justify-center text-stone-600 hover:bg-amber-600 hover:text-white transition-all">
                    <FaTwitter size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white border border-stone-100 flex items-center justify-center text-stone-600 hover:bg-amber-600 hover:text-white transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* الشريط الجانبي (Sidebar) */}
          <aside className="lg:col-span-4 space-y-10">
            
            {/* بطاقة الحجز السريع */}
            <div className="bg-stone-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-32 h-32 bg-amber-600/20 blur-[50px]" />
              <h3 className="text-2xl font-black mb-4 relative z-10">هل ترغب في استشارة <span className="text-amber-500">خاصة؟</span></h3>
              <p className="text-stone-400 mb-8 relative z-10 leading-relaxed">يمكنك حجز موعد استشارة مع د. مصطفى العكازي لمناقشة حالتك بالتفصيل.</p>
              <button className="w-full bg-amber-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-amber-500 transition-all active:scale-95">
                احجز موعدك الآن
                <ArrowLeft size={18} />
              </button>
            </div>

            {/* مقالات ذات صلة */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-stone-100 shadow-sm">
              <h3 className="text-xl font-black text-stone-900 mb-6">مقالات قد تهمك</h3>
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <Link href="#" key={item} className="group flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-stone-100">
                      <img src="https://images.unsplash.com/photo-1512677859289-868722942457?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-800 line-clamp-2 group-hover:text-amber-600 transition-colors">كيف تختار أفضل تقنية لشد البطن؟</h4>
                      <p className="text-[10px] text-stone-400 mt-1 font-bold uppercase tracking-wider">نصائح طبية</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* قائمة التحقق (لماذا نحن؟) */}
            <div className="bg-amber-50/50 rounded-[2.5rem] p-8 border border-amber-100">
              <h3 className="text-xl font-black text-stone-900 mb-6 text-center">لماذا فيرا كلينيك؟</h3>
              <ul className="space-y-4">
                {[
                  "أحدث أجهزة الفيزر الأمريكية",
                  "خبرة أكثر من 5000 عملية ناجحة",
                  "أعلى معايير التعقيم العالمية",
                  "متابعة دورية بعد العملية مجاناً"
                ].map((text, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-stone-700 text-sm font-medium">
                    <CheckCircle2 className="text-amber-600" size={20} />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

        </div>

        {/* سيكشن التواصل (CTA) - مشابه لصفحة المقالات لتوحيد التصميم */}
        <section className="mt-32 bg-stone-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-600 opacity-5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6">
              ابدأ رحلة التغيير <span className="text-amber-500">اليوم</span>
            </h3>
            <p className="text-stone-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              فريقنا الطبي جاهز لاستقبالك وتقديم أفضل الحلول التجميلية التي تناسب احتياجاتك.
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