import SignInButton from "@/components/home/SignInButton";
import GetStartedButton from "@/components/home/GetStartedButton";
import Logo from "@/components/common/Logo";

import React from "react";

const NavBar = () => {
  return (
    <>
      <div className="flex items-center px-40 py-7 justify-between">
        <Logo />
        <div className="flex gap-5 items-center justify-between">
          <SignInButton />
          {/* <GetStartedButton /> */}
        </div>
      </div>
    </>
  );
};

export default NavBar;
