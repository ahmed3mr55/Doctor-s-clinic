import React from 'react';

// مكون أساسي للنبض (الوميض) الرمادي
const SkeletonPulse = ({ className }) => (
  <div className={`animate-pulse bg-stone-200 rounded-2xl ${className}`} />
);

export default function Loading() {
  return (
    <div className="bg-white min-h-screen font-cairo" dir="rtl">
      
      {/* 1. Navbar Skeleton */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md py-4 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <SkeletonPulse className="w-32 h-8" /> {/* Logo Placeholder */}
          <div className="hidden md:flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonPulse key={i} className="w-16 h-4" />
            ))}
          </div>
          <SkeletonPulse className="w-36 h-10 rounded-full" /> {/* Button Placeholder */}
        </div>
      </nav>

      {/* 2. Hero Section Skeleton */}
      <section className="relative pt-32 pb-20 px-6 bg-[#FCFBFA]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <SkeletonPulse className="w-40 h-6 rounded-full" /> {/* Tag */}
            <SkeletonPulse className="w-full h-16 lg:h-24" />    {/* Title Line 1 */}
            <SkeletonPulse className="w-3/4 h-16 lg:h-24" />    {/* Title Line 2 */}
            <div className="space-y-3">
              <SkeletonPulse className="w-full h-4" />          {/* Desc Line 1 */}
              <SkeletonPulse className="w-5/6 h-4" />          {/* Desc Line 2 */}
            </div>
            <div className="flex gap-4 pt-4">
              <SkeletonPulse className="w-40 h-14 rounded-full" />
              <SkeletonPulse className="w-40 h-14 rounded-full" />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <SkeletonPulse className="w-full aspect-[4/3] rounded-[3rem]" /> {/* Hero Image */}
          </div>
        </div>
      </section>

      {/* 3. Services List Skeleton */}
      <section className="py-10 space-y-20">
        {[1, 2].map((item, idx) => (
          <div key={item} className={`max-w-7xl mx-auto px-6 flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
            {/* Image Placeholder */}
            <div className="w-full lg:w-1/3">
              <SkeletonPulse className="w-full aspect-square rounded-[2rem]" />
            </div>
            {/* Content Placeholder */}
            <div className="w-full lg:w-2/3 space-y-6">
              <SkeletonPulse className="w-24 h-4" />
              <SkeletonPulse className="w-1/2 h-10" />
              <div className="space-y-3">
                <SkeletonPulse className="w-full h-4" />
                <SkeletonPulse className="w-full h-4" />
                <SkeletonPulse className="w-2/3 h-4" />
              </div>
              <div className="flex gap-4 pt-4">
                {[1, 2, 3].map(i => <SkeletonPulse key={i} className="w-20 h-6 rounded-md" />)}
              </div>
              <SkeletonPulse className="w-32 h-10 rounded-full" />
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}