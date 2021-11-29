import React, { useEffect, useState } from "react";
// import about from "../lib/about";

import { Header } from "./Header";

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
    <div className="layout">
      <Header instagram={instagram} />
      <main>{children}</main>
    </div>
  );
};
