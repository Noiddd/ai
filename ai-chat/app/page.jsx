import Image from "next/image";
import { Inter } from "next/font/google";
import NavBar from "@/components/home/NavBar";

import HeroSection from "@/components/home/HeroSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="relative flex w-full h-full overflow-hidden bg-[#050414]">
      <div className="relative flex flex-col items-stretch flex-1 w-full h-full overflow-hidden bg-[#050414]">
        {/* <NavBar /> */}
        <HeroSection />
      </div>
    </div>
  );
}
