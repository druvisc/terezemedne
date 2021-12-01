/* eslint-disable @next/next/no-img-element */

import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import type { IProject } from "../lib/projects";

export type Props = {
  project: IProject;
  mdx: MDXRemoteSerializeResult;
};

// TODO: IMAGE ATTRIBUTES
const components = {
  img: (image: any) => (
    <img src={image.src} alt={image.alt} height="200" width="200" />
  ),
};

export const Project = ({ project, mdx }: Props) => {
  return (
    <article className="flex flex-col items-center">
      <header>
        <h1 className="mt-8 text-2xl">{project.title}</h1>
      </header>

      <img src={project.image} alt={project.title} className="mt-8 lg:w-3/6" />

      <main className="mt-8">
        <MDXRemote components={components} {...mdx} />
      </main>
    </article>
  );
};
