import React from "react";
import type { AppProps } from "next/app";

import { Layout } from "../components/Layout";

import "tailwindcss/tailwind.css";
import "../styles/index.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
