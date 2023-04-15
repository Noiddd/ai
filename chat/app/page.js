"use client";
import { useAuth } from "@/components/providers/supabase-auth-provider";

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <>
      <h1>POST</h1>;<button onClick={signOut}>Sign Out</button>
    </>
  );
}
