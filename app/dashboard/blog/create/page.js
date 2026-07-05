"use client";

import React, { useState } from "react";
import {
  Send,
  ArrowRight,
  Image as ImageIcon,
  Type,
  Tag as TagIcon,
  Clock,
  Layout,
  X,
  Plus,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/app/Components/shared/RichTextEditor";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CreateArticlePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    readTime: "",
    image: "",
    author: "د. عبدالرحمن عوف",
    content: "",
    tags: [],
    published: true,
  });

  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [newTag, setNewTag] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // generate slug
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\u0600-\u06FF\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // submit article
  const handleSubmit = async () => {
    try {
      setLoading(true);

      setMessage({
        type: "",
        text: "",
      });

      const payload = {
        title: formData.title,
        slug: generateSlug(formData.title),
        categoryId: formData.categoryId,
        image: formData.image,
        author: formData.author,
        readTime: formData.readTime,
        tags: formData.tags,
        published: formData.published,
        content: formData.content,
      };

      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "حدث خطأ");
      }

      setMessage({
        type: "success",
        text: "تم نشر المقال بنجاح",
      });

      // reset form
      setFormData({
        title: "",
        category: "نحت القوام",
        readTime: "",
        image: "",
        author: "د. عبدالرحمن عوف",
        content: "",
        tags: [],
        published: true,
      });
      router.push("/dashboard/blog/edit/" + data.article.id);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();

        if (data.success) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      className="min-h-screen bg-stone-50 mt-15 p-4 lg:p-8 font-cairo"
      dir="rtl"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-5">
          <Link
            href="/dashboard/blog"
            className="p-3 bg-white rounded-2xl border border-stone-200 text-stone-400 hover:text-amber-600 transition-all shadow-sm"
          >
            <ArrowRight size={22} />
          </Link>

          <div>
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">
              إضافة مقال جديد
            </h1>

            <p className="text-stone-500 font-medium">
              شارك خبراتك الطبية مع مرضى فيرا كلينك
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-6 py-3 rounded-2xl bg-white border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition-all">
            حفظ كمسودة
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-stone-900 text-white font-bold hover:bg-amber-600 shadow-xl shadow-stone-200 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}

            <span>{loading ? "جاري النشر..." : "نشر المقال"}</span>
          </button>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div className="max-w-6xl mx-auto mb-6">
          <div
            className={`p-4 rounded-2xl font-bold ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-amber-600">
              <Type size={20} />

              <span className="font-bold text-sm uppercase tracking-wider">
                العنوان الرئيسي
              </span>
            </div>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="مثال: أهمية التغذية بعد عمليات نحت القوام..."
              className="w-full text-2xl lg:text-3xl font-black text-stone-900 placeholder:text-stone-200 outline-none bg-transparent"
            />
          </div>

          {/* Content */}
          <div>
            <RichTextEditor
              value={formData.content}
              onChange={(html) =>
                setFormData((prev) => ({ ...prev, content: html }))
              }
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Image */}
          <div className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm">
            <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
              <ImageIcon size={18} className="text-amber-600" />
              غلاف المقال
            </h3>

            {formData.image ? (
              <div className="relative group aspect-video rounded-2xl overflow-hidden border border-stone-100">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      image: "",
                    })
                  }
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
            ) : null}

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="ضع رابط الصورة هنا..."
              className="w-full mt-4 px-4 py-3 text-sm rounded-xl border border-stone-100 bg-stone-50 outline-none focus:border-amber-500"
            />
          </div>

          {/* Publish Settings */}
          <div className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm">
            <h3 className="font-bold text-stone-900 mb-6 border-b border-stone-50 pb-4">
              إعدادات النشر
            </h3>

            <div className="space-y-5">
              {/* Author */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest mr-1">
                  الكاتب
                </label>

                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="اسم الكاتب"
                  className="w-full px-4 py-3 rounded-xl border border-stone-100 bg-stone-50 text-sm outline-none focus:border-amber-500"
                />
              </div>

              {/* Read Time */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest mr-1">
                  وقت القراءة
                </label>

                <div className="relative">
                  <Clock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300"
                    size={16}
                  />

                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    placeholder="مثال: 5 دقائق"
                    className="w-full px-4 py-3 rounded-xl border border-stone-100 bg-stone-50 text-sm outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Published */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest mr-1">
                  حالة النشر
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        published: true,
                      }))
                    }
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                      formData.published
                        ? "bg-green-600 text-white"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    منشور
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        published: false,
                      }))
                    }
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                      !formData.published
                        ? "bg-amber-600 text-white"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    مسودة
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest mr-1">
                  التصنيف
                </label>

                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-100 bg-stone-50 text-sm font-bold text-stone-700 outline-none"
                >
                  <option value="">اختر التصنيف</option>

                  {loadingCategories ? (
                    <option disabled>جاري التحميل...</option>
                  ) : (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest mr-1">
                  وقت القراءة
                </label>

                <div className="relative">
                  <Clock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300"
                    size={16}
                  />

                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    placeholder="مثال: 4 دقائق"
                    className="w-full px-4 py-3 rounded-xl border border-stone-100 bg-stone-50 text-sm outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm">
            <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
              <TagIcon size={18} className="text-amber-600" />
              الكلمات المفتاحية
            </h3>

            <div className="flex flex-wrap gap-2 mb-5">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white text-[10px] font-black rounded-lg"
                >
                  {tag}

                  <button
                    onClick={() => removeTag(tag)}
                    className="text-amber-500 hover:text-white"
                  >
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
                placeholder="أضف وسم جديد..."
                className="flex-1 px-4 py-3 rounded-xl border border-stone-100 bg-stone-50 text-sm outline-none"
              />

              <button
                type="submit"
                className="p-3 bg-amber-500 text-white rounded-xl"
              >
                <Plus size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticlePage;
