import React from "react";
import { ClipboardList, Clock, CheckCircle2, XCircle } from "lucide-react";

export default function BookingRequestsStats({ stats }) {
  // الحالات الافتراضية لحماية الواجهة في حال عدم توفر بيانات
  const {
    total = 0,
    pending = 0,
    approved = 0,
    rejected = 0
  } = stats || {};

  // مصفوفة بناء الكروت لتقليل تكرار الكود ورفع كفاءة التعديل
  const statCards = [
    {
      label: "إجمالي طلبات الحجز",
      value: total,
      icon: ClipboardList,
      bgColor: "bg-stone-50",
      textColor: "text-stone-900",
      iconColor: "text-stone-700 bg-stone-200/60"
    },
    {
      label: "طلبات قيد الانتظار",
      value: pending,
      icon: Clock,
      bgColor: "bg-amber-50/60",
      textColor: "text-amber-700",
      iconColor: "text-amber-600 bg-amber-100/70"
    },
    {
      label: "طلبات مقبولة ومحولة",
      value: approved,
      icon: CheckCircle2,
      bgColor: "bg-emerald-50/60",
      textColor: "text-emerald-700",
      iconColor: "text-emerald-600 bg-emerald-100/70"
    },
    {
      label: "طلبات مرفوضة",
      value: rejected,
      icon: XCircle,
      bgColor: "bg-rose-50/60",
      textColor: "text-rose-700",
      iconColor: "text-rose-600 bg-rose-100/70"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full font-cairo" dir="rtl">
      {statCards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className={`p-6 rounded-[2rem] border border-stone-200/60 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4`}
          >
            <div className="space-y-1 min-w-0">
              <p className="text-xl lg:text-2xl font-black text-stone-900 tracking-tight">
                {card.value.toLocaleString("ar-EG")}
              </p>
              <p className="text-xs font-bold text-stone-400 truncate">
                {card.label}
              </p>
            </div>
            
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${card.iconColor}`}>
              <IconComponent size={22} className="stroke-[2.5]" />
            </div>
          </div>
        );
      })}
    </div>
  );
}