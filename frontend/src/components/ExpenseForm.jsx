import { useState, useRef, useEffect } from "react";

const CATEGORIES = [
  { value: "food",     label: "Food",     emoji: "🍜" },
  { value: "travel",   label: "Travel",   emoji: "✈️" },
  { value: "shopping", label: "Shopping", emoji: "🛍️" },
];

function ExpenseForm({
  onAddExpense,
  updateExpense,
  editingExpense,
  setEditingExpense,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !amount || !category) return;
    const expenseData = {
        title,
        amount: Number(amount),
        category,
    };
    if (editingExpense) {
        await updateExpense({
        ...editingExpense,
        ...expenseData,
        });
        setEditingExpense(null);
    } else {
        await onAddExpense(expenseData);
    }
    setTitle("");
    setAmount("");
    setCategory("");
    }

  useEffect(() => {
    if (editingExpense) {
        setTitle(editingExpense.title);
        setAmount(editingExpense.amount);
        setCategory(editingExpense.category);
    }
    }, [editingExpense]);

  const inputBase =
    "w-full text-sm text-slate-900 placeholder-slate-400 bg-white border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm";

  const selected = CATEGORIES.find((c) => c.value === category);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 xl:p-6">
      <h2 className="text-sm font-semibold text-slate-900 mb-5">
        {editingExpense ? "Edit Expense" : "New Expense"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Title</label>
          <input
            type="text"
            placeholder="e.g. Uber ride"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputBase}
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Amount (₹)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`${inputBase} pl-7`}
            />
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Category</label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border bg-white text-sm transition-all shadow-sm
                ${dropdownOpen
                  ? "border-indigo-500 ring-2 ring-indigo-500/20"
                  : "border-gray-200 hover:border-gray-300"}
                ${selected ? "text-slate-900" : "text-slate-400"}`}
            >
              <span className="flex items-center gap-2">
                {selected ? (
                  <>
                    <span>{selected.emoji}</span>
                    <span>{selected.label}</span>
                  </>
                ) : (
                  "Select a category"
                )}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute z-20 mt-1.5 w-full bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden py-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => {
                      setCategory(cat.value);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors
                      ${category === cat.value
                        ? "bg-slate-50 text-indigo-600 font-medium"
                        : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    <span className="text-base leading-none">{cat.emoji}</span>
                    <span>{cat.label}</span>
                    {category === cat.value && (
                      <svg className="w-4 h-4 ml-auto text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2.5 mt-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        >
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;