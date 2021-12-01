/* eslint-disable @next/next/no-img-element */

import React from "react";
import Link from "next/link";

import type { IProject, IProjectImage } from "../lib/projects";

import imageMeta from "../public/images/meta.json";

// If your application is retrieving image URLs using an API call (such as to a CMS),
// you may be able to modify the API call to return the image dimensions along with the URL.

export type Props = {
  projects: IProject[];
};

export const Projects = ({ projects }: Props) => {
  const [list1, list2] = projects.reduce(
    (lists, project, i) => {
      if (i % 2 === 0) lists[0].push(project);
      else lists[1].push(project);

      return lists;
    },
    [[], []] as IProject[][]
  );

  // wrong order when mobile
  // check media query and add mt?

  return (
    // add mt for sm screens and <lg
    <div className="flex flex-col lg:flex-row lg:mt-24">
      <div className="flex flex-1">
        <ProjectList projects={list1} />
      </div>

      <div className="flex flex-1 lg:mt-12 lg:ml-24 ">
        <ProjectList projects={list2} isRightColumn />
      </div>
    </div>
  );
};

const ProjectList = ({
  projects,
  isRightColumn = false,
}: {
  projects: IProject[];
  isRightColumn?: boolean;
}) => {
  return (
    <ol
      className={`flex flex-1 flex-col items-center lg:${
        isRightColumn ? "items-start" : "items-end"
      }`}
    >
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectPreview project={project} />
        </li>
      ))}
    </ol>
  );
};

const ProjectPreview = ({ project }: { project: IProject }) => {
  const { src, width } = getImageAttributes(project.image);

  return (
    <Link href={`/projects/${project.slug}`}>
      <a className="flex flex-col items-center">
        <img src={src} alt={project.title} style={{ width }} />

        {/* /TODO: Shown only on mobile? */}
        {project.title}
      </a>
    </Link>
  );
};

const getImageAttributes = (image: IProjectImage) => {
  const meta = imageMeta[image];
  if (!meta) throw new Error(`Missing image meta for image "${image}"!`);

  const randomWidth = random();
  const scale = meta.width / randomWidth;

  // change src etc
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
