"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone, Stethoscope, Image, ShieldCheck, AlertCircle, CheckCircle2, Loader2,  } from "lucide-react";
import RolePermissionsCard from "./RolePermissionsCard";

export default function UserForm() {
  const router = useRouter();

  // حالات جلب الأدوار والصلاحيات المنسدلة
  const [roles, setRoles] = useState([]);
  const [selectedRoleData, setSelectedRoleData] = useState(null);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loadingPermissions, setLoadingPermissions] = useState(false);

  // حالات تتبع تقديم النموذج والـ Notifications
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // مدخلات النموذج الكلية
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    roleId: "",
    specialization: "",
    avatar: "",
    active: true
  });

  // جلب كافة الأدوار الطبية المتاحة فور تهيئة النموذج
  useEffect(() => {
    async function fetchRoles() {
      try {
        const res = await fetch("/api/roles", {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.success) {
          setRoles(data.roles);
        }
      } catch (err) {
        setApiError("فشل في ربط السيرفر لجلب مصفوفة الأدوار الطبية");
      } finally {
        setLoadingRoles(false);
      }
    }
    fetchRoles();
  }, []);

  // جلب تفاصيل الصلاحيات تلقائياً عند اختيار الدور
  useEffect(() => {
    if (!formData.roleId) {
      setSelectedRoleData(null);
      return;
    }

    async function fetchRoleDetails() {
      try {
        setLoadingPermissions(true);
        const res = await fetch(`/api/roles/${formData.roleId}`);
        const data = await res.json();
        if (data.success) {
          setSelectedRoleData(data.role);
        }
      } catch (err) {
        console.error("Error fetching permissions hierarchy", err);
      } finally {
        setLoadingPermissions(false);
      }
    }
    fetchRoleDetails();
  }, [formData.roleId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setApiError(""); // تصفير الأخطاء عند إعادة التعديل
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");

    // التحقق المبدئي السريع من تطابق كلمتي المرور
    if (formData.password !== formData.confirmPassword) {
      setApiError("تنبيه: كلمتا المرور غير متطابقتين مطلقا");
      return;
    }

    try {
      setSubmitting(true);
      
      // افتراض وجود التوكين محفوظ في التخزين المحلي لإتمام مصادقة الـ JWT بالـ API المالي
      const token = localStorage.getItem("token") || "";

      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || null,
          roleId: formData.roleId,
          specialization: formData.specialization || null,
          avatar: formData.avatar || null,
          active: formData.active
        })
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "فشل في عملية إنشاء الحساب الموظف");
      }

      setSuccessMessage("تم إنشاء وتثبيت ملف حساب الكادر الطبي الجديد الموظف بنجاح");
      
      // تصفير مدخلات النموذج بالكامل بعد النجاح
      setFormData({
        name: "", email: "", password: "", confirmPassword: "",
        phone: "", roleId: "", specialization: "", avatar: "", active: true
      });
      setSelectedRoleData(null);

      // إعادة التوجيه لقائمة الكوادر والمستخدمين بعد فترة قصيرة
      setTimeout(() => {
        router.push("/dashboard/users");
      }, 2500);

    } catch (err) {
      setApiError(err.message || "حدث خطأ غير متوقع أثناء معالجة البيانات");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      
      {/* إشعارات الأخطاء والنجاح الطبية العائمة بداخل الحاوية */}
      <div className="lg:col-span-3 space-y-3">
        {apiError && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-800 text-xs font-bold flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle size={16} />
            <span>{apiError}</span>
          </div>
        )}
        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 size={16} />
            <span>{successMessage}</span>
          </div>
        )}
      </div>

      {/* 💼 الحاوية اليمنى: حقول البيانات الأساسية للملف الطبي الإداري */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <User size={16} className="text-blue-600" /> المعلومات الشخصية وبيانات تسجيل الدخول
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* الحقل: الاسم الكامل */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم الكامل الكلي <span className="text-rose-500">*</span></label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="د. أحمد عمرو"
                  className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50/50 focus:bg-white text-slate-800 outline-none focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* الحقل: البريد الإلكتروني */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">البريد الإلكتروني المهني <span className="text-rose-500">*</span></label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ahmed.amr@clinic.com"
                  className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50/50 focus:bg-white text-slate-800 outline-none focus:border-blue-500 transition-all font-mono placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* الحقل: كلمة المرور */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">كلمة المرور الحامية <span className="text-rose-500">*</span></label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••••"
                  className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50/50 focus:bg-white text-slate-800 outline-none focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* الحقل: تأكيد كلمة المرور */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">تأكيد كلمة المرور المطابقة <span className="text-rose-500">*</span></label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••••••"
                  className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50/50 focus:bg-white text-slate-800 outline-none focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* الحقل: رقم الهاتف */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الهاتف الجوال</label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="01xxxxxxxxx"
                  className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50/50 focus:bg-white text-slate-800 outline-none focus:border-blue-500 transition-all font-mono placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* الحقل: التخصص الطبي (اختياري) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">التخصص الطبي المعتمد</label>
              <div className="relative">
                <Stethoscope className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  placeholder="مثال: جراحة التجميل واليزر"
                  className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50/50 focus:bg-white text-slate-800 outline-none focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* الحقل: رابط الصورة الرمزية (Avatar) */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">رابط الصورة الرمزية أو الملف التعريفي</label>
              <div className="relative">
                <Image className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50/50 focus:bg-white text-slate-800 outline-none focus:border-blue-500 transition-all font-mono placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📐 الحاوية اليسرى: الأدوار والتحقق ومصفوفة الأمان الفورية */}
      <div className="space-y-6">
        
        {/* صندوق الصلاحيات والتفعيل الحسابي التلقائي */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <ShieldCheck size={16} className="text-amber-500" /> مصفوفة التعيين والحالة
          </h3>

          {/* اختيار الدور الوظيفي السيرفري المتزامن */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">الدور الطبي الوظيفي الحسابي <span className="text-rose-500">*</span></label>
            {loadingRoles ? (
              <div className="h-10 w-full bg-slate-100 animate-pulse rounded-xl" />
            ) : (
              <select
                name="roleId"
                required
                value={formData.roleId}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50/50 focus:bg-white text-slate-800 outline-none focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="">اختر الدور الإداري المسؤول...</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            )}
          </div>

          {/* مفتاح تفعيل الحساب الفوري */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-900 block">تفعيل الحساب فورا؟</span>
              <span className="text-[10px] text-slate-400 block">السماح بتسجيل الدخول فور الحفظ</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:content-[''] after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>

          {/* زر تقديم الاستمارة الحسابية الكلية للإنشاء */}
          <button
            type="submit"
            disabled={submitting || loadingRoles}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition-all shadow-md shadow-blue-600/10 disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            <span>{submitting ? "جاري تشفير الحساب وإنشائه..." : "حفظ الحساب واعتماده بالنظام"}</span>
          </button>
        </div>

        {/* كارت استعراض الصلاحيات التفاعلي التلقائي */}
        <RolePermissionsCard roleData={selectedRoleData} loading={loadingPermissions} />
      </div>

    </form>
  );
}