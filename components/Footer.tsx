import React from "react";

export const Footer = ({ title }: { title: string }) => {
  return (
    <footer className="flex flex-col items-center">
      <hr className="w-full bg-black h-[2px]" />

      <div className="my-2 text-xs">
        &copy; {new Date().getFullYear()} {title}. All rights reserved.
      </div>
    </footer>
  );
};
