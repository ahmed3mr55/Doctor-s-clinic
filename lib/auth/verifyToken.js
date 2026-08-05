import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export async function verifyToken() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    console.log("TOKEN:", token);
    
    if (!token) {
      return {
        verified: false,
        message: "No token found",
      };
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    return {
      verified: true,

      user: decoded,
    };
  } catch (error) {
    return {
      verified: false,

      message: "Invalid token",
    };
  }
}
