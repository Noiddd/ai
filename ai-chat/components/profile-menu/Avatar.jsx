import React from "react";

export default function Avatar({ avatar }) {
  return (
    <img
      className="h-12 w-12 rounded-full cursor-pointer mx-autp mb-2 hover:opacity-50"
      src={avatar}
    />
  );
}
