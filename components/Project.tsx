/* eslint-disable @next/next/no-img-element */

import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import YouTube from "react-youtube";

import type { IProject } from "../lib/projects";

import { Image, ImageSrc } from "../components/Image";

// TODO: How to display 2 sequential images side by side?

export type Props = {
  project: IProject;
  mdx: MDXRemoteSerializeResult;
};

const components = {
  YouTube: (props: any) => (
    <div className="my-4 w-full">
      <YouTube
        {...props}
        containerClassName="youtube-container"
        opts={{
          playerVars: {
            modestbranding: 1, // Doesn't work.
            controls: 0, // Removes the possibility to change volume.
            rel: 0, // Do not display related videos (only same channel).
          },
        }}
      />
    </div>
  ),
  img: ({ src, alt }: { src: ImageSrc; alt?: string }) => (
    <div className="my-4">
      <Image src={src} alt={alt} style={{ width: "auto", maxHeight: "80vh" }} />
    </div>
  ),
};

export const Project = ({ project, mdx }: Props) => {
  return (
    <article className="lg:my-8 flex flex-col items-center">
      {project.youtubeId ? (
        <components.YouTube videoId={project.youtubeId} />
      ) : (
        <components.img src={project.image} alt={project.title} />
      )}

      {project.technique && (
        <div className="text-xs text-gray-500">{project.technique}</div>
      )}

      <main className="lg:mt-8 px-4">
        <MDXRemote components={components} {...mdx} />
      </main>
    </article>
  );
};
