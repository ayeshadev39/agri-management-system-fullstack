import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GETWEATHER } from "../../redux/actions/weather";
import { formatNumber } from "../../utils/formatters";
import StatCard from "../../components/common/StatCard";
import CropHealthList from "../../components/dashboard/CropHealthList";
import CropHealthChart from "../../components/dashboard/CropHealthChart";
import CuttingSchedule from "../../components/dashboard/CuttingSchedule";
import AlertsPanel from "../../components/dashboard/AlertsPanel";
import ForecastStrip from "../../components/dashboard/ForecastStrip";
import HarvestChart from "../../components/harvest/HarvestChart";
import HumidityGauge from "../../components/dashboard/HumidityGauge";

export default function Dashboard() {
  const dispatch = useDispatch();
  
  const weather = useSelector((state) => state.weather.data);
  const weatherLoading = useSelector((state) => state.weather.loading);
  const crops = useSelector((state) => state.crops.crops) || [];
  const orders = useSelector((state) => state.orders.orders) || [];
  const tasks = useSelector((state) => state.tasks.tasks) || [];
  const expenses = useSelector((state) => state.expenses.expenses) || [];

  useEffect(() => {
    dispatch(GETWEATHER(31.5204, 74.3587));
    const interval = setInterval(() => dispatch(GETWEATHER(31.5204, 74.3587)), 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const totalHarvested = crops.reduce((sum, c) => sum + (c.harvestedQty || 0), 0);
  const totalSold = crops.reduce((sum, c) => sum + (c.soldQty || 0), 0);
  const totalRemaining = totalHarvested - totalSold;
  const humidity = weather?.current?.relative_humidity_2m;
  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const pendingTasks = tasks.filter(t => t.status !== 'done').length;

  return (
    <div className="animate-fade-up pb-5">
      
      {/* Hero Banner */}
      <div className="hero-banner mb-4 rounded-4 overflow-hidden shadow-lg">
        <div className="hero-content">
          <h1>Smart Agriculture Management</h1>
          <p>Empowering farmers with real-time weather insights, crop health tracking, and harvest management for a better tomorrow.</p>
          <button className="btn-secondary-custom">Explore Crops</button>
        </div>
      </div>

      <div className="container-fluid p-0">
        {/* KPI Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3 col-6">
            <StatCard icon="agriculture" title="Total Harvest" value={formatNumber(totalHarvested)} trend="+12% this week" color="#2e7d32" />
          </div>
          <div className="col-md-3 col-6">
            <StatCard icon="receipt_long" title="Orders" value={formatNumber(orders.length)} trend="+5 new" color="#0288d1" />
          </div>
          <div className="col-md-3 col-6">
            <StatCard icon="local_shipping" title="Sold" value={formatNumber(totalSold)} trend="units sold" color="#f9a825" />
          </div>
          <div className="col-md-3 col-6">
            <StatCard icon="inventory" title="Stock Left" value={formatNumber(totalRemaining)} trend="in warehouse" color="#d84315" />
          </div>
        </div>

        {/* ✅ Weather & Humidity (Naya Premium Design) */}
        <div className="row g-4 mb-4">
          <div className="col-lg-6">
            <div className="weather-widget h-100 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-start position-relative" style={{ zIndex: 1 }}>
                <div>
                  <h5 className="mb-1 text-white opacity-75 d-flex align-items-center gap-2">
                    <span className="material-icons fs-6">location_on</span> Lahore, Pakistan
                  </h5>
                  <div className="weather-temp mt-2">{Math.round(weather?.current?.temperature_2m || 0)}°C</div>
                  <p className="mb-0 mt-2 text-white opacity-90 fw-semibold">
                    Clear Sky • Feels like {Math.round(weather?.current?.temperature_2m || 0)}°C
                  </p>
                </div>
                <span className="material-icons position-relative" style={{ fontSize: "6rem", color: "#fbbf24", textShadow: "0 4px 15px rgba(251, 191, 36, 0.5)", zIndex: 2 }}>
                  wb_sunny
                </span>
              </div>
              
              <div className="d-flex flex-wrap gap-3 mt-4 position-relative" style={{ zIndex: 1 }}>
                <div className="weather-detail">
                  <span className="material-icons text-info">water_drop</span> {humidity || 0}% Humidity
                </div>
                <div className="weather-detail">
                  <span className="material-icons text-light">air</span> {weather?.current?.wind_speed_10m || 0} km/h
                </div>
                <div className="weather-detail">
                  <span className="material-icons text-warning">umbrella</span> {weather?.daily?.precipitation_probability_max?.[0] || 0}% Rain
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <HumidityGauge humidity={humidity} loading={weatherLoading} />
          </div>
        </div>

        {/* Forecast */}
        <div className="row g-4 mb-4">
          <div className="col-12">
            <ForecastStrip weather={weather} loading={weatherLoading} />
          </div>
        </div>

        {/* Charts */}
        <div className="row g-4 mb-4 align-items-stretch">
          <div className="col-lg-7"><HarvestChart /></div>
          <div className="col-lg-5"><CropHealthChart /></div>
        </div>

        {/* Tasks & Expenses Quick View */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="glass-card p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Upcoming Tasks</h6>
                <span className="material-icons text-primary">task_alt</span>
              </div>
              <h3 className="fw-bold mb-1">{pendingTasks}</h3>
              <p className="text-muted small mb-0">Pending farm tasks</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="glass-card p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Total Expenses</h6>
                <span className="material-icons text-danger">payments</span>
              </div>
              <h3 className="fw-bold mb-1">Rs. {formatNumber(totalExpense)}</h3>
              <p className="text-muted small mb-0">Recorded this season</p>
            </div>
          </div>
        </div>

        {/* Crop Health & Cutting Schedule */}
        <div className="row g-4 mb-4 align-items-stretch">
          <div className="col-lg-6"><CropHealthList /></div>
          <div className="col-lg-6"><CuttingSchedule /></div>
        </div>

        {/* Alerts */}
        <div className="row g-4">
          <div className="col-12"><AlertsPanel humidity={humidity} /></div>
        </div>
      </div>
    </div>
  );
}