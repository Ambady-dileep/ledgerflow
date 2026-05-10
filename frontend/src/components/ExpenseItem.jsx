function ExpenseItem({ expense, onDelete, onToggleImportant, onTogglePaid }) {
  if (!expense) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col gap-3">

      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <h4 className="text-base font-semibold text-gray-900 truncate leading-snug">
            {expense.title}
          </h4>
          {expense.isImportant && (
            <span className="text-yellow-400 text-sm shrink-0">⭐</span>
          )}
        </div>
        <span className="text-base font-bold text-gray-900 shrink-0 whitespace-nowrap">
          ₹{expense.amount.toLocaleString()}
        </span>
      </div>

      {/* Status badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">
          {expense.category}
        </span>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            expense.isPaid
              ? "bg-emerald-50 text-emerald-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          {expense.isPaid ? "✓ Paid" : "⏳ Unpaid"}
        </span>
      </div>

      {/* Actions — stack on mobile, row on sm+ */}
      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <button
          onClick={() => onToggleImportant(expense.id)}
          className="flex-1 text-xs font-medium px-3 py-2.5 sm:py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 active:bg-yellow-100 transition-colors duration-150 border border-gray-100 text-center"
        >
          {expense.isImportant ? "Unmark Important" : "⭐ Mark Important"}
        </button>

        <button
          onClick={() => onTogglePaid(expense.id)}
          className={`flex-1 text-xs font-medium px-3 py-2.5 sm:py-2 rounded-lg transition-colors duration-150 border text-center ${
            expense.isPaid
              ? "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100 active:bg-amber-200"
              : "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100 active:bg-emerald-200"
          }`}
        >
          {expense.isPaid ? "Mark Unpaid" : "Mark Paid"}
        </button>

        <button
          onClick={() => onDelete(expense.id)}
          className="flex-1 sm:flex-none px-3 py-2.5 sm:py-2 sm:px-4 rounded-lg text-xs font-medium bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-500 active:bg-red-200 transition-colors duration-150 border border-red-100 text-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;