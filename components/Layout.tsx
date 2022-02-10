import React from "react";
import Head from "next/head";

import { MAX_WIDTH } from "../styles/variables";

import social from "../content/social.json";

import { Header } from "./Header";
import { Footer } from "./Footer";

const NAME = "Terēze Medne";

export const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Head>
        <title>{NAME}</title>

        <meta name="description" content={NAME} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div
        className={`px-4 w-full max-w-${MAX_WIDTH} mx-auto flex flex-col flex-1 center-items`}
      >
        <div className="py-4">
          <Header instagram={social.instagram} />
        </div>

        <main className="my-4 lg:my-12 flex flex-col flex-1 center-items">
          {children}
        </main>

        <div className="mt-4">
          <Footer title={NAME} />
        </div>
      </div>
    </>
  );
};
