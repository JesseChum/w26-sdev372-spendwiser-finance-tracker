import { PieChart, Pie, Cell } from "recharts";

type Expense = {
  amount: number;
};

type Props = {
  expenses: Expense[];
};

const COLORS = ["#1f9d8a", "#e5e7eb"];

export default function SavingsChart({ expenses }: Props) {

  const goal = 5000;

  const totalSpent = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const data = [
    { name: "Spent", value: totalSpent },
    { name: "Remaining", value: Math.max(goal - totalSpent, 0) }
  ];

  return (
    <PieChart width={250} height={250}>
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
  );
}