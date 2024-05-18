import { NextFunction, Request, Response } from "express";
import User from "../../models/user.model";
import jwt from "jsonwebtoken";

export const apiRegister = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const newUser = new User({ name, email, password });
  await newUser.save();
  const token = jwt.sign(
    { _id: newUser._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "30d" }
  );
  res.json({ token });
};

export const apiLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  const AuthSession = {
    token: token,
    user: user
};
  res.cookie("authcookie", token, { maxAge: 900000, httpOnly: true });
  res.status(200).send(AuthSession)
};

export const apiLogout = (req: Request, res: Response) => {
  res.clearCookie("authcookie");
  res.status(200).json({ message: "Logged out successfully" });
};

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.authcookie;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    next();
    res.status(200).json(decoded);
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
