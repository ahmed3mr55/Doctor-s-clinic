import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";

// جلب تفاصيل مستخدم واحد مع صلاحياته بالكامل
export async function GET(req, { params }) {
  try {
    // GET reads a user and permission metadata, so it requires users.read.
    const auth = await verifyAccess(["users.read"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;

    const [user, allRoles, allPermissions] = await prisma.$transaction([
      prisma.user.findUnique({
        where: { id },
        include: {
          role: {
            include: {
              permissions: { include: { permission: true } }
            }
          }
        }
      }),
      prisma.role.findMany({
        include: { permissions: { include: { permission: true } } }
      }),
      prisma.permission.findMany()
    ]);

    if (!user) {
      return NextResponse.json({ success: false, error: "المستخدم غير موجود" }, { status: 404 });
    }

    const { password, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      user: safeUser,
      allRoles,
      allPermissions
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// delete user
export async function DELETE(req, { params }) {
  try {
    // DELETE removes a user account, so it requires users.delete.
    const auth = await verifyAccess(["users.delete"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ success: false, error: "المستخدم غير موجود مسبقاً" }, { status: 404 });
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "تم حذف المستخدم بنجاح" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "لا يمكن حذف المستخدم لارتباطه بسجلات عيادة نشطة" }, { status: 500 });
  }
}



// 2. تحديث البيانات الأساسية، تغيير الدور، وتخصيص صلاحيات الدور الافتراضية
export async function PATCH(req, { params }) {
  try {
    // PATCH updates user details and role assignments, so it requires users.update.
    const auth = await verifyAccess(["users.update"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;
    const body = await req.json();
    
    const { name, email, phone, active, roleId, targetPermissions } = body;

    // التأكد من وجود المستخدم
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return NextResponse.json({ success: false, error: "المستخدم غير موجود" }, { status: 404 });
    }

    // تحديث بيانات المستخدم وتعديل دوره الوظيفي
    // إذا كنت ترغب في دعم تعديل الصلاحيات على مستوى الدور نفسه للمجموعة:
    if (targetPermissions && roleId) {
      // تحديث صلاحيات الـ Role المربوطة بهذا المستخدم لتسري عليه وعلى المجموعة،
      // أو تحديث الحساب بشكل مباشر. هنا نقوم بتحديث الحساب والدور المنسوب له:
      await prisma.$transaction([
        prisma.user.update({
          where: { id },
          data: {
            name,
            email,
            phone,
            active,
            roleId
          }
        }),
        // حذف الصلاحيات القديمة للدور وإعادة صياغتها إذا أرسل الأدمن تعديلاً مخصصاً للدور
        prisma.rolePermission.deleteMany({ where: { roleId } }),
        prisma.rolePermission.createMany({
          data: targetPermissions.map(permId => ({
            roleId: roleId,
            permissionId: permId
          }))
        })
      ]);
    } else {
      // تحديث البيانات الأساسية فقط
      await prisma.user.update({
        where: { id },
        data: { name, email, phone, active, roleId }
      });
    }

    return NextResponse.json({ success: true, message: "تم تحديث بيانات الحساب والصلاحيات بنجاح" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "فشل تحديث البيانات، تأكد من عدم تكرار البريد الإلكتروني" }, { status: 500 });
  }
}
