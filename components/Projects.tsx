/* eslint-disable @next/next/no-img-element */

import React from "react";
import Link from "next/link";

import type { IProject, IProjectImage } from "../lib/projects";

import imageMeta from "../public/images/meta.json";
import useScreenSize from "../hooks/useScreenSize";
import cx from "classnames";
// If your application is retrieving image URLs using an API call (such as to a CMS),
// you may be able to modify the API call to return the image dimensions along with the URL.

export type Props = {
  projects: IProject[];
};

// add lazy loading
export const Projects = ({ projects }: Props) => {
  const { isDesktop } = useScreenSize();

  const [list1, list2] = projects.reduce(
    (lists, project, i) => {
      if (i % 2 === 0) lists[0].push(project);
      else lists[1].push(project);

      return lists;
    },
    [[], []] as IProject[][]
  );

  // TODO: pass in imageattributes to projectlist, otherwise on screen change rerenders occur on sizes
  return (
    <div className="w-5/6 mx-auto my-8">
      {isDesktop ? (
        <div className="flex">
          <div className="flex flex-1">
            <ProjectList projects={list1} isLeftColumn />
          </div>

          <div className="lex flex-1 ml-12">
            <ProjectList projects={list2} />
          </div>
        </div>
      ) : (
        <ProjectList projects={projects} />
      )}
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

  return (
    <ol>
      {projects.map((project, i) => {
        const { src, width, height } = getImageAttributes(project.image);

        return (
          <li key={project.slug} className={cx({ "mt-8": i !== 0 })}>
            <Link href={`/projects/${project.slug}`}>
              <a
                className={cx("flex flex-col", {
                  "items-end": isLeftColumn,
                  "items-start": !isLeftColumn,
                })}
              >
                <img
                  src={src}
                  alt={project.title}
                  style={{ width, height: "auto" }}
                />

                {isMobile && <h2 className="mt-4">{project.title}</h2>}
              </a>
            </Link>{" "}
          </li>
        );
      })}
    </ol>
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
