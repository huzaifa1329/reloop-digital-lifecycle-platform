import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { authFresh } from "../middleware/auth.js";
import { sendMail } from "../config/mail.js";

const router = Router();
const publicUser = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role, status: u.status, emailVerified: u.emailVerified, businessName: u.businessName, location: u.location, categories: u.categories, ratingAverage: u.ratingAverage, reviewCount: u.reviewCount, verificationStatus: u.verificationStatus, preferences: u.preferences, availability: u.availability, createdAt: u.createdAt });
const roleLabel = (role) => role === "repair_partner" ? "repair partner" : role;
const signToken = (user) => jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
const code = () => String(Math.floor(100000 + Math.random() * 900000));

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role = "customer", businessName, location, categories = [] } = req.body;
    if (!name?.trim() || !email?.trim() || !password) return res.status(400).json({ message: "Name, email and password are required." });
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." });
    if (!["customer", "repair_partner"].includes(role)) return res.status(400).json({ message: "Invalid account role." });
    const normalizedEmail = email.toLowerCase().trim();
    if (await User.findOne({ email: normalizedEmail })) return res.status(409).json({ message: "An account with this email already exists." });
    const verificationCode = code();
    const user = await User.create({ name: name.trim(), email: normalizedEmail, password: await bcrypt.hash(password, 12), role, businessName, location, categories, verificationCode, verificationExpires: new Date(Date.now() + 10 * 60 * 1000), emailVerified: false, verificationStatus: role === "repair_partner" ? "Pending" : "Verified" });
    await sendMail({ to: user.email, subject: "Your ReLoop verification code", text: `Your ReLoop verification code is ${verificationCode}. It expires in 10 minutes.` });
    res.status(201).json({ message: "Account created. Check your email for the verification code.", pendingVerification: true, user: publicUser(user) });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post("/verify-email", async (req, res) => {
  try {
    const { email, code: inputCode } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "Account not found." });
    if (user.emailVerified) return res.json({ message: "Email already verified." });
    if (!inputCode || user.verificationCode !== inputCode || !user.verificationExpires || user.verificationExpires < new Date()) return res.status(400).json({ message: "Invalid or expired verification code." });
    user.emailVerified = true; user.verificationCode = undefined; user.verificationExpires = undefined; await user.save();
    const token = signToken(user);
    res.json({ token, user: publicUser(user) });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post("/resend-verification", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email?.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "Account not found." });
    if (user.emailVerified) return res.json({ message: "Email is already verified." });
    user.verificationCode = code(); user.verificationExpires = new Date(Date.now() + 10 * 60 * 1000); await user.save();
    await sendMail({ to: user.email, subject: "Your new ReLoop verification code", text: `Your new ReLoop verification code is ${user.verificationCode}. It expires in 10 minutes.` });
    res.json({ message: "A new verification code has been sent." });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email?.trim() || !password || !role) return res.status(400).json({ message: "Email, password and role are required." });
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: `No ${roleLabel(role)} account is registered with this email.` });
    if (user.role !== role) return res.status(403).json({ message: `This email is registered as a ${roleLabel(user.role)}, not a ${roleLabel(role)}.` });
    if (user.status === "Suspended") return res.status(403).json({ message: "This account has been suspended." });
    if (!(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Incorrect password." });
    if (!user.emailVerified) return res.status(403).json({ message: "Please verify your email before signing in.", needsVerification: true, email: user.email });
    const token = signToken(user); res.json({ token, user: publicUser(user) });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email?.toLowerCase().trim() });
    if (!user || user.role !== req.body.role) return res.status(404).json({ message: `No ${roleLabel(req.body.role)} account is registered with this email.` });
    user.resetCode = code(); user.resetExpires = new Date(Date.now() + 10 * 60 * 1000); await user.save();
    await sendMail({ to: user.email, subject: "ReLoop password reset code", text: `Your ReLoop password reset code is ${user.resetCode}. It expires in 10 minutes.` });
    res.json({ message: "A password reset code has been sent to your email." });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email, role, code: inputCode, password } = req.body;
    if (!password || password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." });
    const user = await User.findOne({ email: email?.toLowerCase().trim(), role });
    if (!user || user.resetCode !== inputCode || !user.resetExpires || user.resetExpires < new Date()) return res.status(400).json({ message: "Invalid or expired reset code." });
    user.password = await bcrypt.hash(password, 12); user.resetCode = undefined; user.resetExpires = undefined; await user.save();
    await sendMail({ to: user.email, subject: "ReLoop password changed", text: "Your ReLoop password has been changed successfully. If you did not request this, contact the platform administrator." });
    res.json({ message: "Password changed successfully." });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.get("/me", authFresh, async (req, res) => res.json({ user: publicUser(req.dbUser) }));
router.patch("/profile", authFresh, async (req,res)=>{const allowed={}; if(req.body.name) allowed.name=req.body.name.trim(); if(req.body.businessName!==undefined) allowed.businessName=req.body.businessName; if(req.body.location!==undefined) allowed.location=req.body.location; if(req.body.categories!==undefined) allowed.categories=req.body.categories; if(req.body.availability!==undefined) allowed.availability=req.body.availability; const u=await User.findByIdAndUpdate(req.dbUser._id,allowed,{new:true,runValidators:true});res.json({user:publicUser(u)});});
router.patch("/preferences", authFresh, async (req,res)=>{req.dbUser.preferences={...req.dbUser.preferences,...req.body};await req.dbUser.save();res.json({preferences:req.dbUser.preferences});});
export default router;
