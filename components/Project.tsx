/* eslint-disable @next/next/no-img-element */

import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import type { IProject } from "../lib/projects";

export type Props = {
  project: IProject;
  mdx: MDXRemoteSerializeResult;
};

const components = {
  img: (image: any) => (
    <img src={image.src} alt={image.alt} height="200" width="200" />
  ),
};

export const Project = ({ project, mdx }: Props) => {
  return (
    <article>
      <header>
        <h1 className="text-2xl">{project.title}</h1>
      </header>

      <main className="flex flex-col items-center">
        <MDXRemote components={components} {...mdx} />
      </main>
    </article>
  );
};
