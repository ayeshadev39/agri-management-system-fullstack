import { KEYS, ok, bad, readList, writeList, uid } from "../index";
export const getAttendance = () => Promise.resolve(ok(readList(KEYS.attendance)));
export const markAttendance = (data) => {
  const list = readList(KEYS.attendance); 
  const item = { ...data, id: uid() };
  list.push(item); return writeList(KEYS.attendance, list) ? Promise.resolve(ok(item)) : Promise.resolve(bad("Full"));
};