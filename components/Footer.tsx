import React from "react";

export const Footer = () => {
  return (
    <footer className="mt-4 flex flex-col items-center">
      <hr
        style={{
          background: "black",
          color: "black",
          width: "100%",
          height: "2px",
        }}
      />

      <span className="my-2 text-xs">
        &copy; {new Date().getFullYear()} Terēze Medne. All rights reserved.
      </span>
    </footer>
  );
};
