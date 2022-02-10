import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import YouTube from "react-youtube";

import type { IProject } from "../lib/projects";

import { Image, ImageProps } from "../components/Image";

import { MAX_WIDTH_PX } from "../styles/variables";

export type Props = {
  project: IProject;
  mdx: MDXRemoteSerializeResult;
};

const components = {
  p: ({ children }: any) => <p className="w-full text-center">{children}</p>,

  img: ({ src }: ImageProps) => (
    <Image
      containHeight
      src={src}
      alt=""
      className="my-4"
      sizes={{ lg: MAX_WIDTH_PX }}
    />
  ),

  YouTube: (props: any) => (
    <div className="my-4 w-full">
      <YouTube
        {...props}
        containerClassName="youtube-container"
        opts={{
          playerVars: {
            modestbranding: 1, // Doesn't work.
            // controls: 0, // Removes the possibility to change volume.
            rel: 0, // Do not display related videos (only same channel).
          },
        }}
      />
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

      <main className="w-full flex flex-col items-center mt-4 lg:mt-8 px-4">
        <MDXRemote components={components} {...mdx} />
      </main>
    </article>
  );
};
