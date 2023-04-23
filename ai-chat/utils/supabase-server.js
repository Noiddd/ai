import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

// use to create client in server components
export const createServerClient = () =>
  createServerComponentSupabaseClient({
    headers,
    cookies,
  });
