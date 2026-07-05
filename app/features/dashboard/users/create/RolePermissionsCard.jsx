"use client";

import React from "react";
import { Shield, ShieldAlert, createIcons, ShieldCheck, CheckCircle } from "lucide-react";

export default function RolePermissionsCard({ roleData, loading }) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="h-4 bg-slate-200 animate-pulse rounded-md w-1/3" />
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-slate-100 animate-pulse rounded-md w-3/4" />
          <div className="h-3 bg-slate-100 animate-pulse rounded-md w-1/2" />
        </div>
      </div>
    );
  }

  if (!roleData) {
    return (
      <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-300 text-center flex flex-col items-center justify-center text-slate-400">
        <Shield size={28} strokeWidth={1.5} className="mb-2 text-slate-300" />
        <h4 className="text-xs font-bold">لم يتم تحديد دور بعد</h4>
        <p className="text-[10px] text-slate-400 mt-0.5">اختر دوراً طبياً من القائمة لاستعراض الصلاحيات الأمنية المرتبطة بالحساب مسبقاً.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 animate-fadeIn">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-400 block">هيكل صلاحيات الحساب الحالي للـ</span>
          <h4 className="text-sm font-black text-blue-600 mt-0.5">{roleData.name}</h4>
        </div>
        <ShieldCheck className="text-emerald-500" size={20} />
      </div>

      {roleData.permissions.length === 0 ? (
        <div className="flex items-center gap-2 p-3 bg-amber-50/50 text-amber-800 rounded-xl text-[11px] border border-amber-100">
          <ShieldAlert size={14} className="shrink-0" />
          <span>هذا الدور لا يحتوي على صلاحيات نشطة حالياً بالنظام</span>
        </div>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {roleData.permissions.map((perm) => (
            <div key={perm.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/80 flex items-start gap-2.5">
              <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold text-slate-900 block">{perm.name}</span>
                {perm.description && (
                  <span className="text-[10px] text-slate-400 font-medium block leading-relaxed">{perm.description}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}