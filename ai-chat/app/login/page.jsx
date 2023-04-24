"use client";

import { useAuth } from "@/components/providers/supabase-auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { signUpWithEmail, signInWithEmail, signInWithGithub, user } =
    useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const error = await signInWithEmail(email, password);
      if (error) {
        setError(error);
      }
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  // Check if there is a user
  useEffect(() => {
    if (user) {
      router.push("/chat");
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit}>
      {/* Inputs Container */}
      <div className="mt-6 space-y-6">
        <div className="space-y-2">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black"
          />
        </div>
        <div className="space-y-2">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black"
          />
        </div>
      </div>
      {/* Error */}
      {error && <div className="mt-4 text-red-500">{error}</div>}
      <button
        variant="subtle"
        type="submit"
        className="flex items-center w-full gap-2 mt-6"
      >
        Login with Email
      </button>
    </form>
  );
};

export default LoginForm;
