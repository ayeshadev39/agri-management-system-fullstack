import { KEYS, ok, bad, readList, writeList, uid } from "../index";
export const getMaintenance = () => Promise.resolve(ok(readList(KEYS.maintenance)));
export const createMaintenance = (data) => {
  const list = readList(KEYS.maintenance); const item = { ...data, id: uid() };
  list.push(item); return writeList(KEYS.maintenance, list) ? Promise.resolve(ok(item)) : Promise.resolve(bad("Full"));
};
export const removeMaintenance = (id) => {
  const list = readList(KEYS.maintenance).filter(m => m.id !== id);
  return writeList(KEYS.maintenance, list) ? Promise.resolve(ok({ id })) : Promise.resolve(bad("Full"));
};