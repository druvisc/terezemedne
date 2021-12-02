import React from "react";
import Link from "next/link";
import cx from "classnames";

import type { IProject } from "../lib/projects";
import useScreenSize from "../hooks/useScreenSize";
import { RandomWidthImage } from "../components/Image";

// TODO: Lazy loading

export type Props = {
  projects: IProject[];
};
export const Projects = ({ projects }: Props) => {
  const { isDesktop } = useScreenSize();

  return (
    <div className="w-5/6 mx-auto my-4 lg:my-12">
      {isDesktop ? (
        <DesktopList projects={projects} />
      ) : (
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

      <div className="flex flex-1 ml-12">
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

  const ProjectLink: React.FC<{ slug: string }> = ({ slug, children }) => (
    <Link href={`/projects/${slug}`}>
      <a>{children}</a>
    </Link>
  );

  return (
    <ol>
      {projects.map((project, i) => (
        <li
          key={project.slug}
          className={cx("flex flex-col items-center", {
            "mt-6 lg:mt-8": i !== 0,
            "lg:items-end": isLeftColumn,
            "lg:items-start": !isLeftColumn,
          })}
        >
          <ProjectLink slug={project.slug}>
            <RandomWidthImage
              className="inline-block"
              src={project.image}
              alt={project.title}
            />
          </ProjectLink>

          {isMobile && (
            <div className="mt-2 inline-block">
              <ProjectLink slug={project.slug}>
                <h2>{project.title}</h2>
              </ProjectLink>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
};
