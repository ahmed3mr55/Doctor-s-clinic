// lib/auth.js
import { getCurrentUser } from "./getCurrentUser";

export async function auth() {
  const currentUser = await getCurrentUser();

  if (!currentUser.success) {
    return null;
  }

  return {
    user: currentUser.user,

    can(permission) {
      return currentUser.user.permissions.includes(permission);
    },

    canAny(permissions) {
      return permissions.some((permission) =>
        currentUser.user.permissions.includes(permission)
      );
    },

    canAll(permissions) {
      return permissions.every((permission) =>
        currentUser.user.permissions.includes(permission)
      );
    },
  };
}