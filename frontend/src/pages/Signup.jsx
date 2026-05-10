// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const [form,  setForm]  = useState({ username: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    const result = await signup(form.username, form.password, form.email);
    if (result.success) {
      navigate("/", { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-50/90 backdrop-blur-sm border-b border-gray-100 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900 leading-none">LedgerFlow</h1>
            <p className="text-[11px] text-gray-400 mt-0.5">Track your spending</p>
          </div>
          <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-950 shrink-0">
            <span className="text-white text-base font-bold leading-none">₹</span>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto w-full px-4 py-10 flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Create account</h2>
          <p className="text-sm text-gray-400 mb-6">Start tracking your expenses today.</p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
                required
                placeholder="john_doe"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Email <span className="normal-case font-normal text-gray-300">(optional)</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={6}
                required
                placeholder="Min. 6 characters"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                autoComplete="new-password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gray-950 text-white text-sm font-semibold tracking-wide hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-900 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}