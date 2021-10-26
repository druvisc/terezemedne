import React from "react";

import type { IProject } from "../lib/projects";

export type Props = {
  project: IProject;
};

export const ProjectPreview = ({ project }: Props) => {
  return (
    <>
      {project.title} ({project.date})
    </>
  );
};
