// lib/hasPermission.js

import { getCurrentUser } from "./getCurrentUser";

export async function hasPermission(permission) {
  const currentUser = await getCurrentUser();

  if (!currentUser.success) {
    return false;
  }

  return currentUser.user.permissions.includes(permission);
}