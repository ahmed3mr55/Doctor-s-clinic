"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // مراقبة التمرير لتغيير نمط الناف بار
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // منع التمرير في الصفحة عند فتح قائمة الجوال
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "عن العيادة", href: "/about" },
    { name: "الخدمات", href: "/services" },
    { name: "المقالات", href: "/blog" },
    { name: "تواصل معنا", href: "/contact-us" },
  ];

  const handleClick = async () => {
    await new Promise((r) => setTimeout(r, 2000));
    router.push("/about");
  };

  return (
    <nav
      dir="rtl"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-stone-100"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* الشعار (Logo) */}
          <Link
            href="/"
            className="relative z-50 group flex items-center gap-1"
          >
            <span className="text-3xl font-black tracking-tighter text-stone-900 transition-colors">
              Vera
            </span>
            <span className="text-3xl font-light italic text-amber-600 transition-colors">
              Clinic
            </span>
          </Link>

          {/* روابط سطح المكتب (Desktop Links) */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm lg:text-base font-bold transition-all relative group py-2 ${
                  scrolled
                    ? "text-stone-600 hover:text-amber-600"
                    : "text-stone-800 hover:text-amber-600"
                }`}
              >
                {link.name}
                {/* خط سفلي متحرك عند التحويم */}
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}

            <Link
              href="/booking"
              className="bg-stone-900 hover:bg-amber-600 text-white px-8 py-3.5 rounded-full text-sm font-bold transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-amber-600/30"
            >
              احجز استشارتك
            </Link>
          </div>

          {/* زر القائمة للجوال (Mobile Toggle) */}
          <button
            className="md:hidden relative z-50 p-2 text-stone-900 bg-stone-100/50 hover:bg-stone-200 rounded-full transition-colors backdrop-blur-sm"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* قائمة الجوال (Mobile Menu) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* خلفية ضبابية للقائمة */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm md:hidden z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* محتوى القائمة */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl shadow-2xl border border-stone-100 md:hidden z-50 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between py-4 border-b border-stone-50 text-lg font-bold text-stone-800 hover:text-amber-600 hover:pl-2 transition-all"
                    >
                      <span>{link.name}</span>
                      <div className="w-2 h-2 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4"
                >
                  <Link
                    href="/booking"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center w-full bg-stone-900 hover:bg-amber-600 text-white py-4 rounded-full font-bold text-lg shadow-lg transition-colors"
                  >
                    احجز استشارتك الآن
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
