"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Shield,
  ShieldAlert,
  Save,
  Key,
  Trash2,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Search,
  Check,
  SquareMinus,
} from "lucide-react";
import Link from "next/link";

export default function EditUserForm({ userId, canDelete = false, canManageRoles = false, canManagePermissions = false }) {
  const router = useRouter();

  // States الحالات والبيانات
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const [roles, setRoles] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [selectedRoleData, setSelectedRoleData] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    active: true,
    roleId: "",
  });

  // مصفوفة تحتوي على معرفات الصلاحيات المفعلة حالياً للمستخدم
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // جلب البيانات الأساسية من السيرفر
  const loadUserData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/users/${userId}`, { cache: "no-store" });
      const result = await res.json();

      if (!result.success) throw new Error(result.error);

      const u = result.user;
      setFormData({
        name: u.name || "",
        email: u.email || "",
        phone: u.phone || "",
        active: u.active,
        roleId: u.roleId || "",
      });
      setCurrentStatus(u.active);

      setRoles(result.allRoles || []);
      setAllPermissions(result.allPermissions || []);

      // استخراج الصلاحيات المفعلة الحالية بناءً على جدول الـ Role المربوط
      const currentPerms =
        u.role?.permissions?.map((p) => p.permissionId) || [];
      setSelectedPermissions(currentPerms);
    } catch (err) {
      showToast("error", err.message || "حدث خطأ أثناء جلب البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [userId]);

  // إظهار التنبيهات المؤقتة (Toasts)
  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 4000);
  };

  // معالجة تغيير الحقول النصية
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // عند تغيير الـ Role نقوم تلقائياً بتحديث معاينة الصلاحيات المقترنة به ديناميكياً (Optimistic Update)
  const handleRoleChange = (e) => {
    const selectedRoleId = e.target.value;
    setFormData((prev) => ({ ...prev, roleId: selectedRoleId }));

    const targetRole = roles.find((r) => r.id === selectedRoleId);
    if (targetRole) {
      const targetPerms =
        targetRole.permissions?.map((p) => p.permissionId) || [];
      setSelectedPermissions(targetPerms);
    }
  };

  // تفعيل أو تعطيل صلاحية مفردة بالضغط عليها
  const togglePermission = (permId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId],
    );
  };

  // تصنيف الصلاحيات وتجميعها بناءً على الكلمة الأولى من اسمها (مثال: `users.create` تنتمي إلى فئة `users`)
  const getGroupedPermissions = () => {
    const groups = {};
    allPermissions.forEach((perm) => {
      const groupName = perm.name.split(".")[0] || "عام";
      if (!groups[groupName]) groups[groupName] = [];

      if (
        !searchQuery ||
        perm.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        groups[groupName].push(perm);
      }
    });
    return groups;
  };

  // تفعيل كل الصلاحيات الظاهرة
  const selectAllPermissions = () => {
    const allIds = allPermissions.map((p) => p.id);
    setSelectedPermissions(allIds);
  };

  // إلغاء تحديد كافة الصلاحيات
  const deselectAllPermissions = () => {
    setSelectedPermissions([]);
  };

  // حفظ التعديلات الكلية للنموذج
  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          targetPermissions: selectedPermissions,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "فشل تحديث البيانات");

      showToast("success", "تم حفظ كافة التغييرات والصلاحيات بنجاح");
      router.refresh();
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  // إعادة تعيين كلمة المرور
  const handleResetPassword = async () => {
    const newPass = prompt(
      "أدخل كلمة المرور الجديدة الفورية للمستخدم (6 أحرف على الأقل):",
    );
    if (!newPass) return;
    if (newPass.length < 6) return alert("كلمة المرور قصيرة للغاية!");

    try {
      const res = await fetch(`/api/users/${userId}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: newPass }),
      });
      const result = await res.json();
      if (result.success)
        showToast("success", "تم تغيير كلمة المرور للمستخدم بنجاح");
      else throw new Error(result.error);
    } catch (err) {
      showToast("error", err.message);
    }
  };

  // حذف الحساب نهائياً
  const handleDeleteUser = async () => {
    if (
      !confirm(
        "هل أنت متأكد تماماً من حذف هذا الحساب الطبي نهائياً؟ لا يمكن استعادة البيانات المطلقة.",
      )
    )
      return;
    try {
      const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        alert("تم حذف المستخدم، سيتم إعادة توجيهك للوحة التحكم.");
        router.push("/dashboard/users");
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      showToast("error", err.message);
    }
  };

  const toggleUserStatus = async () => {
    if (actionLoading) return;
    try {
      setActionLoading(true);
      const nextStatus = !currentStatus;

      const res = await fetch(`/api/users/${userId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: nextStatus }),
      });

      const result = await res.json();

      if (result.success) {
        // 1. تحديث الحالة المحلية الحالية بنجاح
        setCurrentStatus(nextStatus);
        // 2. تحديث قيمة الحقل داخل فورم البيانات الأساسية لتوحيد الواجهة
        setFormData((prev) => ({ ...prev, active: nextStatus }));
        // 3. إظهار رسالة نجاح للمستخدم
        showToast(
          "success",
          nextStatus ? "تم تفعيل الحساب بنجاح" : "تم تعطيل الحساب مؤقتاً",
        );
        // 4. عمل Refresh سريع لتحديث المكونات السيرفرية المحيطة إن وجدت
        router.refresh();
      } else {
        throw new Error(result.error || "فشل تعديل حالة الحساب");
      }
    } catch (err) {
      showToast(
        "error",
        err.message || "حدث خطأ أثناء محاولة تعديل حالة الحساب",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const groupedPermissions = getGroupedPermissions();
  const canManageAccess = canManageRoles && canManagePermissions;

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 p-4 animate-pulse">
        <div className="h-12 bg-slate-200 rounded-2xl w-1/4" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-slate-200 rounded-3xl" />
          <div className="h-64 bg-slate-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* 🔔 نظام التنبيهات العائم (Toast Notification) */}
      {toast.show && (
        <div
          className={`fixed top-6 left-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-bold text-white transition-all ${toast.type === "success" ? "bg-emerald-600 border-emerald-500" : "bg-rose-600 border-rose-500"}`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertTriangle size={18} />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* 🔝 شريط ترويسة الصفحة السفلي والعلوي */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/users"
            className="p-2.5 bg-white border border-slate-200 text-slate-500 hover:text-blue-600 rounded-xl transition-all"
          >
            <ArrowRight size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-black text-slate-950">
              إعدادات ملف المستخدم والصلاحيات
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              تعديل صلاحيات الوصول، الدور الطبي، والتحكم بحالة الحساب.
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveChanges}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/10 transition-all disabled:opacity-50"
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          <span>
            {saving ? "جاري الحفظ الآمن..." : "حفظ التعديلات الحالية"}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 📋 القسم الأيمن: البيانات الأساسية والدور الوظيفي */}
        <div className="lg:col-span-2 space-y-6">
          {/* حقول البيانات الشخصية */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <User size={16} className="text-blue-600" /> البيانات الشخصية
              والمهنية
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {canManageRoles && (
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  الاسم الكامل
                </label>
                <div className="relative">
                  <User
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50/50 focus:bg-white text-slate-800 outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50/50 focus:bg-white text-slate-800 outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  رقم الهاتف
                </label>
                <div className="relative">
                  <Phone
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50/50 focus:bg-white text-slate-800 outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* منتقي الأدوار الديناميكي */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  تعيين الدور (Role)
                </label>
                <div className="relative">
                  <Shield
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <select
                    name="roleId"
                    value={formData.roleId}
                    onChange={handleRoleChange}
                    className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50/50 focus:bg-white text-slate-800 outline-none focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="">اختر الدور الإداري...</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 🛡️ قسم تجميع وإدارة الصلاحيات التفصيلية */}
          {canManageAccess && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Shield className="text-amber-500" size={16} /> تخصيص مصفوفة
                الصلاحيات المتقدمة
              </h3>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={selectAllPermissions}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg text-[11px] font-bold transition-all"
                >
                  تحديد الكل
                </button>
                <button
                  type="button"
                  onClick={deselectAllPermissions}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg text-[11px] font-bold transition-all"
                >
                  إلغاء التحديد
                </button>
              </div>
            </div>

            {/* شريط البحث بداخل الصلاحيات */}
            <div className="relative">
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={14}
              />
              <input
                type="text"
                placeholder="ابحث عن صلاحية معينة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-9 py-2 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {/* عرض المجموعات التكتلية للصلاحيات */}
            <div className="space-y-6 pt-2">
              {Object.keys(groupedPermissions).map((group) => {
                if (groupedPermissions[group].length === 0) return null;
                return (
                  <div key={group} className="space-y-2.5">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider border-r-2 border-slate-300 pr-2">
                      {group}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {groupedPermissions[group].map((perm) => {
                        const isChecked = selectedPermissions.includes(perm.id);
                        return (
                          <div
                            key={perm.id}
                            onClick={() => togglePermission(perm.id)}
                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer select-none transition-all ${isChecked ? "bg-blue-50/60 border-blue-200 text-blue-950 shadow-xs" : "bg-white border-slate-100 hover:bg-slate-50/80 text-slate-600"}`}
                          >
                            <div className="space-y-0.5">
                              <span className="text-xs font-mono font-bold block">
                                {perm.name}
                              </span>
                              {perm.description && (
                                <span className="text-[10px] text-slate-400 block">
                                  {perm.description}
                                </span>
                              )}
                            </div>
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${isChecked ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white"}`}
                            >
                              {isChecked && <Check size={12} strokeWidth={3} />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          )}
        </div>

        {/* 📐 القسم الأيسر: معلومات الحساب، أدوات التحكم وجدار الحماية */}
        <div className="space-y-6">
          {/* حالة الحساب والمؤشرات الكلية */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3">
              معلومات النظام الحالي
            </h3>

            <div className="space-y-3 text-xs font-bold text-slate-600">
              <div className="flex items-center justify-between">
                <span>حالة تفعيل الحساب:</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((p) => ({ ...p, active: !p.active }))
                  }
                  className={`px-3 py-1 rounded-full text-[10px] font-black border transition-all ${formData.active ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-rose-50 border-rose-200 text-rose-700"}`}
                >
                  {formData.active ? "● حساب نشط" : "● معطل عن العمل"}
                </button>
              </div>

              <div className="flex items-center justify-between font-mono text-slate-500">
                <span>تاريخ التسجيل:</span>
                <span>تلقائي من النظام</span>
              </div>
            </div>
          </div>

          {/* 🚨 جدار الحماية والمنطقة الحرجة (Danger Zone) */}
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-4 bg-rose-50/10">
            <h3 className="text-sm font-black text-rose-900 border-b border-rose-100 pb-3 flex items-center gap-2">
              <ShieldAlert className="text-rose-600" size={16} /> إجراءات
              الحماية والمنطقة الحرجة
            </h3>

            <div className="space-y-2.5">
              {/* إعادة تعيين كلمة المرور */}
              <button
                type="button"
                onClick={handleResetPassword}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Key size={14} className="text-slate-500" /> إعادة تعيين كلمة
                  مرور فورية
                </span>
                <span className="text-[10px] text-slate-400">تغيير فوري</span>
              </button>

              {/* تعطيل الحساب السريع */}
              {/* تعطيل الحساب السريع */}
              <button
                type="button"
                disabled={actionLoading}
                onClick={toggleUserStatus}
                className={`w-full flex items-center justify-between p-3 rounded-xl border font-bold text-xs transition-all disabled:opacity-50 ${
                  currentStatus
                    ? "bg-white border-slate-200 text-amber-700 hover:bg-amber-50/30"
                    : "bg-white border-slate-200 text-emerald-700 hover:bg-emerald-50/30"
                }`}
              >
                <span className="flex items-center gap-2">
                  {actionLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <SquareMinus size={14} />
                  )}
                  <span>
                    {currentStatus
                      ? "تجميد الحساب وتعطيله مؤقتاً"
                      : "إلغاء التجميد وتفعيل الحساب"}
                  </span>
                </span>
              </button>

              {/* حذف الحساب الكلي القاطع */}
              <button
                type="button"
                onClick={handleDeleteUser}
                className="w-full flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-bold text-xs transition-all"
              >
                <Trash2 size={14} />
                <span>حذف هذا الحساب نهائياً من العيادة</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// مكون أيقونة التحميل المساعد للعمليات المشتركة
function Loader2({ size = 16, className = "" }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      style={{ width: size, height: size }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
