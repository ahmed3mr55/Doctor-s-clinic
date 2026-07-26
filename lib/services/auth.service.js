// lib/services/auth.service.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
  /**
   * Verify JWT token from cookies.
   * Returns { verified: boolean, user?: decodedToken, message?: string }
   */
  async verifyToken() {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      if (!token) {
        return { verified: false, message: "No token found" };
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      return { verified: true, user: decoded };
    } catch (error) {
      return { verified: false, message: "Invalid token" };
    }
  }

  /**
   * Get current user with permissions from DB.
   * Returns { success: boolean, message?: string, user?: object, status?: number }
   * Shape matches what lib/getCurrentUser.js returns.
   */
  async getCurrentUser() {
    const auth = await this.verifyToken();

    if (!auth.verified) {
      return { success: false, message: auth.message, user: null };
    }

    const user = await prisma.user.findUnique({
      where: { id: auth.user.id },
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
                  select: { name: true },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return { success: false, message: "User not found", user: null };
    }

    if (!user.active) {
      return { success: false, message: "Account disabled", user: null };
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
        role: { id: user.role.id, name: user.role.name },
        permissions: user.role.permissions.map((item) => item.permission.name),
      },
    };
  }

  /**
   * Verify access by checking token and required permissions.
   * Returns { authorized: boolean, user?: fullUserObject, message?: string, error?: string, status?: number }
   * Shape matches what lib/auth/verifyAccess.js returns.
   */
  async verifyAccess(requiredPermissions = []) {
    const result = await this.verifyToken();

    if (!result.verified) {
      return {
        authorized: false,
        message: "Unauthorized",
        error: "Unauthorized",
        status: 401,
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: result.user.id },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true },
            },
          },
        },
      },
    });

    if (!user || !user.active) {
      return {
        authorized: false,
        message: "User disabled",
        error: "User disabled",
        status: 403,
      };
    }

    const userPermissions = user.role.permissions.map(
      (item) => item.permission.name
    );

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return {
        authorized: false,
        message: "Access denied",
        error: "Access denied",
        status: 403,
      };
    }

    return { authorized: true, user };
  }

  /**
   * Check if user has a specific permission (pure function, no DB).
   */
  hasPermission(userPermissions, permission) {
    return userPermissions.includes(permission);
  }

  /**
   * Login: verify credentials and generate JWT.
   * Returns { success: boolean, token?: string, user?: object, message?: string, status?: number }
   */
  async login(email, password) {
    if (!email || !password) {
      return { success: false, message: "Email and password are required", status: 400 };
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      return { success: false, message: "Invalid credentials", status: 401 };
    }

    if (!user.active) {
      return { success: false, message: "Account disabled", status: 403 };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { success: false, message: "Invalid credentials", status: 401 };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, roleId: user.roleId },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    return {
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      },
    };
  }

  /**
   * Generate a JWT token for a user.
   */
  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, roleId: user.roleId },
      JWT_SECRET,
      { expiresIn: "30d" }
    );
  }
}

export const authService = new AuthService();