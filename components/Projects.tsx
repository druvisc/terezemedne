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

type ProjectPair = [IProject, IProject] | [IProject, undefined];

export const Projects = ({ projects }: Props) => {
  const pairs = projects.reduce(function (result, value, index, array) {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2) as ProjectPair);
    }

    return result;
  }, [] as ProjectPair[]);

  return (
    <div className="w-5/6 mx-auto">
      {pairs.map(([project1, project2], i) => (
        <div
          className={"flex flex-col items-center lg:flex-row"}
          key={`${project1.slug}-${project2?.slug}`}
        >
          <div
            className={`flex flex-1 ${i === 0 ? "" : "mt-12"} ${
              project2 ? "justify-end" : "justify-center"
            }`}
          >
            {/* <div className={`flex flex-1 justify-end mt-12`}> */}
            <ProjectPreview project={project1} />
          </div>

          {project2 && (
            <div className={`flex flex-1 mt-12 lg:ml-12`}>
              <ProjectPreview project={project2} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ProjectPreview = ({ project }: { project: IProject }) => {
  const { src, width } = getImageAttributes(project.image);

  return (
    <Link href={`/projects/${project.slug}`}>
      <a className="flex flex-col items-center">
        <img src={src} alt={project.title} style={{ width }} />

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
