export const appConfig = {
  appName: "AgriSys",
  tagline: "Smart Farming Management",

  crops: [
    { value: "wheat", label: "Wheat", unit: "kg" },
    { value: "rice", label: "Rice", unit: "kg" },
    { value: "corn", label: "Corn", unit: "kg" },
    { value: "sugarcane", label: "Sugarcane", unit: "ton" },
    { value: "cotton", label: "Cotton", unit: "maund" },
    { value: "potato", label: "Potato", unit: "kg" }, // ✅ Potato added
  ],

  regions: ["Punjab", "Sindh", "KPK", "Balochistan"],

  defaultLocation: { lat: 31.5204, lon: 74.3587, name: "Lahore" },

  api: {
    weather: "https://api.open-meteo.com/v1/forecast",
  },

  storageKeys: {
    crops: "agri_crops",
    orders: "agri_orders",
    buyers: "agri_buyers",
    tasks: "agri_tasks",
    expenses: "agri_expenses",
    inventory: "agri_inventory",
    activity: "agri_activity",
  },

  sidebarLinks: [
    { path: "/dashboard", label: "Dashboard", icon: "dashboard" },
    { path: "/crops", label: "Crops", icon: "grass" },
    { path: "/harvest", label: "Harvest & Orders", icon: "inventory" },
    { path: "/buyers", label: "Buyers", icon: "people" },
    { path: "/tasks", label: "Farm Tasks", icon: "task_alt" },
    { path: "/expenses", label: "Expenses", icon: "payments" },
    { path: "/inventory", label: "Inventory", icon: "inventory_2" },
    { path: "/reports", label: "Reports", icon: "analytics" },
  ],
};