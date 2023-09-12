import Link from "next/link";
import React from "react";

const SignInButton = () => {
  return (
    <Link
      href="/login"
      className="text-sm text-slate-300 cursor-pointer hover:text-white bg-[#050414]"
    >
      Sign In
    </Link>
  );
};

export default SignInButton;
