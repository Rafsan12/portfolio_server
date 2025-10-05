import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service";
const JWT_SECRET = process.env.JWT_SECRET;
const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ message: "✅ User registered successfully", data: user, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.loginUser(email, password);
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "✅ Login successful", data: user, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "✅ Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const UserController = { createUser, loginUser, logoutUser };
