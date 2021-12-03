import React from "react";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center">
      <hr
        style={{
          background: "black",
          color: "black",
          width: "100%",
          height: "2px",
        }}
      />

      <div className="my-2 text-xs">
        &copy; {new Date().getFullYear()} Terēze Medne. All rights reserved.
      </div>
    </footer>
  );
};
