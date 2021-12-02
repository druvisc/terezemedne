/* eslint-disable @next/next/no-img-element */

import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import type { IProject } from "../lib/projects";

import { Image, ImageSrc } from "../components/Image";

export type Props = {
  project: IProject;
  mdx: MDXRemoteSerializeResult;
};

const components = {
  img: ({ src, alt }: { src: ImageSrc; alt?: string }) => (
    <Image className="mt-8 lg:w-3/6" src={src} alt={alt} />
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
