import React from "react";

import { useSupabase } from "@/components/providers/supabase-provider";
import { createServerClient } from "@/utils/supabase-server";
import { useAuth } from "@/components/providers/supabase-auth-provider";

export default async function Chat() {
  const supabase = createServerClient();

  const { data } = await supabase.from("messages").select();

  return (
    <div>
      {JSON.stringify(data, null, 2)}
      <div>
        <button>sign out</button>
      </div>
    </div>
  );
}
