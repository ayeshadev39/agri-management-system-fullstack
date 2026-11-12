import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function HarvestChart() {
  const crops = useSelector((state) => state.crops.crops); // ✅
  const data = crops.map((c) => ({ name: c.name, Harvested: c.harvestedQty || 0, Sold: c.soldQty || 0 }));

  return (
    <div className="glass-card p-4 h-100">
      <h6 className="fw-bold mb-3">Harvest vs Sales</h6>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis dataKey="name" stroke="var(--text-muted)" style={{ fontSize: 12 }} />
          <YAxis stroke="var(--text-muted)" style={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ borderRadius: 12, border: "none", background: "var(--card-bg)" }} />
          <Legend />
          <Bar dataKey="Harvested" fill="#2e7d32" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Sold" fill="#0288d1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}