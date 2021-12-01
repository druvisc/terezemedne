/* eslint-disable @next/next/no-img-element */

import React, { useMemo } from "react";
import Link from "next/link";
import cx from "classnames";

import type { IProject } from "../lib/projects";
import useScreenSize from "../hooks/useScreenSize";

import imageMeta from "../public/images/meta.json";
import { WIDTHS } from "../constants/sharp";
// TODO: Lazy loading

export type Props = {
  projects: IProject[];
};
export const Projects = ({ projects }: Props) => {
  const { isDesktop } = useScreenSize();

  const imageSizes = useMemo(
    () =>
      Object.fromEntries(
        projects.map((project) => [project.image, getImageAttributes(project)])
      ),
    [projects]
  );

  return (
    <div className="w-5/6 mx-auto my-8">
      {isDesktop ? (
        <DesktopList projects={projects} imageSizes={imageSizes} />
      ) : (
        <ProjectList projects={projects} imageSizes={imageSizes} />
      )}
    </div>
  );
};

const DesktopList = ({
  projects,
  imageSizes,
}: {
  projects: IProject[];
  imageSizes: any;
}) => {
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
        <ProjectList projects={list1} isLeftColumn imageSizes={imageSizes} />
      </div>

      <div className="flex flex-1 ml-12">
        <ProjectList projects={list2} imageSizes={imageSizes} />
      </div>
    </div>
  );
};

const ProjectList = ({
  projects,
  isLeftColumn = false,
  imageSizes,
}: {
  projects: IProject[];
  isLeftColumn?: boolean;
  imageSizes: any;
}) => {
  const { isMobile } = useScreenSize();

  return (
    <ol>
      {projects.map((project, i) => {
        const attrs = imageSizes[project.image];

        return (
          <li key={project.slug} className={cx({ "mt-8": i !== 0 })}>
            <Link href={`/projects/${project.slug}`}>
              <a
                className={cx("flex flex-col items-center", {
                  "lg:items-end": isLeftColumn,
                  "lg:items-start": !isLeftColumn,
                })}
              >
                <img alt={project.title} {...attrs} />

                {isMobile && <h2 className="mt-4">{project.title}</h2>}
              </a>
            </Link>
          </li>
        );
      })}
    </ol>
  );
};

const imageLoader = ({ src, width }: { src: string; width: number }) => {
  const split = src.split(".");
  const ext = split[split.length - 1];

  const img = `${split
    .slice(0, split.length - 1)
    .join(".")
    .replace("uploads", "resized")}-${width}.${ext}`;

  return img;
};

const getImageAttributes = ({ image: src }: IProject) => {
  const meta = imageMeta[src];
  if (!meta) {
    throw new Error(`Missing image meta for image "${src}"!`);
  }

  const randomWidth = random();
  const scale = meta.width / randomWidth;

  return {
    width: meta.width / scale,
    height: meta.height / scale,
    sizes: "100vw",
    srcSet: WIDTHS.map(
      (width) => `${imageLoader({ src, width })} ${width}w`
    ).join(", "),
    src: imageLoader({ src, width: WIDTHS[WIDTHS.length - 1] }),
  };
};

const random = (min = 300, max = 500) => {
  let num = Math.random() * (max - min) + min;

  return Math.round(num);
};
