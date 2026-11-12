import { KEYS, ok, readList, writeList, uid } from "../index";

export const getLogs = () => {
  const list = readList(KEYS.activity) || [];
  return Promise.resolve(ok(list));
};

export const createLog = (data) => {
  try {
    const list = readList(KEYS.activity) || [];
    const item = { 
      ...data, 
      id: uid(), 
      timestamp: new Date().toISOString() 
    };
    
    // Naya log sab se upar aayega (max 50 logs save honge)
    const newList = [item, ...list].slice(0, 50);
    writeList(KEYS.activity, newList);
    
    return Promise.resolve(ok(item));
  } catch (err) {
    console.error("Log save error:", err);
    return Promise.resolve(ok(null));
  }
};