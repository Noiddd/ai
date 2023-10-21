import React from "react";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center w-100 px-40">
      <div className="font-bold text-6xl flex-wrap">
        Thanks for checking my project out :D
        <div>Still working on the landing page... so it's pretty plain now</div>
        <div className="mt-20 flex flex-col items-center justify-center">
          <div className="mb-10">
            You can sign into the platform using the demo account:
          </div>
          <div>Email: demseiaitest@gmail.com</div>
          <div>Password: demseiai</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
