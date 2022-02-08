import React from "react";
import Link from "next/link";

export type Props = {
  instagram?: string;
};

const Title = <h1 className="uppercase">Terēze Medne</h1>;

export const Header = ({ instagram }: Props) => {
  return (
    <header className="flex justify-between">
      <Nav />

      {instagram ? (
        <Link href={`https://www.instagram.com/${instagram}/`}>
          <a target="_blank" rel="noopener noreferrer">
            {Title}
          </a>
        </Link>
      ) : (
        Title
      )}
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
