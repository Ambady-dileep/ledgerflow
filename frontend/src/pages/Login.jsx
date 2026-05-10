// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || "/";

  const [form,  setForm]  = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(form.username, form.password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  const inputBase =
    "w-full text-sm text-slate-900 placeholder-slate-400 bg-white border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm";

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/80">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 shadow-sm shrink-0">
              <span className="text-white text-sm font-bold leading-none">₹</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-slate-900 leading-none">LedgerFlow</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Welcome back</h2>
            <p className="text-sm text-slate-500">Enter your credentials to continue.</p>
          </div>

          {error && (
            <div className="mb-5 px-3 py-2.5 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
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
                className={inputBase}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className={inputBase}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 mt-2 rounded-lg bg-indigo-600 text-white text-sm font-medium tracking-wide hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}