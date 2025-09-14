import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { ACCESS_TOKEN_SECRET } from "..";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { id: string };

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ userId: user._id.toString(), email: user.email });
  } catch (err: any) {
    console.error("getCurrentUser error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};
