import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Project } from "../components/Project";
import projects, { IProject } from "../lib/projects";
import Link from "next/link";

export async function getStaticProps() {
  return {
    props: {
      projects: await projects.list,
    },
  };
}

type Props = {
  projects: IProject[];
};

const HomePage: NextPage<Props> = ({ projects }) => {
  return (
    <div>
      {/* Gallery view / project list? */}
      <ul>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`}>
              <a>{project.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
