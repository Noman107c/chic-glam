import { openDB } from "idb";

export const dbPromise = openDB("ChicGlamDB", 1, {
  upgrade(db) {
    db.createObjectStore("appointments", { keyPath: "id" });
    db.createObjectStore("users", { keyPath: "id" });
  },
});

export async function saveAppointmentOffline(appointment: any) {
  const db = await dbPromise;
  await db.put("appointments", { ...appointment, sync_status: "pending" });
}

export async function getOfflineAppointments() {
  const db = await dbPromise;
  return db.getAll("appointments");
}
