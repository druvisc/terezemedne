import type { GetStaticProps, NextPage } from "next";
import { serialize } from "next-mdx-remote/serialize";

import about, { IAbout } from "../../lib/about";

import { About, Props as AboutProps } from "../../components/About";

export const getStaticProps: GetStaticProps = async () => {
  const data = await about.load();
  const mdx = await serialize(data?.content || "");

  return {
    props: {
      about: data,
      mdx,
    },
  };
};

const AboutPage: NextPage<AboutProps> = (props) => {
  return <About {...props} />;
};

export default AboutPage;
