import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

// This function will run before every page, API route, and file on your website starts to load.
export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  await supabase.auth.getSession();
  return res;
}
