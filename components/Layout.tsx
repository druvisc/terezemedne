import React from "react";

import social from "../content/social.json";

import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: any }) => {
  return (
    <div className="px-4 max-w-5xl w-full h-full mx-auto flex flex-col center-items">
      <div className="py-4">
        <Header instagram={social.instagram} />
      </div>

      <main className="my-4 lg:my-12 flex flex-col flex-1 center-items">
        {children}
      </main>

      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
};
