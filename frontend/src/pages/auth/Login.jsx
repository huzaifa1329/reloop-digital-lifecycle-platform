import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  LogIn,
  RefreshCw,
} from "lucide-react";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import { useAuth } from "../../context/AuthContext";

const roleHome = {
  customer: "/customer/dashboard",
  repair_partner: "/partner/dashboard",
  admin: "/admin/dashboard",
};

function getAllowedHome(role, pathname) {
  const home = roleHome[role];

  if (!pathname || !home) {
    return home;
  }

  const allowedPrefix = {
    customer: "/customer/",
    repair_partner: "/partner/",
    admin: "/admin/",
  }[role];

  if (allowedPrefix && pathname.startsWith(allowedPrefix)) {
    return pathname;
  }

  return home;
}

function makePuzzle() {
  const a = Math.floor(Math.random() * 8) + 2;
  const b = Math.floor(Math.random() * 8) + 2;

  return {
    question: `${a} + ${b} = ?`,
    answer: String(a + b),
  };
}

function Login() {
  const {
    login,
    verifyEmail,
    resendVerification,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "customer",
  });

  const [puzzle, setPuzzle] = useState(makePuzzle);
  const [puzzleAnswer, setPuzzleAnswer] = useState("");

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const [loading, setLoading] = useState(false);

  const [verification, setVerification] = useState(null);
  const [code, setCode] = useState("");

  const solved = useMemo(
    () => puzzleAnswer.trim() === puzzle.answer,
    [puzzleAnswer, puzzle],
  );

  const change = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const changePuzzle = (e) => {
    setPuzzleAnswer(e.target.value);

    setFormError("");

    setErrors((previous) => ({
      ...previous,
      puzzle: "",
    }));
  };

  const refreshPuzzle = () => {
    setPuzzle(makePuzzle());
    setPuzzleAnswer("");

    setErrors((previous) => ({
      ...previous,
      puzzle: "",
    }));

    setFormError("");
  };

  async function submit(e) {
    e.preventDefault();

    if (loading) return;

    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    }

    if (!solved) {
      nextErrors.puzzle = "Solve the security check correctly.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      const data = await login({
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });

      /*
       * If the backend says email verification is required,
       * stay on the login page and show the verification form.
       */
      if (data?.pendingVerification) {
        setVerification(data.email || form.email.trim());
        return;
      }

      /*
       * IMPORTANT:
       *
       * Never blindly navigate to location.state.from.
       *
       * A customer must never be redirected to:
       * /admin/...
       * /partner/...
       *
       * An admin must never be redirected to:
       * /customer/...
       *
       * getAllowedHome() checks the role before preserving
       * the previous protected URL.
       */
      const loggedInRole = data?.user?.role || form.role;

      const previousPath =
        location.state?.from?.pathname || "";

      const destination = getAllowedHome(
        loggedInRole,
        previousPath,
      );

      navigate(destination, {
        replace: true,
        state: {},
      });
    } catch (err) {
      /*
       * Login errors stay on the login page.
       *
       * Examples:
       * - Incorrect password
       * - Account not found
       * - Suspended account
       * - Email not verified
       *
       * They must NOT redirect to /unauthorized.
       */
      setFormError(
        err?.message || "Unable to sign in. Please try again.",
      );

      /*
       * Generate a fresh captcha after a failed login attempt.
       */
      setPuzzle(makePuzzle());
      setPuzzleAnswer("");
    } finally {
      setLoading(false);
    }
  }

  async function verify(e) {
    e.preventDefault();

    if (loading) return;

    if (!code.trim()) {
      setFormError("Please enter the verification code.");
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      const data = await verifyEmail({
        email: verification,
        code: code.trim(),
      });

      const verifiedRole = data?.user?.role || form.role;

      const previousPath =
        location.state?.from?.pathname || "";

      const destination = getAllowedHome(
        verifiedRole,
        previousPath,
      );

      navigate(destination, {
        replace: true,
        state: {},
      });
    } catch (err) {
      setFormError(
        err?.message ||
          "Invalid or expired verification code.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleResendVerification() {
    if (loading || !verification) return;

    setFormError("");
    setLoading(true);

    try {
      await resendVerification(verification);

      setFormError("A new verification code was sent to your email.");
    } catch (err) {
      setFormError(
        err?.message || "Unable to resend verification code.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-reloop-ivory px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-reloop-espresso/10 bg-white p-8 shadow-[0_20px_60px_rgba(33,26,23,0.06)]"
      >
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-reloop-orange font-display font-bold text-white">
            R
          </span>

          <h1 className="mt-4 font-display text-2xl font-bold">
            {verification ? "Verify your email" : "Welcome back"}
          </h1>

          <p className="mt-2 text-sm text-reloop-espresso/55">
            {verification
              ? `Enter the code sent to ${verification}.`
              : "Sign in to continue your product's lifecycle."}
          </p>
        </div>

        {formError && (
          <div className="mb-5 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle
              size={16}
              className="mt-0.5 shrink-0"
            />

            <span>{formError}</span>
          </div>
        )}

        {verification ? (
          <form
            onSubmit={verify}
            className="space-y-4"
          >
            <Input
              id="code"
              name="code"
              label="Verification code"
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="6-digit code"
            />

            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              <CheckCircle2 size={16} />
              Verify & continue
            </Button>

            <button
              type="button"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 text-xs font-semibold text-reloop-orange disabled:opacity-50"
              onClick={handleResendVerification}
            >
              <RefreshCw size={13} />
              Resend code
            </button>
          </form>
        ) : (
          <form
            onSubmit={submit}
            className="space-y-4"
          >
            <Select
              id="role"
              name="role"
              label="Sign in as"
              value={form.role}
              onChange={change}
              options={[
                {
                  value: "customer",
                  label: "Customer",
                },
                {
                  value: "repair_partner",
                  label: "Repair Partner",
                },
                {
                  value: "admin",
                  label: "Administrator",
                },
              ]}
            />

            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={form.email}
              onChange={change}
              error={errors.email}
            />

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="mb-1.5 text-xs font-semibold text-reloop-orange"
                >
                  Forgot password?
                </Link>
              </div>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={change}
                error={errors.password}
              />
            </div>

            <div className="rounded-2xl border border-reloop-espresso/10 bg-reloop-neutral/40 p-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-reloop-espresso/45">
                  Security check
                </p>

                <button
                  type="button"
                  onClick={refreshPuzzle}
                  disabled={loading}
                  className="disabled:opacity-50"
                  aria-label="Refresh security check"
                >
                  <RefreshCw size={14} />
                </button>
              </div>

              <p className="mt-2 font-display text-lg font-bold">
                {puzzle.question}
              </p>

              <Input
                id="puzzle"
                name="puzzle"
                label="Answer"
                inputMode="numeric"
                value={puzzleAnswer}
                onChange={changePuzzle}
                error={errors.puzzle}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              <LogIn size={16} />
              Sign in
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-reloop-espresso/55">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-reloop-orange"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </main>
  );
}

export default Login;