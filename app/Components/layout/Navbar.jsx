"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// الروابط الفعلية للصفحات المنفصلة
const NAV_LINKS = [
  { name: "الرئيسية", href: "/" },
  { name: "عن العيادة", href: "/about" },
  { name: "الخدمات", href: "/services" },
  { name: "المقالات", href: "/blog" },
  { name: "تواصل معنا", href: "/contact-us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); // لمعرفة المسار الحالي وتحديد الرابط النشط

  // 1. مراقبة التمرير لتغيير خلفية الناف بار (Sticky Effect)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. منع التمرير في الصفحة الخلفية عند فتح قائمة الجوال
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header
      dir="rtl"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/98 shadow-[0_2px_20px_rgba(0,0,0,0.04)] py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex justify-between items-center">
          {/* الشعار */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
            aria-label="الرئيسية"
          >
            <span className="text-2xl lg:text-3xl font-black tracking-tighter text-stone-950">
              Tan
            </span>
            <span className="text-2xl lg:text-3xl font-medium italic text-amber-600">
              Clinic
            </span>
          </Link>

          {/* روابط سطح المكتب (Desktop Navigation) */}
          <ul className="hidden md:flex items-center gap-2 lg:gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name} className="relative">
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm lg:text-base font-semibold transition-colors duration-200 z-10 block ${
                      isActive
                        ? "text-amber-700"
                        : isScrolled
                        ? "text-stone-600 hover:text-stone-900"
                        : "text-stone-800 hover:text-stone-950"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                  {/* مؤشر نشط متحرك (Framer Motion LayoutId) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-amber-50/80 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* زر الحجز لسطح المكتب */}
          <div className="hidden md:block">
            <Link
              href="/booking"
              className="bg-stone-950 hover:bg-stone-800 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            >
              احجز استشارتك
            </Link>
          </div>

          {/* زر قائمة الجوال (Mobile Menu Toggle) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 p-2 text-stone-900 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-expanded={isOpen}
            aria-label="تبديل القائمة"
          >
            {isOpen ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
          </button>
        </div>
      </nav>

      {/* قائمة الجوال (Mobile Menu Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-white border-b border-stone-100 shadow-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-2 max-h-[calc(100vh-80px)] overflow-y-auto">
              <ul className="flex flex-col space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block w-full px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                          isActive
                            ? "bg-amber-50 text-amber-700"
                            : "text-stone-700 hover:bg-stone-50"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="pt-4 mt-2 border-t border-stone-100 pb-4">
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center w-full bg-stone-950 text-white py-3.5 rounded-full font-bold text-sm shadow-md active:scale-[0.98] transition-transform"
                >
                  احجز استشارتك الآن
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}