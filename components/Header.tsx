import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="my-4 flex justify-between">
      <Nav />

      {/* TODO: Link to facebook? */}
      <h1 className="uppercase">Terēze Medne</h1>
    </header>
  );
};

const Nav = () => {
  return (
    <nav className="lowercase">
      <ol className="flex">
        <li>
          <Link href="/">Work</Link>
        </li>

        <li className="ml-4">
          <Link href="/about">About</Link>
        </li>
      </ol>
    </nav>
  );
};
