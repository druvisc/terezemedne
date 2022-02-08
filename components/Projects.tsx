import React, { useMemo, useState } from "react";
import Link from "next/link";
import cx from "classnames";

import type { IProject } from "../lib/projects";

import useScreenSize from "../hooks/useScreenSize";

import { Image } from "../components/Image";

import { randomInt } from "../utils";

const MIN_RANDOM_WIDTH = 325;
const MAX_RANDOM_WIDTH = 490;

export type Props = {
  projects: IProject[];
};
export const Projects = ({ projects }: Props) => {
  const { isDesktop } = useScreenSize();

  return (
    <div className="w-5/6 mx-auto">
      {isDesktop ? (
        // Two column masonry layout (keeping ordering).
        <DesktopList projects={projects} />
      ) : (
        // One column masonry layout.
        <ProjectList projects={projects} />
      )}
    </div>
  );
};

const DesktopList = ({ projects }: { projects: IProject[] }) => {
  const [list1, list2] = projects.reduce(
    (lists, project, i) => {
      if (i % 2 === 0) lists[0].push(project);
      else lists[1].push(project);

      return lists;
    },
    [[], []] as IProject[][]
  );

  return (
    <div className="flex">
      <div className="flex flex-1">
        <ProjectList projects={list1} isLeftColumn />
      </div>

      <div className="flex flex-1 mt-8 ml-12">
        <ProjectList projects={list2} />
      </div>
    </div>
  );
};

const ProjectList = ({
  projects,
  isLeftColumn = false,
}: {
  projects: IProject[];
  isLeftColumn?: boolean;
}) => {
  const { isMobile } = useScreenSize();
  const [hoveredProject, setHoveredProject] = useState<string>();

  const projectList = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        maxWidth: randomInt(MIN_RANDOM_WIDTH, MAX_RANDOM_WIDTH),
      })),

    [projects]
  );

  return (
    <ol className="w-full">
      {projectList.map((project, i) => (
        <li
          key={project.slug}
          className={cx("flex justify-center", {
            "mt-6": i !== 0,
            "lg:justify-end": isLeftColumn,
            "lg:justify-start": !isLeftColumn,
          })}
        >
          <Link href={`/projects/${project.slug}`}>
            <a
              className="w-full"
              style={{
                maxWidth: project.maxWidth,
              }}
              onMouseEnter={() => setHoveredProject(project.slug)}
              onMouseLeave={() => setHoveredProject(undefined)}
            >
              <Image src={project.image} alt={project.title} priority={i < 2} />

              <h2
                className={cx("mt-2 text-center text-gray-500", {
                  invisible: !isMobile && hoveredProject !== project.slug,
                  "lg:text-right": isLeftColumn,
                  "lg:text-left": !isLeftColumn,
                })}
              >
                {project.title}
              </h2>
            </a>
          </Link>
        </li>
      ))}
    </ol>
  );
};
