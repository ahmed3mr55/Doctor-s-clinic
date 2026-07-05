import React from "react";
import prisma from "@/lib/prisma";
import UsersTable from "@/app/features/dashboard/users/UsersTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import { auth } from "@/lib/auth";

// جلب الأدوار للفلتر
async function getRoles() {
  return await prisma.role.findMany({ select: { id: true, name: true } });
}

// دالة جلب البيانات والإحصائيات مباشرة من السيرفر
async function getUsersData(filters) {
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 10;
  const skip = (page - 1) * limit;

  // بناء شروط الفلترة لـ Prisma
  const where = {};
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
    ];
  }
  if (filters.roleId) {
    where.roleId = filters.roleId;
  }
  if (filters.status) {
    where.active = filters.status === "active";
  }

  // جلب البيانات والإحصائيات بالتوازي (Parallel Fetching) لسرعة الأداء
  const [users, totalUsersCount, activeCount, disabledCount, totalRolesCount] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: filters.dateSort === "asc" ? "asc" : "desc" },
      include: {
        role: {
          include: {
            _count: { select: { permissions: true } }
          }
        }
      }
    }),
    prisma.user.count({ where }), // الإجمالي بناءً على الفلتر الحالي، أو شيل where لو عايزه إجمالي الداتابيز كلها
    prisma.user.count({ where: { active: true } }),
    prisma.user.count({ where: { active: false } }),
    prisma.role.count()
  ]);

  return {
    users,
    stats: {
      totalUsers: totalUsersCount,
      activeUsers: activeCount,
      disabledUsers: disabledCount,
      totalRoles: totalRolesCount,
    },
    pagination: {
      total: totalUsersCount,
      page,
      limit,
      totalPages: Math.ceil(totalUsersCount / limit) || 1,
    }
  };
}

export default async function UsersManagementPage({ searchParams }) {
  const authUser = await auth();
  if (!authUser.can("users.read")) return null;

  const resolvedParams = await searchParams;
  
  const filters = {
    search: resolvedParams.search || "",
    roleId: resolvedParams.roleId || "",
    status: resolvedParams.status || "",
    page: resolvedParams.page || "1",
    limit: resolvedParams.limit || "10",
    dateSort: resolvedParams.dateSort || "desc"
  };

  const roles = await getRoles();
  const serverData = await getUsersData(filters);

  return (
    <div className="min-h-screen mt-14 bg-slate-50/50 p-4 lg:p-8 font-cairo" dir="rtl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight">إدارة الكادر الطبي والمستخدمين</h1>
          <p className="text-sm text-slate-500 mt-1">التحكم في حسابات الأطباء، موظفي الاستقبال، الصلاحيات، ومراقبة نشاط الحسابات الكلية.</p>
        </div>
        {authUser.can("users.create") && (
        <div>
          <Link
            href="/dashboard/users/create"
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-stone-900 text-white rounded-2xl font-bold hover:bg-orange-500 shadow-xl shadow-stone-200 transition-all transform hover:-translate-y-1"
          >
            <Plus size={20} />
            <span>إضافة مستخدم جديد</span>
          </Link>
        </div>
        )}
      </div>

      {/* نمرر البيانات القادمة من السيرفر والفلاتر الحالية للكومبوننت */}
      <UsersTable
        roles={roles}
        serverData={serverData}
        currentFilters={filters}
        canUpdate={authUser.can("users.update")}
      />
    </div>
  );
}
