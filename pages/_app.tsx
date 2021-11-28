import React from "react";
import type { AppProps } from "next/app";

import "tailwindcss/tailwind.css";
import "../styles/index.css";

import { Header } from "../components/Header";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="layout">
      <Header />

      <div>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default App;
