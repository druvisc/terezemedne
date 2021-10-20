import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

// export async function getStaticProps() {
//   return {
//     props: {
//       projects: await projects.list,
//     },
//   };
// }

type Props = {};

const AboutPage: NextPage<Props> = ({}) => {
  return (
    <article>
      <header>
        <h1 className="text-3xl">Terēze Medne</h1>
      </header>

      <main>ABOUT ME SECTION LOADED FROM A FILE</main>
    </article>
  );
};

export default AboutPage;
