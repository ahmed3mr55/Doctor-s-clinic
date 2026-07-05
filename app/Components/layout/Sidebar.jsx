"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  UserRound, 
  CalendarDays, 
  Stethoscope, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Users
} from "lucide-react";

const menuItems = [
  { name: "لوحة التحكم", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
  { name: "المواعيد", icon: <CalendarDays size={20} />, href: "/dashboard/booking-requests" },
  { name: "المستخدمين", icon: <Users size={20} />, href: "/dashboard/users" },
  { name: "المرضى", icon: <UserRound size={20} />, href: "/dashboard/patients" },
  { name: "الزيارات الطبية", icon: <Stethoscope size={20} />, href: "/dashboard/visits" },
  { name: "المقالات", icon: <FileText size={20} />, href: "/dashboard/blog" },
  { name: "الإعدادات", icon: <Settings size={20} />, href: "/dashboard/settings" },
];

const Sidebar = ({ user }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* زر الجوال - يظهر فقط في الشاشات الصغيرة */}
      <div className="lg:hidden fixed top-4 right-4 z-[60]">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-3 bg-stone-900 text-white rounded-xl shadow-lg"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* السايدبار الرئيسي:
         - في سطح المكتب: w-72 (عرض ثابت) و h-screen (طول الشاشة)
         - في الجوال: يتحول لـ Fixed Drawer ليغطي الشاشة عند الفتح
      */}
      <aside
        dir="rtl"
        className={`
          bg-stone-950 text-stone-300 border-l border-stone-800/50 flex-shrink-0
          transition-all duration-300 z-50
          /* إعدادات الجوال */
          fixed inset-y-0 right-0 w-72 transform ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
          /* إعدادات سطح المكتب */
          lg:relative lg:translate-x-0 lg:w-72 lg:h-screen lg:sticky lg:top-0
        `}
      >
        <div className="flex flex-col h-full p-6">
          
          {/* الشعار */}
          <div className="mb-10 px-4">
            <Link prefetch={false} href="/dashboard" className="flex items-center gap-2">
              <span className="text-2xl font-black text-white tracking-tighter">
                Tan<span className="text-amber-500">.</span>
              </span>
              <span className="text-[10px] bg-stone-800 text-stone-400 px-2 py-1 rounded-md uppercase font-bold">
                Admin
              </span>
            </Link>
          </div>

          {/* معلومات المستخدم */}
          <div className="mb-8 p-4 bg-stone-900/40 rounded-2xl border border-stone-800/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20 flex-shrink-0">
              <UserRound size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[9px] text-stone-500 uppercase tracking-wider">{user.role.name}</p>
            </div>
          </div>

          {/* الروابط */}
          <nav className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  prefetch={false}
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                    isActive 
                    ? "bg-amber-600 text-white shadow-md shadow-amber-900/20" 
                    : "hover:bg-stone-900 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${isActive ? "text-white" : "text-stone-500 group-hover:text-amber-500"}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-bold">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* الخروج */}
          <div className="mt-auto pt-4 border-t border-stone-800/50">
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-stone-500 hover:bg-red-500/10 hover:text-red-500 transition-all font-bold text-sm">
              <LogOut size={20} />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay للجوال فقط */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;