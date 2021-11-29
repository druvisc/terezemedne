import React from "react";

import Image from "next/image";
import Link from "next/link";

import type { IProject } from "../lib/projects";

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

  return (
    <div className="lg:mt-24 flex flex-col lg:flex-row lg:justify-center">
      <ProjectList projects={list1} />

      <div className="lg:ml-24 lg:mt-12">
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
      className={`flex flex-col items-center lg:${
        isRightColumn ? "items-start" : "items-end"
      }`}
    >
      {projects.map((project) => (
        <li key={project.slug}>
          {/* TODO: Shown only on mobile? */}
          <Link href={`/projects/${project.slug}`}>
            <a className="flex flex-col items-center">
              {/* TODO: Fix / use margin-top instead of showing somewhere below 500px. */}
              <div
                style={{
                  position: "relative",
                  width: "200px",
                  height: "250px",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>

              {project.title}
            </a>
          </Link>
        </li>
      ))}
    </ol>
  );
};

const getImageSize = (dimensions: string) => {
  const width = 200;
};
