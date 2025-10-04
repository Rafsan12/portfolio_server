import { Request, Response } from "express";
import { prisma } from "../../config/db";

export const verifySuperAdmin = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) return res.status(401).json({ message: "User not found" });
  if (user.role !== "SUPER_ADMIN")
    return res.status(403).json({ message: "Access denied" });
};
