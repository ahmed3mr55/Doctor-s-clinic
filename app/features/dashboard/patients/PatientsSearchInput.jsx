"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function PatientsSearchInput({ currentSearch }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search.trim()) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="w-full md:max-w-md relative">
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
      <input
        type="text"
        placeholder="ابحث باسم المريض أو رقم الهاتف..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-4 pr-11 py-3 bg-white border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition-all"
      />
    </div>
  );
}