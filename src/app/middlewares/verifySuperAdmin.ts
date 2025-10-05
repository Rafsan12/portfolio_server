import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const verifySuperAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.access_token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
    };

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role !== "SUPER_ADMIN") {
      return res
        .status(403)
        .json({ message: "Access denied. Not a Super Admin." });
    }

    (req as any).user = user;

    next();
  } catch (error) {
    console.error("SuperAdmin verification error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
