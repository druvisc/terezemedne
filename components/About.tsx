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
      <main className="px-4 flex flex-col items-center lg:flex-row lg:items-start">
        <div className="w-full flex flex-1 lg:w-auto">
          <Image
            src={about.image}
            alt={about.fullName}
            sizes={{ lg: "592px" }}
          />
        </div>

        <div className="mt-8 lg:ml-8 flex flex-1">
          <MDXRemote {...mdx} />
        </div>
      </main>
    </article>
  );
};
