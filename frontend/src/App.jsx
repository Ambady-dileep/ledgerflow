// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login  from "./pages/Login";
import Signup from "./pages/Signup";

import ExpenseForm        from "./components/ExpenseForm";
import ExpenseList        from "./components/ExpenseList";
import TotalExpense       from "./components/TotalExpense";
import EditExpenseModal   from "./components/EditExpenseModal";
import MonthlyExpenseChart from "./components/charts/MonthlyExpenseChart";
import CategoryBreakdown  from "./components/charts/CategoryBreakdown";

import { api } from "./utils/api";

const FILTERS = [
  { value: "all",      label: "All",      emoji: "📋" },
  { value: "food",     label: "Food",     emoji: "🍜" },
  { value: "travel",   label: "Travel",   emoji: "✈️" },
  { value: "shopping", label: "Shopping", emoji: "🛍️" },
];

// ── Dashboard (your existing app, unchanged) ──────────────────────────────────
function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm,        setSearchTerm]       = useState("");
  const [expenses,          setExpenses]         = useState([]);
  const [editingExpense,    setEditingExpense]   = useState(null);

  async function fetchExpenses() {
    try {
      const data = await api.get("/expenses/");
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }

  useEffect(() => { fetchExpenses(); }, []);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      selectedCategory === "all" || expense.category === selectedCategory;
    const matchesSearch =
      expense.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  async function addExpense(expense) {
    try {
      const newExpense = await api.post("/expenses/", expense);
      setExpenses((prev) => [...prev, newExpense]);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  }

  async function deleteExpense(id) {
    try {
      await api.delete(`/expenses/${id}/`);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  }

  async function updateExpense(updatedExpense) {
    try {
      const data = await api.patch(`/expenses/${updatedExpense.id}/`, updatedExpense);
      setExpenses((prev) =>
        prev.map((expense) => (expense.id === data.id ? data : expense))
      );
      setEditingExpense(null);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sticky top header - Full width, premium glassmorphic feel */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/80">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 shadow-sm shrink-0">
              <span className="text-white text-sm font-bold leading-none">₹</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-slate-900 leading-none">LedgerFlow</h1>
              <p className="text-[10px] font-medium text-slate-500 mt-0.5 uppercase tracking-wider">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-indigo-600">{user.username.charAt(0).toUpperCase()}</span>
                </div>
                <span className="text-xs text-slate-600 font-medium">
                  {user.username}
                </span>
              </div>
            )}
            <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
            <button
              onClick={() => { logout(); navigate("/login", { replace: true }); }}
              className="text-xs font-medium px-3 py-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto w-full px-4 py-8 pb-20">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Charts, Stats, List) */}
          <div className="xl:col-span-8 flex flex-col gap-6">
            
            {/* Top Stats */}
            <TotalExpense expenses={filteredExpenses} />
            
            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CategoryBreakdown expenses={filteredExpenses} />
              <MonthlyExpenseChart expenses={filteredExpenses} />
            </div>

            {/* List Header / Filters & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              {/* Category filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
                {FILTERS.map((f) => {
                  const active = selectedCategory === f.value;
                  return (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => setSelectedCategory(f.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap
                        ${active
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-white text-slate-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      <span>{f.emoji}</span>
                      {f.label}
                    </button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-md border border-gray-200 bg-white text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Expenses List */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <ExpenseList
                expenses={filteredExpenses}
                onDelete={deleteExpense}
                onEdit={setEditingExpense}
              />
            </div>
          </div>

          {/* Right Column (Form sticky on desktop) */}
          <div className="xl:col-span-4 flex flex-col gap-6 xl:sticky xl:top-24">
            <ExpenseForm
              onAddExpense={addExpense}
              updateExpense={updateExpense}
              editingExpense={editingExpense}
              setEditingExpense={setEditingExpense}
            />
          </div>
          
        </div>
      </main>

      <EditExpenseModal
        isOpen={!!editingExpense}
        onClose={() => setEditingExpense(null)}
      >
        <ExpenseForm
          onAddExpense={addExpense}
          updateExpense={updateExpense}
          editingExpense={editingExpense}
          setEditingExpense={setEditingExpense}
        />
      </EditExpenseModal>
    </div>
  );
}

// ── Root with routing ─────────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"  element={<Login  />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}