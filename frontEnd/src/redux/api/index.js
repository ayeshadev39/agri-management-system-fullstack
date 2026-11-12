// redux/api/index.js

export const KEYS = {
  crops: "agri_crops",
  orders: "agri_orders",
  buyers: "agri_buyers",
  tasks: "agri_tasks",
  expenses: "agri_expenses",
  inventory: "agri_inventory",
  workers: "agri_workers",
  attendance: "agri_attendance",
  equipment: "agri_equipment",
  maintenance: "agri_maintenance",
  activity: "agri_activity",
  session: "agri_session",
};

export const ok = (data, message = "OK") => ({ data: { succeeded: true, message, data } });

export const bad = (message) => ({ data: { succeeded: false, message, data: null } });

export const readList = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    return [];
  }
};

export const writeList = (key, list) => {
  try {
    localStorage.setItem(key, JSON.stringify(list));
    return true;
  } catch (e) {
    return false;
  }
};

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);