// lib/getCurrentUser.js

import prisma from "@/lib/prisma";
import { verifyToken } from "./auth/verifyToken";

export async function getCurrentUser() {
  const auth = await verifyToken();

  if (!auth.verified) {
    return {
      success: false,
      message: auth.message,
      user: null,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: auth.user.id,
    },

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      specialization: true,
      active: true,

      role: {
        select: {
          id: true,
          name: true,

          permissions: {
            select: {
              permission: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found",
      user: null,
    };
  }

  if (!user.active) {
    return {
      success: false,
      message: "Account disabled",
      user: null,
    };
  }

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      specialization: user.specialization,

      role: {
        id: user.role.id,
        name: user.role.name,
      },

      permissions: user.role.permissions.map(
        (item) => item.permission.name,
      ),
    },
  };
}