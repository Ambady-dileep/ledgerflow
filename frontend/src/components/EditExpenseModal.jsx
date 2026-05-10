function EditExpenseModal({
    isOpen,
    onClose,
    children,
}) {
    if (!isOpen) return null;
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">

        {/* Modal box */}
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">

            <div>
                <h2 className="text-sm font-semibold text-slate-900">
                Edit Expense
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                Update your transaction details
                </p>
            </div>

            {/* Close button */}
            <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            </div>

            {/* Modal content */}
            <div className="p-1">
            {children}
            </div>

        </div>

        </div>
    )
}

export default EditExpenseModal;