"use client";

import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export default function Login() {
  const [supabase] = useState(() =>
    createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  );

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "test@gmail.com",
      password: "test",
    });

    console.log(data);
  };

  const signIn = () => {
    supabase.auth.signInWithPassword({
      email: "dion@gmail.com",
      password: "dion",
    });
  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <>
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
}
