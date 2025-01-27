import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

export const generateToken = (
  payload: JwtPayload | string,
  expiresIn: string = "1h"
): string => {
  const options: SignOptions = { expiresIn }; 
  return jwt.sign(payload, JWT_SECRET as Secret, options);
};