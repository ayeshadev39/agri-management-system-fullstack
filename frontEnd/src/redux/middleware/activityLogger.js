import { ADDLOG } from "../actions/activity";
import { ACTIVITY_REQUEST } from "../actions/utilities";

export const activityLogger = (store) => (next) => (action) => {
  // Pehle action ko aage bhejein taake data update ho jaye
  const result = next(action);

  try {
    // ✅ Check karein ke kya koi data add/update/delete hua hai
    if (
      action.type.endsWith("_SUCCESS") &&
      (action.type.includes("ADD") || action.type.includes("UPDATE") || action.type.includes("REMOVE"))
    ) {
      if (action.type !== ACTIVITY_REQUEST.ADD_LOG_SUCCESS) {
        const state = store.getState();
        const user = state?.user?.user || "System";
        
        const moduleName = action.type.split("/")[0].toUpperCase();
        const actionName = action.type.includes("ADD") ? "Added" :
                           action.type.includes("UPDATE") ? "Updated" : "Deleted";

        // ✅ Agar payload me item hai to wo uthayega, warna 'Record'
        const entityName = action.payload?.name || action.payload?.title || action.payload?.item || action.payload?.fullName || "Record";

        console.log("✅ LOG SAVED:", `${actionName} ${moduleName}`, entityName);

        // Activity log dispatch karein
        store.dispatch(ADDLOG({
          user: user,
          action: `${actionName} ${moduleName}`,
          entity: entityName
        }));
      }
    }
  } catch (error) {
    console.warn("Activity Logger Error:", error);
  }

  return result;
};