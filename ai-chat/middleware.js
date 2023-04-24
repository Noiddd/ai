import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

// This function will run before every page, API route, and file on your website starts to load.
export async function middleware(req) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && pathname.startsWith("/chat")) {
    const url = new URL(req.url);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (session && (pathname === "/" || pathname === "/#")) {
    const url = new URL(req.url);
    url.pathname = "/chat";
    return NextResponse.redirect(url);
  }

  return res;
}
