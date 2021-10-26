import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import type { IProject } from "../lib/projects";

export type Props = {
  project: IProject;
  mdx: MDXRemoteSerializeResult;
};

export const Project = ({ project, mdx }: Props) => {
  return (
    <article>
      <header>
        <h1 className="text-2xl">
          {project.title} ({project.date})
        </h1>
      </header>

      {/* TODO: Transform markdown. */}
      <main>
        <MDXRemote {...mdx} />
      </main>
    </article>
  );
};

export const Preview = ({ project }: Props) => {
  return (
    <>
      {project.title} ({project.date})
    </>
  );
};
