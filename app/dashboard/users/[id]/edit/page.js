import React from "react";
import EditUserForm from "@/app/features/dashboard/users/edit/EditUserForm";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function EditUserPage({ params }) {
  const authUser = await auth();
  if (!authUser.can("users.update")) return null;

  const { id } = await params;

  return (
    <div className="min-h-screen mt-5 bg-slate-50/60 p-4 lg:p-8 font-cairo" dir="rtl">
      <EditUserForm
        userId={id}
        canDelete={authUser.can("users.delete")}
        canManageRoles={authUser.can("roles.manage")}
        canManagePermissions={authUser.can("permissions.manage")}
      />
    </div>
  );
}
