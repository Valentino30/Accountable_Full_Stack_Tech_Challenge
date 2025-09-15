import { Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth";

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(userId).lean(); // lean() is faster if you don't need mongoose methods
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ userId: user._id.toString(), email: user.email });
  } catch (err: any) {
    console.error("getCurrentUser error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
