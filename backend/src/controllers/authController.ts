import { Request, Response } from "express";
import zxcvbn from "zxcvbn";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "..";

// -------------------------
// REGISTER USER
// -------------------------
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

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    // Generate tokens
    const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    res.json({ accessToken, refreshToken });
  } catch (err: any) {
    if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(400).json({ error: "Email is already registered" });
    }
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// -------------------------
// LOGIN USER
// -------------------------
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  // Generate tokens
  const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

  res.json({ accessToken, refreshToken });
};

// -------------------------
// REFRESH TOKEN
// -------------------------
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Refresh token missing" });
    }

    // Verify refresh token
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as { id: string };

    // Check if user exists
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Issue new access token
    const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    res.json({ accessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};
