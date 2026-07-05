import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET;


export function generateToken(user) {

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
    },
    JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

}