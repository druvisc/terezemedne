import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import type { IAbout } from "../lib/about";

import { Image } from "../components/Image";

export type Props = {
  about: IAbout;
  mdx: MDXRemoteSerializeResult;
};

export const About = ({ about, mdx }: Props) => {
  return (
    <article>
      <main className="px-4 flex flex-col items-center lg:flex-row">
        <div className="flex flex-1">
          <Image src={about.image} alt={about.fullName} sizes="50vw" />
        </div>

        <p className="mt-8 lg:mt-0 lg:ml-8 flex flex-1">
          <MDXRemote {...mdx} />
        </p>
      </main>
    </article>
  );
};
