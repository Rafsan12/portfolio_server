import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUser(req.body);
    res
      .status(201)
      .json({ message: "✅ User registered successfully", data: result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.loginUser(email, password);
    res.status(200).json({ message: "✅ Login successful", data: user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const UserController = { createUser, loginUser };
