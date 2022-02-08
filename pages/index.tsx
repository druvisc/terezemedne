import type { NextPage } from "next";

import projects, { IProject } from "../lib/projects";

import { Projects } from "../components/Projects";

export async function getStaticProps() {
  return {
    props: {
      projects: await projects.load(),
    },
  };
}

type Props = {
  projects: IProject[];
};

const HomePage: NextPage<Props> = ({ projects }) => (
  <Projects projects={projects} />
);

export default HomePage;
