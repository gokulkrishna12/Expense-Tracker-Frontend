import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function ExpenseChart({ expenses }) {

    const categoryData = [];

    expenses.forEach((expense) => {
        const existing = categoryData.find(
            item => item.name === expense.category
        );
        if (existing) {
            existing.value += Number(expense.amount);
        } else {
            categoryData.push({
                name: expense.category,
                value: Number(expense.amount)
            });
        }
    });

    const COLORS = [
        "#60a5fa",
        "#4ade80",
        "#fbbf24",
        "#f87171",
        "#a78bfa"
    ];

    return (
        <div className="dash-card">

            <h4>Expense Category Chart</h4>

            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ₹${value}`}
                    >
                        {categoryData.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => [`₹${value}`, "Amount"]}
                        contentStyle={{
                            background: "rgba(15, 28, 63, 0.85)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "10px",
                            color: "#fff",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.82rem"
                        }}
                    />
                    <Legend
                        wrapperStyle={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.82rem",
                            color: "rgba(255,255,255,0.75)"
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>

        </div>
    );
}

export default ExpenseChart;
