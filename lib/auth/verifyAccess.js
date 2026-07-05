import { verifyToken } from "./verifyToken";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

function denied(message) {
  const status = message === "Unauthorized" ? 401 : 403;

  return {
    authorized: false,
    message,
    error: message,
    status,
  };
}

export function accessDeniedResponse(auth) {
  return NextResponse.json(
    {
      success: false,
      error: auth.error || auth.message,
    },
    {
      status: auth.status || 403,
    },
  );
}

export async function verifyAccess(requiredPermissions = []) {
  const result = await verifyToken();
  console.log("verifyAccess result:", result);

  if (!result.verified) {
    return denied("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: result.user.id,
    },

    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!user || !user.active) {
    return denied("User disabled");
  }

  const userPermissions = user.role.permissions.map(
    (item) => item.permission.name,
  );

  const hasPermission = requiredPermissions.every((permission) =>
    userPermissions.includes(permission),
  );

  if (!hasPermission) {
    return denied("Access denied");
  }

  return {
    authorized: true,

    user,
  };
}
