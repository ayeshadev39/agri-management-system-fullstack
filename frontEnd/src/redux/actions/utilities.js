// redux/actions/utilities.js

export const REQUEST = (type) => ({ type });
export const SUCCESS = (type, payload) => ({ type, payload });
export const FAILURE = (type, payload) => ({ type, payload });

// User / Auth
export const USER_REQUEST = {
  LOGIN_REQUEST: "user/login_request",
  LOGIN_SUCCESS: "user/login_success",
  LOGIN_FAILURE: "user/login_failure",
  LOGOUT_REQUEST: "user/logout_request",
  LOGOUT_SUCCESS: "user/logout_success",
  GET_ALL_USERS_REQUEST: "user/getAll_request",
  GET_ALL_USERS_SUCCESS: "user/getAll_success",
  GET_ALL_USERS_FAILURE: "user/getAll_failure",
};

// Crops
export const CROP_REQUEST = {
  GET_CROPS_REQUEST: "crops/get_request",
  GET_CROPS_SUCCESS: "crops/get_success",
  GET_CROPS_FAILURE: "crops/get_failure",
  ADD_CROP_REQUEST: "crops/add_request",
  ADD_CROP_SUCCESS: "crops/add_success",
  ADD_CROP_FAILURE: "crops/add_failure",
  UPDATE_CROP_REQUEST: "crops/update_request",
  UPDATE_CROP_SUCCESS: "crops/update_success",
  UPDATE_CROP_FAILURE: "crops/update_failure",
  REMOVE_CROP_REQUEST: "crops/remove_request",
  REMOVE_CROP_SUCCESS: "crops/remove_success",
  REMOVE_CROP_FAILURE: "crops/remove_failure",
};

// Orders
export const ORDER_REQUEST = {
  GET_ORDERS_REQUEST: "orders/get_request",
  GET_ORDERS_SUCCESS: "orders/get_success",
  GET_ORDERS_FAILURE: "orders/get_failure",
  ADD_ORDER_REQUEST: "orders/add_request",
  ADD_ORDER_SUCCESS: "orders/add_success",
  ADD_ORDER_FAILURE: "orders/add_failure",
  UPDATE_ORDER_REQUEST: "orders/update_request",
  UPDATE_ORDER_SUCCESS: "orders/update_success",
  UPDATE_ORDER_FAILURE: "orders/update_failure",
  REMOVE_ORDER_REQUEST: "orders/remove_request",
  REMOVE_ORDER_SUCCESS: "orders/remove_success",
  REMOVE_ORDER_FAILURE: "orders/remove_failure",
};

// Buyers
export const BUYER_REQUEST = {
  GET_BUYERS_REQUEST: "buyers/get_request",
  GET_BUYERS_SUCCESS: "buyers/get_success",
  GET_BUYERS_FAILURE: "buyers/get_failure",
  ADD_BUYER_REQUEST: "buyers/add_request",
  ADD_BUYER_SUCCESS: "buyers/add_success",
  ADD_BUYER_FAILURE: "buyers/add_failure",
  UPDATE_BUYER_REQUEST: "buyers/update_request",
  UPDATE_BUYER_SUCCESS: "buyers/update_success",
  UPDATE_BUYER_FAILURE: "buyers/update_failure",
  REMOVE_BUYER_REQUEST: "buyers/remove_request",
  REMOVE_BUYER_SUCCESS: "buyers/remove_success",
  REMOVE_BUYER_FAILURE: "buyers/remove_failure",
};

// Weather
export const WEATHER_REQUEST = {
  FETCH_REQUEST: "weather/fetch_request",
  FETCH_SUCCESS: "weather/fetch_success",
  FETCH_FAILURE: "weather/fetch_failure",
};

// Tasks
export const TASK_REQUEST = {
  GET_TASKS_REQUEST: "tasks/get_request",
  GET_TASKS_SUCCESS: "tasks/get_success",
  GET_TASKS_FAILURE: "tasks/get_failure",
  ADD_TASK_REQUEST: "tasks/add_request",
  ADD_TASK_SUCCESS: "tasks/add_success",
  ADD_TASK_FAILURE: "tasks/add_failure",
  UPDATE_TASK_REQUEST: "tasks/update_request",
  UPDATE_TASK_SUCCESS: "tasks/update_success",
  UPDATE_TASK_FAILURE: "tasks/update_failure",
  REMOVE_TASK_REQUEST: "tasks/remove_request",
  REMOVE_TASK_SUCCESS: "tasks/remove_success",
  REMOVE_TASK_FAILURE: "tasks/remove_failure",
};

// Expenses
export const EXPENSE_REQUEST = {
  GET_EXPENSES_REQUEST: "expenses/get_request",
  GET_EXPENSES_SUCCESS: "expenses/get_success",
  GET_EXPENSES_FAILURE: "expenses/get_failure",
  ADD_EXPENSE_REQUEST: "expenses/add_request",
  ADD_EXPENSE_SUCCESS: "expenses/add_success",
  ADD_EXPENSE_FAILURE: "expenses/add_failure",
  REMOVE_EXPENSE_REQUEST: "expenses/remove_request",
  REMOVE_EXPENSE_SUCCESS: "expenses/remove_success",
  REMOVE_EXPENSE_FAILURE: "expenses/remove_failure",
};

