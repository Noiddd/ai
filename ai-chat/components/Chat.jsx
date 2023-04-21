import { useSupabase } from "@/lib/supabase/supabase-provider";
import React from "react";

import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function Chat() {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });

  const { data } = await supabase.from("messages").select();

  return <div>{JSON.stringify(data, null, 2)}</div>;
}
