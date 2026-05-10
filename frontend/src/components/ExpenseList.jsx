import ExpenseCard from "./ExpenseCard";

function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-white">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 mb-4 text-slate-400">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-900">No transactions found</p>
        <p className="text-xs text-slate-500 mt-1">Get started by creating a new expense.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {/* Header Row for Desktop (optional, but good for table look) */}
      <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 bg-slate-50 border-b border-gray-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
        <div className="col-span-6">Transaction</div>
        <div className="col-span-3 text-right">Amount</div>
        <div className="col-span-3 text-right">Actions</div>
      </div>
      
      <div className="flex flex-col divide-y divide-gray-100">
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;