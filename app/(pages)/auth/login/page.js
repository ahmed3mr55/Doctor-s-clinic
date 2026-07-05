"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Lock, 
  Mail, 
  Loader2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ShieldCheck 
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  
  // حالات حقول الإدخال والتحميل والأخطاء
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("برجاء إدخال البريد الإلكتروني وكلمة المرور");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        // التعامل مع رسائل الخطأ القادمة من الـ API وترجمتها
        if (data.message === "Invalid credentials") {
          throw new Error("بيانات الدخول غير صحيحة، يرجى التحقق وإعادة المحاولة");
        } else if (data.message === "Account disabled") {
          throw new Error("هذا الحساب معطل حالياً، يرجى مراجعة الدعم الفني");
        } else if (data.message === "Email and password are required") {
          throw new Error("البريد الإلكتروني وكلمة المرور مطلوبان");
        } else {
          throw new Error(data.message || "حدث خطأ ما أثناء تسجيل الدخول");
        }
      }

      // توجيه المستخدم لوحة التحكم بعد نجاح التوثيق والـ Cookies اتسجلت بالباك إند
      router.push("/dashboard");
      router.refresh();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 font-cairo" dir="rtl">
      <div className="w-full max-w-md bg-white p-8 lg:p-10 rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-900/[0.02] space-y-8 relative overflow-hidden">
        
        {/* اللمسة الجمالية العلوية للخلفية */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-stone-700 via-stone-900 to-stone-800" />

        {/* الهيدر والشعار للوحة التحكم */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-stone-900 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-stone-900/10">
            <ShieldCheck size={28} />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">بوابة الإدارة الرقمية</h1>
            <p className="text-xs font-bold text-stone-400">سجل الدخول لإدارة العيادة والبيانات الطبية</p>
          </div>
        </div>

        {/* عرض رسائل الخطأ إن وجدت */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-start gap-3 text-sm font-bold animate-fadeIn">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* استمارة تسجيل الدخول */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* حقل البريد الإلكتروني */}
          <div className="space-y-2">
            <label className="text-xs font-black text-stone-500 block mr-1">البريد الإلكتروني للإدارة</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-4 flex items-center text-stone-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@clinic.com"
                disabled={loading}
                className="w-full pl-4 pr-12 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                dir="ltr"
              />
            </div>
          </div>

          {/* حقل كلمة المرور */}
          <div className="space-y-2">
            <label className="text-xs font-black text-stone-500 block mr-1">كلمة المرور</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-4 flex items-center text-stone-400">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={loading}
                className="w-full pl-12 pr-12 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute inset-y-0 left-4 flex items-center text-stone-400 hover:text-stone-700 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* زر التقديم والإرسال */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-stone-900 text-white font-black text-sm rounded-2xl hover:bg-stone-800 active:scale-[0.99] disabled:opacity-50 shadow-lg shadow-stone-900/10 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>جاري التحقق من الهوية...</span>
              </>
            ) : (
              <span>تسجيل الدخول للوحة التحكم</span>
            )}
          </button>
        </form>

        {/* تذييل الصفحة الفاخر والمينيمال */}
        <div className="text-center pt-2 border-t border-stone-100">
          <p className="text-[11px] font-bold text-stone-400 tracking-wide uppercase">Secure Environment &bull; Encryption Active</p>
        </div>

      </div>
    </div>
  );
}