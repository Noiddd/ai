import React from "react";

import { useSupabase } from "@/components/providers/supabase-provider";
import { createServerClient } from "@/utils/supabase-server";
import { useAuth } from "@/components/providers/supabase-auth-provider";

export default async function Chat() {
  const supabase = createServerClient();

  const { data } = await supabase.from("messages").select();

  return (
    <div className="relative flex flex-col items-stretch flex-1 w-full h-full ml-0 overflow-hidden md:ml-64 bg-neutral-900 ">
      <div className="flex-1 overflow-hidden">
        {JSON.stringify(data, null, 2)}
        <div>
          <button>sign out</button>
        </div>
      </div>
    </div>
  );
}
