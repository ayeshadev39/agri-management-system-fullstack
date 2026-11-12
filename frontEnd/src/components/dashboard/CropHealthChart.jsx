import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function CropHealthChart() {
  const crops = useSelector((state) => state.crops.crops);

  const healthy = crops.filter((c) => c.healthScore >= 80).length;
  const warning = crops.filter((c) => c.healthScore >= 50 && c.healthScore < 80).length;
  const critical = crops.filter((c) => c.healthScore < 50).length;

  const data = [
    { name: "Healthy", value: healthy, color: "#2e7d32" },
    { name: "Needs Attention", value: warning, color: "#f59e0b" },
    { name: "Critical", value: critical, color: "#ef4444" },
  ].filter((d) => d.value > 0);

  return (
    <div className="glass-card p-4 h-100">
      <h6 className="fw-bold mb-3">Health Distribution</h6>
      {crops.length === 0 ? (
        <p className="text-muted">No data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3}>
              {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}