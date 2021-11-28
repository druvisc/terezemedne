import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import type { IAbout } from "../lib/about";

export type Props = {
  about: IAbout;
  mdx: MDXRemoteSerializeResult;
};

export const About = ({ about, mdx }: Props) => {
  return (
    <article>
      <header>
        <h1 className="text-2xl">{about.title}</h1>
      </header>

      <div>insta: {about.instagram}</div>

      <main>
        <MDXRemote {...mdx} />
      </main>
    </article>
  );
};
