"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

const VISIT_TYPES = [
  { key: "ALL", label: "كل الزيارات" },
  { key: "CONSULTATION", label: "كشف / استشارة" },
  { key: "FOLLOW_UP", label: "متابعة" },
  { key: "LASER", label: "ليزر" },
  { key: "BOTOX", label: "بوتوكس" },
  { key: "FILLER", label: "فيلر" },
  { key: "SURGERY", label: "جراحة تجميلية" },
  { key: "SKINCARE", label: "عناية بالبشرة" }
];

export default function VisitsFilters({ currentSearch, currentType }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(currentSearch);
  // State محلي لإجبار الأزرار على التفاعل الفوري دون انتظار السيرفر
  const [localType, setLocalType] = useState(currentType);

  // إذا تغير الـ نوع من برا (مثلاً تصفير الفلاتر)، نحدث الـ State المحلي
  useEffect(() => {
    setLocalType(currentType);
  }, [currentType]);

  const handleTypeChange = (typeKey) => {
    setLocalType(typeKey); // تفعيل الزر بصرياً فوراً بدون أي تأخير!
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("visitType", typeKey);
    params.set("page", "1");
    
    // نطلب من Next.js الانتقال للرابط الجديد خلف الكواليس
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search.trim()) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      params.set("page", "1"); 
      router.push(`?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="bg-white p-5 rounded-[2rem] border border-stone-100 shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:max-w-md relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input
            type="text"
            placeholder="ابحث باسم المريض، كود الملف، أو رقم الهاتف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-11 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 self-start md:self-auto text-xs font-bold text-stone-400 uppercase tracking-wider">
          <SlidersHorizontal size={14} />
          <span>فلاتر سريعة</span>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
        {VISIT_TYPES.map((type) => (
          <button
            key={type.key}
            type="button"
            onClick={() => handleTypeChange(type.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
              localType === type.key
                ? "bg-stone-900 text-white border-stone-900 shadow-md shadow-stone-900/10"
                : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}