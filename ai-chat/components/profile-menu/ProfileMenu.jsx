"use client";

import React, { useState } from "react";
import { useAuth } from "../providers/supabase-auth-provider";
import ProfileMenuDropDown from "./ProfileMenuDropDown";

export default function ProfileMenu() {
  const [profileMenuDropDown, setProfileMenuDropDown] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <div
      onClick={() => setProfileMenuDropDown((prev) => !prev)}
      className="cursor-pointer"
    >
      {profileMenuDropDown && <ProfileMenuDropDown />}
      <div>Avatar</div>
    </div>
  );
}
