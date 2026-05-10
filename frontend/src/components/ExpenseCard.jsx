function ExpenseCard({ expense, onDelete, onEdit }) {
  const categoryConfig = {
    food:     { emoji: "🍜", bg: "bg-orange-50", text: "text-orange-600" },
    travel:   { emoji: "✈️", bg: "bg-sky-50",    text: "text-sky-600"    },
    shopping: { emoji: "🛍️", bg: "bg-violet-50", text: "text-violet-600" },
  };

  const config = categoryConfig[expense.category] || {
    emoji: "📦", bg: "bg-slate-100", text: "text-slate-600",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center px-4 sm:px-5 py-3.5 bg-white hover:bg-slate-50/50 transition-colors group">
      
      {/* Left: icon + title */}
      <div className="sm:col-span-6 flex items-center gap-3 min-w-0">
        <div className={`w-9 h-9 flex items-center justify-center rounded-full text-base shrink-0 ${config.bg}`}>
          {config.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-900 truncate">{expense.title}</p>
          <span className={`inline-block mt-0.5 text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${config.bg} ${config.text}`}>
            {expense.category}
          </span>
        </div>
      </div>

      {/* Amount */}
      <div className="sm:col-span-3 flex sm:justify-end items-center">
        <span className="text-sm font-semibold text-slate-900">
          ₹{expense.amount.toLocaleString()}
        </span>
      </div>

      {/* Actions */}
      <div className="sm:col-span-3 flex justify-end items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(expense)}
          className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          aria-label="Edit"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          aria-label="Delete"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

    </div>
  );
}

export default ExpenseCard;