"use client";

import React, { useEffect, useState } from "react";
import {
  Save,
  ArrowRight,
  Image as ImageIcon,
  Type,
  Tag as TagIcon,
  Clock,
  User,
  X,
  Plus,
  Eye,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/app/Components/shared/RichTextEditor";

const EditArticlePage = ({ params }) => {
  const { id } = React.use(params);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    categoryId: "", // 👈 تحويل اسم الحقل إلى كود المعرّف
    readTime: "",
    image: "",
    author: "",
    content: "",
    tags: [],
    published: true,
  });

  // =========================
  // GET DATA (ARTICLE & CATEGORIES)
  // =========================
  const getPageData = async () => {
    try {
      setLoading(true);
      
      // جلب المقال وجلب التصنيفات بالتوازي لتسريع الأداء
      const [articleRes, categoriesRes] = await Promise.all([
        fetch(`/api/articles/by-id/${id}`, { cache: "no-store", credentials: "include", }),
        fetch("/api/categories", { cache: "no-store", credentials: "include", })
      ]);

      const articleData = await articleRes.json();
      const categoriesData = await categoriesRes.json();

      if (!articleRes.ok) throw new Error(articleData.error || "حدث خطأ أثناء جلب المقال");
      if (!categoriesRes.ok) throw new Error(categoriesData.error || "حدث خطأ أثناء جلب التصنيفات");

      setFormData({
        title: articleData.article.title || "",
        slug: articleData.article.slug || "",
        categoryId: articleData.article.categoryId || "", // 👈 ربط الـ id المسترجع بالـ State
        readTime: articleData.article.readTime || "",
        image: articleData.article.image || "",
        author: articleData.article.author || "",
        content: articleData.article.content || "",
        tags: articleData.article.tags || [],
        published: articleData.article.published ?? true,
      });

      setCategories(categoriesData.categories || []);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPageData();
  }, []);

  // =========================
  // SAVE ARTICLE
  // =========================
  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: "", text: "" });

      // نقوم بتمرير الـ formData سليم ومحتوياً على الـ categoryId المطلوب
      const response = await fetch(`/api/articles/by-id/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "حدث خطأ أثناء الحفظ");

      setMessage({ type: "success", text: "تم تحديث المقال بنجاح" });
      
      setFormData({
        title: data.article.title || "",
        slug: data.article.slug || "",
        categoryId: data.article.categoryId || "",
        readTime: data.article.readTime || "",
        image: data.article.image || "",
        author: data.article.author || "",
        content: data.article.content || "",
        tags: data.article.tags || [],
        published: data.article.published ?? true,
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // =========================
  // TAGS
  // =========================
  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin text-stone-700" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-4 mt-15 lg:p-8 font-cairo" dir="rtl">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/blog"
            className="p-2 bg-white rounded-xl border border-stone-200 text-stone-500 hover:text-amber-600 transition-colors"
          >
            <ArrowRight size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-black text-stone-900">تعديل المقال</h1>
            <p className="text-sm text-stone-500">تعديل وتحديث محتوى المقال الطبي</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open(`/blog/${formData.slug}`, "_blank")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-600 font-bold text-sm hover:bg-stone-50 transition-all"
          >
            <Eye size={18} />
            <span>معاينة</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-sm hover:bg-amber-700 shadow-lg shadow-amber-900/10 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            <span>{saving ? "جاري الحفظ..." : "حفظ التغييرات"}</span>
          </button>
        </div>
      </div>

      {/* MESSAGE */}
      {message.text && (
        <div className="max-w-6xl mx-auto mb-6">
          <div className={`p-4 rounded-2xl font-bold ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message.text}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN BODY AREA */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <label className="flex items-center gap-2 text-stone-900 font-bold mb-2">
              <Type size={18} className="text-amber-600" /> عنوان المقال
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-stone-100 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all text-lg font-bold text-stone-800"
              placeholder="أدخل عنوان المقال..."
            />

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-stone-100 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all text-sm text-stone-700"
                placeholder="article-slug"
              />
            </div>
          </div>

          <div>
            <RichTextEditor
              value={formData.content}
              onChange={(htmlContent) => {
                setFormData((prev) => ({ ...prev, content: htmlContent }));
              }}
              placeholder="اكتب تفاصيل المقال الطبي هنا..."
              readOnly={false}
            />
          </div>
        </div>

        {/* SIDEBAR PANEL */}
        <div className="space-y-6">
          {/* COVER IMAGE */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <label className="flex items-center gap-2 text-stone-900 font-bold">
              <ImageIcon size={18} className="text-amber-600" /> الصورة البارزة
            </label>
            <div className="relative group rounded-2xl overflow-hidden aspect-video bg-stone-100 border-2 border-dashed border-stone-200">
              {formData.image && <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />}
            </div>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-100 bg-stone-50 text-stone-500 outline-none"
              placeholder="رابط الصورة..."
            />
          </div>

          {/* METADATA CONFIGURATION */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <h3 className="font-black text-stone-900 text-sm border-b border-stone-100 pb-3">إعدادات النشر</h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-stone-500 mb-2">
                  <User size={14} /> الكاتب
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-stone-100 bg-stone-50 text-sm outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-stone-500 mb-2">
                  <Clock size={14} /> وقت القراءة
                </label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-stone-100 bg-stone-50 text-sm outline-none focus:border-amber-500"
                />
              </div>

              {/* القائمة المنسدلة للتصنيفات القادمة ديناميكياً من قاعدة البيانات */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-stone-500 mb-2">
                  <TagIcon size={14} /> التصنيف
                </label>
                <div className="relative">
                  <select
                    name="categoryId" // 👈 تعديل الاسم ليرسل المُعرّف سليم للباك إند
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-stone-100 bg-stone-50 text-sm outline-none focus:border-amber-500 appearance-none font-bold text-stone-700 cursor-pointer"
                  >
                    <option value="">اختر التصنيف الطبي...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* TAG MANAGEMENT */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <label className="flex items-center gap-2 text-stone-900 font-bold">
              <TagIcon size={18} className="text-amber-600" /> الوسوم
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-100">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <form onSubmit={addTag} className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="أضف وسم..."
                className="w-full px-4 py-2 rounded-xl border border-stone-100 bg-stone-50 text-sm outline-none focus:border-amber-500"
              />
              <button type="submit" className="p-2 bg-stone-900 text-white rounded-xl hover:bg-amber-600 transition-colors">
                <Plus size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticlePage;