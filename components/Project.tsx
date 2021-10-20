import type { IProject } from "../lib/projects";

type Props = {
  project: IProject;
};

export const Project = ({ project }: Props) => {
  return (
    <article>
      <header>
        <h1 className="text-2xl">
          {project.title} ({project.date})
        </h1>
      </header>

      {/* TODO: Transform markdown. */}
      <main>{project.content}</main>
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
