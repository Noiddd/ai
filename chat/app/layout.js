import "./globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const supabase = createBrowserSupabaseClient();

  return (
    <html lang="en">
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <body>{children}</body>
      </SessionContextProvider>
    </html>
  );
}