// Inventory
export const INVENTORY_REQUEST = {
  GET_INVENTORY_REQUEST: "inventory/get_request",
  GET_INVENTORY_SUCCESS: "inventory/get_success",
  GET_INVENTORY_FAILURE: "inventory/get_failure",
  ADD_ITEM_REQUEST: "inventory/add_request",
  ADD_ITEM_SUCCESS: "inventory/add_success",
  ADD_ITEM_FAILURE: "inventory/add_failure",
  UPDATE_ITEM_REQUEST: "inventory/update_request",
  UPDATE_ITEM_SUCCESS: "inventory/update_success",
  UPDATE_ITEM_FAILURE: "inventory/update_failure",
  REMOVE_ITEM_REQUEST: "inventory/remove_request",
  REMOVE_ITEM_SUCCESS: "inventory/remove_success",
  REMOVE_ITEM_FAILURE: "inventory/remove_failure",
};

// Activity Log
export const ACTIVITY_REQUEST = {
  GET_LOGS_REQUEST: "activity/get_request",
  GET_LOGS_SUCCESS: "activity/get_success",
  GET_LOGS_FAILURE: "activity/get_failure",
  ADD_LOG_REQUEST: "activity/add_request",
  ADD_LOG_SUCCESS: "activity/add_success",
  ADD_LOG_FAILURE: "activity/add_failure",
};

// [NEW v2] Workers
export const WORKER_REQUEST = {
  GET_WORKERS_REQUEST: "workers/get_request",
  GET_WORKERS_SUCCESS: "workers/get_success",
  GET_WORKERS_FAILURE: "workers/get_failure",
  ADD_WORKER_REQUEST: "workers/add_request",
  ADD_WORKER_SUCCESS: "workers/add_success",
  ADD_WORKER_FAILURE: "workers/add_failure",
  UPDATE_WORKER_REQUEST: "workers/update_request",
  UPDATE_WORKER_SUCCESS: "workers/update_success",
  UPDATE_WORKER_FAILURE: "workers/update_failure",
  REMOVE_WORKER_REQUEST: "workers/remove_request",
  REMOVE_WORKER_SUCCESS: "workers/remove_success",
  REMOVE_WORKER_FAILURE: "workers/remove_failure",
};

// [NEW v2] Attendance
export const ATTENDANCE_REQUEST = {
  GET_ATTENDANCE_REQUEST: "attendance/get_request",
  GET_ATTENDANCE_SUCCESS: "attendance/get_success",
  GET_ATTENDANCE_FAILURE: "attendance/get_failure",
  MARK_ATTENDANCE_REQUEST: "attendance/add_request",
  MARK_ATTENDANCE_SUCCESS: "attendance/add_success",
  MARK_ATTENDANCE_FAILURE: "attendance/add_failure",
};

// [NEW v2] Equipment
export const EQUIPMENT_REQUEST = {
  GET_EQUIPMENT_REQUEST: "equipment/get_request",
  GET_EQUIPMENT_SUCCESS: "equipment/get_success",
  GET_EQUIPMENT_FAILURE: "equipment/get_failure",
  ADD_EQUIPMENT_REQUEST: "equipment/add_request",
  ADD_EQUIPMENT_SUCCESS: "equipment/add_success",
  ADD_EQUIPMENT_FAILURE: "equipment/add_failure",
  UPDATE_EQUIPMENT_REQUEST: "equipment/update_request",
  UPDATE_EQUIPMENT_SUCCESS: "equipment/update_success",
  UPDATE_EQUIPMENT_FAILURE: "equipment/update_failure",
  REMOVE_EQUIPMENT_REQUEST: "equipment/remove_request",
  REMOVE_EQUIPMENT_SUCCESS: "equipment/remove_success",
  REMOVE_EQUIPMENT_FAILURE: "equipment/remove_failure",
};

// [NEW v2] Maintenance
export const MAINTENANCE_REQUEST = {
  GET_MAINTENANCE_REQUEST: "maintenance/get_request",
  GET_MAINTENANCE_SUCCESS: "maintenance/get_success",
  GET_MAINTENANCE_FAILURE: "maintenance/get_failure",
  ADD_MAINTENANCE_REQUEST: "maintenance/add_request",
  ADD_MAINTENANCE_SUCCESS: "maintenance/add_success",
  ADD_MAINTENANCE_FAILURE: "maintenance/add_failure",
  REMOVE_MAINTENANCE_REQUEST: "maintenance/remove_request",
  REMOVE_MAINTENANCE_SUCCESS: "maintenance/remove_success",
  REMOVE_MAINTENANCE_FAILURE: "maintenance/remove_failure",
};

// UI (Toast, Theme)
export const UI_REQUEST = {
  TOGGLE_THEME: "ui/toggle_theme",
  SHOW_TOAST: "ui/show_toast",
  HIDE_TOAST: "ui/hide_toast",
};