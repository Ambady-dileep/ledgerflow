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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header — matches LedgerFlow style */}
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
          <h2 className="text-xl font-bold text-gray-900 mb-1">Sign in</h2>
          <p className="text-sm text-gray-400 mb-6">Welcome back — enter your credentials.</p>

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
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gray-950 text-white text-sm font-semibold tracking-wide hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-400">
            No account?{" "}
            <Link to="/signup" className="text-gray-900 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}