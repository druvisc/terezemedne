import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serialize } from "next-mdx-remote/serialize";

import projects, { IProject } from "../../lib/projects";
import { Project, Props as ProjectProps } from "../../components/Project";

// TODO: fallback, go to home etc? auto slugs.
export const getStaticPaths: GetStaticPaths = async () => {
  const list = await projects.load();

  return {
    paths: list.map(({ slug }) => `/projects/${slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.project as IProject["slug"];
  const project = await projects.bySlug(slug);
  const mdx = await serialize(project?.content || "");

  return {
    props: {
      project,
      mdx,
    },
  };
};

const ProjectPage: NextPage<ProjectProps> = (props) => {
  return <Project {...props} />;
};

export default ProjectPage;
