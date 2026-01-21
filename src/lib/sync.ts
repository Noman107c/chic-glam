import { supabase } from './supabase';
import { getOfflineAppointments } from './indexedDB';

export async function syncAppointments() {
  const pending = await getOfflineAppointments();

  for (const app of pending) {
    await supabase.from("appointments").insert(app);
    // optionally mark as synced
  }
}

window.addEventListener("online", syncAppointments);
