import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verifies the Bearer token and attaches the decoded payload to req.user.
export function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Authentication required." });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

// Same as `auth`, but also re-checks the user still exists and isn't
// suspended — used for routes where that matters (e.g. /auth/me).
export async function authFresh(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Authentication required." });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: "Account no longer exists." });
    if (user.status === "Suspended") return res.status(403).json({ message: "This account has been suspended." });
    req.user = payload;
    req.dbUser = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

export function requireRole(...roles) {
  return (req, res, next) =>
    roles.includes(req.user.role) ? next() : res.status(403).json({ message: "Forbidden." });
}
