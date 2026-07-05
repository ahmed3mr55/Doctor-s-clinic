import React from "react";
import UserForm from "@/app/features/dashboard/users/create/UserForm";
import { UserPlus } from "lucide-react";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "منظومة إدارة العيادة | إنشاء حساب جديد",
  description: "لوحة تحكم إلحاق الكادر الطبي والموظفين الجدد بالعيادة وضبط الأدوار"
};

export const dynamic = "force-dynamic";

export default async function CreateUserPage() {
  const authUser = await auth();
  if (!authUser.can("users.create")) return null;

  return (
    <div className="min-h-screen bg-slate-50/60 p-4 lg:p-8 font-cairo" dir="rtl">
      
      {/* الترويسة العليا للمسار الإداري */}
      <div className="mb-8 flex items-center gap-3.5 border-b border-slate-200/80 pb-5">
        <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-md shadow-blue-600/10">
          <UserPlus size={24} />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-950 tracking-tight">إدراج وتوظيف مستخدم جديد</h1>
          <p className="text-xs text-slate-500 mt-0.5">قم بملء البيانات الطبية وتحديد الدور الإداري لتهيئة مصفوفة الأمان الفورية للحساب.</p>
        </div>
      </div>

      {/* استدعاء نموذج الإنشاء التفاعلي */}
      <UserForm />
    </div>
  );
}
