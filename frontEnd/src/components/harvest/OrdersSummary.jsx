import { useApp } from "../../context/AppContext";
import StatCard from "../common/StatCard";

export default function OrdersSummary() {
  const { orders } = useApp();

  const pending = orders.filter((o) => o.status === "pending").length;
  const inTransit = orders.filter((o) => o.status === "inTransit").length;
  const delivered = orders.filter((o) => o.status === "delivered").length;

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-3">
        <StatCard
          icon="receipt_long"
          title="Total Orders"
          value={orders.length}
          trend="all orders"
          gradient="bg-primary"
        />
      </div>
      <div className="col-md-3">
        <StatCard
          icon="schedule"
          title="Pending"
          value={pending}
          trend="awaiting action"
          gradient="bg-warning"
        />
      </div>
      <div className="col-md-3">
        <StatCard
          icon="local_shipping"
          title="In Transit"
          value={inTransit}
          trend="on the way"
          gradient="bg-info"
        />
      </div>
      <div className="col-md-3">
        <StatCard
          icon="check_circle"
          title="Delivered"
          value={delivered}
          trend="completed"
          gradient="bg-success"
        />
      </div>
    </div>
  );
}