/* eslint-disable @next/next/no-img-element */

import React from "react";
import Link from "next/link";

import type { IProject, IProjectImage } from "../lib/projects";

import imageMeta from "../public/images/meta.json";

export type Props = {
  projects: IProject[];
};

type ProjectPair = [IProject, IProject] | [IProject, undefined];

// TODO: add lazy loading
export const Projects = ({ projects }: Props) => {
  return (
    <div
      className="w-5/6 mx-auto flex flex-wrap"
      style={{ flexFlow: "column wrap", height: "2000px" }}
    >
      {projects.map((project, i) => (
        <div
          className={`mt-12 flex`}
          key={project.title}
          // style={{ flex: "1 0 50%" }}
        >
          <ProjectPreview project={project} />
        </div>
      ))}
    </div>
  );
};

const ProjectPreview = ({ project }: { project: IProject }) => {
  const { src, width, height } = getImageAttributes(project.image);

  return (
    <Link href={`/projects/${project.slug}`}>
      <a className="flex flex-col items-center">
        <img
          src={src}
          alt={project.title}
          style={{ width, height: "auto", maxWidth: "50%" }}
        />

        {/* /TODO: Shown only on mobile? */}
        {/* {project.title} */}
      </a>
    </Link>
  );
};

const getImageAttributes = (image: IProjectImage) => {
  const meta = imageMeta[image];
  if (!meta) throw new Error(`Missing image meta for image "${image}"!`);

  const randomWidth = random();
  const scale = meta.width / randomWidth;

  // TODO: change src etc
  return {
    src: image,
    width: meta.width / scale,
    height: meta.height / scale,
  };
};

const random = (min = 250, max = 800) => {
  let num = Math.random() * (max - min) + min;

  return Math.round(num);
};
