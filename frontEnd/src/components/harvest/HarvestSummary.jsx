import { useApp } from "../../context/AppContext";
import StatCard from "../common/StatCard";
import { formatNumber } from "../../utils/formatters";

export default function HarvestSummary() {
  const { crops } = useApp();

  const totalHarvested = crops.reduce((s, c) => s + (c.harvestedQty || 0), 0);
  const totalSold = crops.reduce((s, c) => s + (c.soldQty || 0), 0);
  const remaining = totalHarvested - totalSold;

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-4">
        <StatCard
          icon="agriculture"
          title="Total Harvested"
          value={formatNumber(totalHarvested)}
          trend="units harvested"
          gradient="bg-success"
        />
      </div>
      <div className="col-md-4">
        <StatCard
          icon="local_shipping"
          title="Total Sold"
          value={formatNumber(totalSold)}
          trend="units sold"
          gradient="bg-info"
        />
      </div>
      <div className="col-md-4">
        <StatCard
          icon="inventory"
          title="Remaining Stock"
          value={formatNumber(remaining)}
          trend="units in stock"
          gradient="bg-warning"
        />
      </div>
    </div>
  );
}