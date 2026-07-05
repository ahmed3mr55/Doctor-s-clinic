// app/blog/page.js
import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma"; // تأكد من المسار الصحيح لملف بريزما عندك
import {
  Search,
  Calendar,
  Clock,
  BookOpen,
  ChevronLeft,
  User,
} from "lucide-react";

// مكون الصفحة الرئيسي (Server Component)
export default async function BlogPage({ searchParams }) {
  // 1. استقبال الـ searchParams (متوافق مع Next.js 15/16)
  const params = await searchParams;
  const activeCategorySlug = params.category || "all";
  const searchQuery = params.search || "";

  // 2. بناء شرط استعلام المقالات (Where Clause) مباشرة لقاعدة البيانات
  let articlesWhere = {
    published: true,
  };

  // الفلترة حسب الـ slug الخاص بالتصنيف
  if (activeCategorySlug && activeCategorySlug !== "all") {
    articlesWhere.category = {
      slug: activeCategorySlug,
    };
  }

  // الفلترة حسب كلمة البحث إذا تم تمريرها
  if (searchQuery.trim().length > 0) {
    articlesWhere.OR = [
      { title: { contains: searchQuery, mode: "insensitive" } },
      { content: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  // 3. جلب البيانات مباشرة من قاعدة البيانات بالتوازي (Parallel Queries)
  const [dbCategories, filteredArticles] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.article.findMany({
      where: articlesWhere,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return (
    <main className="bg-[#FAF9F6] min-h-screen pt-32 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* الهيدر وقسم البحث */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-600 font-bold mb-4">
              <BookOpen size={20} />
              <span className="tracking-widest uppercase text-sm">المجلة الطبية</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-stone-900 mb-6 leading-tight">
              مقالات تعليمية بقلم <br />{" "}
              <span className="text-amber-600">د. عبدالرحمن عوف</span>
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed">
              نهتم بتوعية مرضانا بكل ما هو جديد في عالم الطب التجميلي، لنساعدك
              على اتخاذ قراراتك بناءً على أسس علمية دقيقة.
            </p>
          </div>

          {/* تفعيل صندوق البحث عبر الـ URL Query */}
          <form method="GET" className="relative">
            {/* في حال وجود تصنيف نشط، نحافظ عليه أثناء البحث */}
            {activeCategorySlug !== "all" && (
              <input type="hidden" name="category" value={activeCategorySlug} />
            )}
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="ابحث عن موضوع واضغط Enter..."
              className="w-full md:w-80 px-6 py-4 rounded-2xl bg-white border border-stone-100 shadow-sm focus:border-amber-500 outline-none pr-12 transition-all"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
          </form>
        </div>

        {/* أزرار التصفية الديناميكية المستخرجة مباشرة من الداتابيز */}
        <div className="flex flex-wrap gap-3 mb-12">
          <Link
            href="?category=all"
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
              activeCategorySlug === "all"
                ? "bg-stone-900 text-white shadow-lg border-stone-900"
                : "bg-white text-stone-500 hover:bg-amber-50 border-stone-100"
            }`}
          >
            الكل
          </Link>

          {dbCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`?category=${cat.slug}${searchQuery ? `&search=${searchQuery}` : ""}`}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeCategorySlug === cat.slug
                  ? "bg-stone-900 text-white shadow-lg border-stone-900"
                  : "bg-white text-stone-500 hover:bg-amber-50 border-stone-100"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* شبكة المقالات المفلترة */}
        <div className="grid md:grid-cols-2 gap-10">
          {filteredArticles.length === 0 ? (
            <div className="col-span-2 text-center py-20 bg-white rounded-[2.5rem] border border-stone-100">
              <p className="text-stone-400 font-bold">لا توجد مقالات منشورة تطابق هذا الاختيار حالياً.</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500 flex flex-col lg:flex-row"
              >
                {/* صورة المقال وتصنيفه */}
                <div className="lg:w-2/5 relative overflow-hidden h-64 lg:h-auto">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {article.category && (
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-black text-stone-900 uppercase tracking-wider">
                      {article.category.name}
                    </div>
                  )}
                </div>

                {/* محتوى المقال */}
                <div className="lg:w-3/5 p-8 flex flex-col">
                  <div className="flex items-center gap-4 text-stone-400 text-xs mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />{" "}
                      {new Date(article.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-stone-900 mb-4 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 mb-8">
                    {article.content}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-stone-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                        <User size={14} />
                      </div>
                      <span className="text-xs font-bold text-stone-800">
                        {article.author}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${article.slug}`}
                      className="flex items-center gap-1 text-amber-600 font-bold text-sm hover:gap-3 transition-all"
                    >
                      إقرأ المقال
                      <ChevronLeft size={18} />
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
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