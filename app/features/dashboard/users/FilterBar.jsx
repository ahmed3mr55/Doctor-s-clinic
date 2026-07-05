"use client";

import React from "react";
import { Search, SlidersHorizontal, CalendarDays } from "lucide-react";

export default function FilterBar({ roles, filters, onFilterChange }) {
  const handleInputChange = (e) => {
    onFilterChange(e.target.name, e.target.value);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* حقل البحث الذكي */}
        <div className="md:col-span-1 relative">
          <label className="block text-xs font-bold text-slate-600 mb-1.5">البحث السريع</label>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleInputChange}
              placeholder="ابحث بالاسم، البريد أو الهاتف..."
              className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* فلترة حسب الدور الوظيفي */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">الدور الوظيفي</label>
          <select
            name="roleId"
            value={filters.roleId}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer font-medium text-slate-700"
          >
            <option value="">جميع الأدوار</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>

        {/* فلترة حسب حالة الحساب */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">حالة الحساب</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer font-medium text-slate-700"
          >
            <option value="">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="disabled">معطل</option>
          </select>
        </div>

        {/* الترتيب الزمني */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">ترتيب التاريخ</label>
          <select
            name="dateSort"
            value={filters.dateSort}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer font-medium text-slate-700"
          >
            <option value="desc">الأحدث تسجيلاً أولاً</option>
            <option value="asc">الأقدم تسجيلاً أولاً</option>
          </select>
        </div>

      </div>
    </div>
  );
}