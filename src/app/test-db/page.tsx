"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";

export default function TestDB() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabaseClient
        .from("users")
        .select("*")
        .limit(1);

      if (error) {
        console.error(error);
        setStatus("❌ Database NOT connected");
      } else {
        setStatus("✅ Database CONNECTED successfully");
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">{status}</h1>
    </div>
  );
}
