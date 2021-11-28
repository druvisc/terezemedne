import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Project } from "../components/Project";
import projects, { IProject } from "../lib/projects";
import Link from "next/link";

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

// If your application is retrieving image URLs using an API call (such as to a CMS),
// you may be able to modify the API call to return the image dimensions along with the URL.

const HomePage: NextPage<Props> = ({ projects }) => {
  return (
    <div>
      {/* Gallery view / project list? */}
      <ol className="flex">
        {projects.map((project) => (
          <li key={project.slug}>
            <div style={{ position: "relative", width: "200px", height: "400px"}}>
              <Image
                src={project.image}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                // height="200"
                // width="200"
              />
            </div>

            {/* <Link href={`/projects/${project.slug}`}>
              <a>{project.title}</a>
            </Link> */}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default HomePage;
