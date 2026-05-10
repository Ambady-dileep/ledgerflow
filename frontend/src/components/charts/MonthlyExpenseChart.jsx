import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function MonthlyExpenseChart({ expenses }) {

  // Group expenses by month
  const monthlyData = expenses.reduce((acc, expense) => {

    // Convert backend date string into JS date
    const date = new Date(expense.created_at);

    // Get month short name
    const month = date.toLocaleString("default", {
      month: "short",
    });

    // Check if month already exists
    const existingMonth = acc.find(
      item => item.month === month
    );

    if (existingMonth) {

      existingMonth.total += Number(expense.amount);

    } else {

      acc.push({
        month,
        total: Number(expense.amount),
      });

    }

    return acc;

  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 xl:p-6 flex flex-col">

      <div className="mb-6">

        <h2 className="text-sm font-semibold text-slate-900">
          Monthly Spending
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Expense trend over time
        </p>

      </div>

      <div className="h-64 mt-auto">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={monthlyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />

            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />

            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `₹${value}`} />

            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
              itemStyle={{ color: '#0f172a', fontWeight: 500 }}
              formatter={(value) => [`₹${value}`, 'Total']}
            />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#4f46e5"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#4f46e5', strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default MonthlyExpenseChart;