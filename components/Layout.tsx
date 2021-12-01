import React, { useEffect, useState } from "react";
// import about from "../lib/about";

import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: any }) => {
  // const [{ instagram }, setAbout] = useState<any>();
  const instagram = "test";
  // useEffect(() => {
  //   const doStuff = async () => {
  //     const data = await about.load();
  //     setAbout(data);
  //   };

  //   doStuff();
  // });

  // pass ig etc to header
  return (
    // Tailwind?
    <div className="max-w-5xl w-full h-full mx-auto flex flex-col center-items">
      <Header instagram={instagram} />

      <main className="flex flex-col flex-1 center-items">{children}</main>

      <Footer />
    </div>
  );
};
