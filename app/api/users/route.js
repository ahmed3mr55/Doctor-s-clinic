// app/api/users/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";
import { createUserSchema } from "@/lib/validations/createUser.validation";


// create a new user
export async function POST(req) {
  try {
    // 1. التحقق من الصلاحيات والإذن الإداري الصارم
    // POST creates a user account, so it requires users.create.
    const accessControl = await verifyAccess(["users.create"]);
    if (!accessControl.authorized) {
      return accessDeniedResponse(accessControl);
    }

    const body = await req.json();

    // 2. التحقق من المدخلات باستخدام Joi Schema
    const { error, value } = createUserSchema.validate(body);
    if (error) {
      return NextResponse.json({ success: false, error: error.details[0].message }, { status: 400 });
    }

    // 3. التحقق من فرائد الحساب وعدم تكرار البريد الإلكتروني
    const emailExists = await prisma.user.findUnique({
      where: { email: value.email }
    });
    if (emailExists) {
      return NextResponse.json({ success: false, error: "البريد الإلكتروني مسجل لمستخدم آخر بالفعل بالنظام" }, { status: 400 });
    }

    // 4. تشفير كلمة المرور حمائياً عبر Bcrypt
    const hashedPassword = await bcrypt.hash(value.password, 12);

    // 5. حفظ المستخدم في قاعدة البيانات عبر Prisma
    const newUser = await prisma.user.create({
      data: {
        name: value.name,
        email: value.email,
        password: hashedPassword,
        phone: value.phone || null,
        active: value.active !== undefined ? value.active : true,
        roleId: value.roleId,
        specialization: value.specialization || null,
        avatar: value.avatar || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "تم تسجيل وإنشاء حساب الحساب الطبي الموظف بنجاح",
      user: newUser 
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating user profile:", error);
    return NextResponse.json({ success: false, error: "حدث خطأ داخلي غير متوقع في السيرفر" }, { status: 500 });
  }
}


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // GET lists users and their role data, so it requires users.read.
    const auth = await verifyAccess(["users.read"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    // معايير الترقيم والصفحات
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // معايير البحث والفلترة
    const search = searchParams.get("search") || "";
    const roleId = searchParams.get("roleId") || "";
    const status = searchParams.get("status") || ""; // active , disabled
    const dateSort = searchParams.get("dateSort") || "desc"; // asc, desc

    // بناء فلتر الإستعلام الديناميكي لـ Prisma
    let whereClause = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    if (roleId) {
      whereClause.roleId = roleId;
    }

    if (status) {
      whereClause.active = status === "active";
    }

    // جلب البيانات والإحصائيات بالتوازي لتسريع الاستجابة
    const [users, totalCount, totalRoles, activeCount, disabledCount] = await prisma.$transaction([
      prisma.user.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          role: {
            select: {
              name: true,
              _count: {
                select: { permissions: true }
              }
            }
          }
        },
        orderBy: { createdAt: dateSort },
      }),
      prisma.user.count({ where: whereClause }),
      prisma.role.count(),
      prisma.user.count({ where: { active: true } }),
      prisma.user.count({ where: { active: false } }),
    ]);

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
      stats: {
        totalUsers: await prisma.user.count(), // العدد الكلي الفعلي للنظام بدون فلاتر
        activeUsers: activeCount,
        disabledUsers: disabledCount,
        totalRoles: totalRoles,
      }
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, error: "حدث خطأ داخلي في السيرفر" }, { status: 500 });
  }
}
