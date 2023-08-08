"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/supabase-auth-provider";
import { useEffect, useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UserLoginForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpWithEmail, signInWithEmail, signInWithGithub, user } =
    useAuth();
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const error = await signInWithEmail(email, password);
      if (error) {
        setError(error);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Something went wrong!");
    }
  }

  // Check if there is a user
  useEffect(() => {
    if (user) {
      router.push("/chat");
    }
  }, [user]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {error && <p className="text-sm text-red-500 m-0">{error}</p>}
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <Input
              className="rounded"
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="rounded"
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button variant="outline" disabled={isLoading} className="rounded">
            {isLoading && (
              <div className="mr-3 inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground z-10">
            Or continue with
          </span>
        </div>
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        className="rounded"
      >
        {isLoading ? (
          <div className="mr-3 inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        ) : (
          <AiOutlineGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
