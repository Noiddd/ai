"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createBrowserClient } from "@/utils/supabase-browser";

const Context = createContext(undefined);

export default function SupabaseProvider({ children }) {
  const [supabase] = useState(() => createBrowserClient());

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};
