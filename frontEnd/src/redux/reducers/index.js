import { combineReducers } from "redux";
import { userReducer } from "./user";
import { cropsReducer } from "./crops";
import { ordersReducer } from "./orders";
import { buyersReducer } from "./buyers";
import { weatherReducer } from "./weather";
import { tasksReducer } from "./tasks";
import { expensesReducer } from "./expenses";
import { inventoryReducer } from "./inventory";
import { workersReducer } from "./workers";       // ✅ NEW
import { attendanceReducer } from "./attendance"; // ✅ NEW
import { equipmentReducer } from "./equipment";   // ✅ NEW
import { maintenanceReducer } from "./maintenance"; // ✅ NEW
import { activityReducer } from "./activity";

export const rootReducer = combineReducers({
  user: userReducer,
  crops: cropsReducer,
  orders: ordersReducer,
  buyers: buyersReducer,
  weather: weatherReducer,
  tasks: tasksReducer,
  expenses: expensesReducer,
  inventory: inventoryReducer,
  workers: workersReducer,       // ✅ NEW
  attendance: attendanceReducer, // ✅ NEW
  equipment: equipmentReducer,   // ✅ NEW
  maintenance: maintenanceReducer, // ✅ NEW
  activity: activityReducer,
});