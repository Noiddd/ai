"use client";

import { useSupabase } from "@/lib/supabase/supabase-provider";
import React from "react";

export default function Login() {
  const { supabase } = useSupabase();

  const signUp = () => {
    supabase.auth.signUp({
      email: "11dionang@gmail.com",
      password: "dunnolah",
    });
  };

  const signIn = () => {
    supabase.auth.signInWithPassword({
      email: "dionang11@gmail.com",
      password: "dunnolah",
    });
  };

  const signOut = () => {
    supabase.auth.signOut();
  };
  return (
    <>
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
      <button onClick={signOut}>Sign Out </button>
    </>
  );
}
