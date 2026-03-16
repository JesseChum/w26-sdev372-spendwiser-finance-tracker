import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type Expense = {
  amount: number;
};

const COLORS = ["#2e8b7a", "#e5e7eb"];

export default function SavingsChart({ expenses }: { expenses: Expense[] }) {

  const goal = 5000;

  const totalSpent = expenses.reduce((sum: number, item: Expense) => sum + item.amount,0);

  const data = [
    { name: "Spent", value: totalSpent },
    { name: "Remaining", value: Math.max(goal - totalSpent, 0) }
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={60}
          outerRadius={90}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}