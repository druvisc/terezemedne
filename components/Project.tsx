/* eslint-disable @next/next/no-img-element */

import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import YouTube from "react-youtube";

import type { IProject } from "../lib/projects";

import { Image, ImageSrc } from "../components/Image";

export type Props = {
  project: IProject;
  mdx: MDXRemoteSerializeResult;
};

// TODO: Gallery component?
const components = {
  YouTube: (props: any) => (
    <div className="my-8 flex justify-center">
      <YouTube {...props} />
    </div>
  ),
  img: ({ src, alt }: { src: ImageSrc; alt?: string }) => (
    <Image className="my-4 w-full" src={src} alt={alt} />
  ),
};

export const Project = ({ project, mdx }: Props) => {
  return (
    <article className="flex flex-col items-center">
      <components.img src={project.image} alt={project.title} />

      {project.technique && (
        <div className="mb-4 text-xs text-gray-500">{project.technique}</div>
      )}

      <main className="mt-4 px-4">
        <MDXRemote components={components} {...mdx} />
      </main>
    </article>
  );
};
