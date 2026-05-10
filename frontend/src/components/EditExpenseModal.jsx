function EditExpenseModal({
    isOpen,
    onClose,
    children,
}) {
    if (!isOpen) return null;
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

        {/* Modal box */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">

            <div>
                <h2 className="text-sm font-semibold text-gray-900">
                Edit Expense
                </h2>

                <p className="text-xs text-gray-400 mt-0.5">
                Update your transaction
                </p>
            </div>

            {/* Close button */}
            <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-150"
            >
                ✕
            </button>

            </div>

            {/* Modal content */}
            <div className="p-5">
            {children}
            </div>

        </div>

        </div>
    )
}

export default EditExpenseModal;