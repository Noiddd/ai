// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
//import { useAuth } from "@/components/providers/supabase-auth-provider";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import UserRegisterForm from "@/components/ui/user-registerform";

const RegisterForm = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(false);

  // const { signUpWithEmail, signInWithEmail, signInWithGithub, user } =
  //   useAuth();
  // const router = useRouter();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);
  //   try {
  //     const error = await signInWithEmail(email, password);
  //     if (error) {
  //       setError(error);
  //     }
  //   } catch (error) {
  //     console.log("Something went wrong!");
  //   }
  // };

  // Check if there is a user
  // useEffect(() => {
  //   if (user) {
  //     router.push("/chat");
  //   }
  // }, [user]);

  return (
    <div className="bg-[#050414] h-full">
      <div className="md:hidden">
        <img
          src="ai-chat/app/background.avif"
          width={1280}
          height={843}
          alt="Authentication"
          className="block"
        />
        {/* <img
          src="ai-chat/app/background.avif"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        /> */}
      </div>
      <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 rounded"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            Demsei.ai
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Dion is the most handsomess and smartness guy. Demsei.ai
                helped me in my housing huting process&rdquo;
              </p>
              <footer className="text-sm">Elon Musk</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              {/* <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p> */}
            </div>
            <UserRegisterForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>

    // <form onSubmit={handleSubmit}>
    //   {/* Inputs Container */}
    //   <div className="mt-6 space-y-6">
    //     <div className="space-y-2">
    //       <label>Email</label>
    //       <input
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         className="text-black"
    //       />
    //     </div>
    //     <div className="space-y-2">
    //       <label>Password</label>
    //       <input
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         className="text-black"
    //       />
    //     </div>
    //   </div>
    //   {/* Error */}
    //   {error && <div className="mt-4 text-red-500">{error}</div>}
    //   <button
    //     variant="subtle"
    //     type="submit"
    //     className="flex items-center w-full gap-2 mt-6"
    //   >
    //     Login with Email
    //   </button>
    // </form>
  );
};

export default RegisterForm;
