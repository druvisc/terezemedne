import type { AppProps } from "next/app";
import Link from "next/link";

import "tailwindcss/tailwind.css";

const Menu = () => {
  return (
    <li>
      <ol>
        <Link href="/">Projects</Link>
      </ol>

      <ol>
        <Link href="/about">About</Link>
      </ol>
    </li>
  );
};

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>
        <Menu />
      </div>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default App;
