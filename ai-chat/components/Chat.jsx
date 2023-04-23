import React from "react";

import { createServerClient } from "@/utils/supabase-server";

export default async function Chat() {
  const supabase = createServerClient();

  const { data } = await supabase.from("messages").select();

  return <div>{JSON.stringify(data, null, 2)}</div>;
}
