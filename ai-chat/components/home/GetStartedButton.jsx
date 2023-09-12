import Link from "next/link";
import React from "react";

const GetStartedButton = () => {
  return (
    <Link
      href="/register"
      className="bg-white text-[#050414] font-semibold py-2 px-4 rounded-full text-sm cursor-pointer"
    >
      Get started
    </Link>
  );
};

export default GetStartedButton;
