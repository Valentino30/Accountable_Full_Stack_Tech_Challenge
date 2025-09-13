import { Request, Response } from "express";
import zxcvbn from "zxcvbn";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { JWT_SECRET } from "..";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    // Check password strength
    const strength = zxcvbn(password);
    if (strength.score < 3) {
      return res.status(400).json({
        error: "Password is too weak",
        feedback: strength.feedback,
      });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    res.json({ id: user._id, email: user.email });
  } catch (err: any) {
    if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(400).json({ error: "Email is already registered" });
    }
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
};
