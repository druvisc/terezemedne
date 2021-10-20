import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Project } from "../../components/Project";
import projects, { IProject } from "../../lib/projects";

// TODO: fallback, go to home etc?
export const getStaticPaths: GetStaticPaths = async () => {
  const list = await projects.list;

  return {
    paths: list.map(({ id }) => `/projects/${id}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.project as IProject["id"];
  const project = await projects.byId(id);

  // const { content, data } = matter(source, {
  //   engines: {
  //     yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
  //   },
  // });
  // const mdxSource = await renderToString(content, { components, scope: data });

  return {
    props: {
      project,
    },
  };
};

type Props = {
  project: IProject;
};

const ProjectPage: NextPage<Props> = ({ project }) => {
  return <Project project={project} />;
};

export default ProjectPage;
