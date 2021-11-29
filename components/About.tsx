import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import type { IAbout } from "../lib/about";

export type Props = {
  about: IAbout;
  mdx: MDXRemoteSerializeResult;
};

// TODO: Move about to json so can be re-used?
export const About = ({ about, mdx }: Props) => {
  return (
    <article>
      <main>
        <MDXRemote {...mdx} />

        <div>insta: {about.instagram}</div>
      </main>
    </article>
  );
};
