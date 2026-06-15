import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Lock, ArrowLeft } from "lucide-react";
import api, { formatApiError } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADMIN } from "@/constants/testIds";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("adesigns_admin_token", data.access_token);
      localStorage.setItem("adesigns_admin_user", JSON.stringify(data.user || {}));
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(formatApiError(err.response?.data?.detail) || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden grid place-items-center px-4">
      <div className="aurora aurora-purple -left-20 -top-20 w-[420px] h-[420px] opacity-40" />
      <div className="aurora aurora-violet -right-20 -bottom-20 w-[420px] h-[420px] opacity-30" />
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-white/55 hover:text-white mb-5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to site
        </Link>
        <div className="gradient-border rounded-3xl">
          <div className="relative p-7 sm:p-9">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-purple-500/15 ring-1 ring-purple-400/40 text-purple-200">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="mt-5 font-display text-2xl sm:text-3xl font-medium">
              Admin sign-in
            </h1>
            <p className="mt-1.5 text-white/55 text-sm">
              For A-Designs team members managing client leads.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <Label className="text-xs text-white/70">Email</Label>
                <Input
                  data-testid={ADMIN.loginEmail}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@a-designs.ca"
                  className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-400"
                />
              </div>
              <div>
                <Label className="text-xs text-white/70">Password</Label>
                <Input
                  data-testid={ADMIN.loginPassword}
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-400"
                />
              </div>
              {error && (
                <div
                  data-testid={ADMIN.loginError}
                  className="px-3 py-2 rounded-xl bg-red-500/10 ring-1 ring-red-400/30 text-red-200 text-sm"
                >
                  {error}
                </div>
              )}
              <button
                type="submit"
                data-testid={ADMIN.loginSubmit}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-[0_18px_50px_-18px_rgba(147,51,234,0.7)] hover:shadow-[0_24px_60px_-15px_rgba(147,51,234,0.85)] transition-all disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Signing in…
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
