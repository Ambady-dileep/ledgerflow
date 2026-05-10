function TotalExpense({ expenses }) {
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div className="flex flex-col justify-center px-6 py-6 bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
      {/* Decorative gradient blur in background */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="relative z-10">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Total Spent
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-medium text-slate-400">₹</span>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            {total.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TotalExpense;