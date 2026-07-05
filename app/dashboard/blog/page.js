import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import BlogHomeClient from "@/app/features/blog/BlogHomeClient";
import { auth } from "@/lib/auth";

// دالة جلب المقالات والإحصائيات مباشرة من السيرفر
async function getBlogData(pageNumber) {
  const limit = 6;
  const skip = (pageNumber - 1) * limit;

  // جلب البيانات والإحصائيات بالتوازي لسرعة فائقة في الـ SSR
  const [articles, totalItems, publishedCount] = await Promise.all([
    prisma.article.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }, // ترتيب المقالات من الأحدث للأقدم
    }),
    prisma.article.count(),
    prisma.article.count({ where: { published: true } })
  ]);

  return {
    articles,
    stats: {
      totalItems,
      publishedArticles: publishedCount,
    },
    pagination: {
      currentPage: pageNumber,
      totalPages: Math.ceil(totalItems / limit) || 1,
      totalItems,
    }
  };
}

export default async function BlogHomePage({ searchParams }) {
  const authUser = await auth();
  if (!authUser.can("articles.read")) return null;

  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page) || 1;

  const serverData = await getBlogData(page);

  return (
    <div className="min-h-screen bg-stone-50 mt-15 p-4 lg:p-8 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">إدارة المدونة</h1>
            <p className="text-stone-500 font-medium">مرحباً بك في مركز التحكم بالمحتوى لـ Tan Clinics</p>
          </div>
          {authUser.can("articles.create") && (
          <Link
            href="/dashboard/blog/create"
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-stone-900 text-white rounded-2xl font-bold hover:bg-amber-600 shadow-xl shadow-stone-200 transition-all transform hover:-translate-y-1"
          >
            <Plus size={20} />
            <span>إضافة مقال جديد</span>
          </Link>
          )}
        </div>

        {/* تمرير البيانات القادمة من السيرفر إلى مكون الكلاينت */}
        <BlogHomeClient
          serverData={serverData}
          canUpdate={authUser.can("articles.update")}
          canDelete={authUser.can("articles.delete")}
        />
      </div>
    </div>
  );
}
