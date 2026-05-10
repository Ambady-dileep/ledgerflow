import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#4f46e5", // indigo-600
  "#0ea5e9", // sky-500
  "#f59e0b", // amber-500
  "#14b8a6", // teal-500
];

function ExpensePieChart({ data }) {

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 xl:p-6 flex flex-col">

      <div className="mb-6">
        <h2 className="text-sm font-semibold text-slate-900">
          Category Breakdown
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Spending distribution by category
        </p>
      </div>

      <div className="h-64 mt-auto">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
            >

              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="transparent"
                />
              ))}

            </Pie>

            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
              itemStyle={{ color: '#0f172a', fontWeight: 500 }}
              formatter={(value) => [`₹${value}`, 'Amount']}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ExpensePieChart;