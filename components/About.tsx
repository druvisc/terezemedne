import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import type { IAbout } from "../lib/about";

import { Image } from "../components/Image";

export type Props = {
  about: IAbout;
  mdx: MDXRemoteSerializeResult;
};

// TODO: Move about to json so can be re-used?
export const About = ({ about, mdx }: Props) => {
  return (
    <article>
      <main>
        <Image useOriginal src="/images/uploads/tm.jpg" />
        {/* <MDXRemote {...mdx} />

        <div>insta: {about.instagram}</div> */}

        <p className="mt-4 lg:mt-8 px-4">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vivamus
          porttitor turpis ac leo. Nulla quis diam. Maecenas libero. Nam quis
          nulla. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin
          et, dolor. Donec iaculis gravida nulla. Pellentesque pretium lectus id
          turpis. Phasellus rhoncus. Nulla quis diam. Integer vulputate sem a
          nibh rutrum consequat. Curabitur vitae diam non enim vestibulum
          interdum. Nulla quis diam. Nullam lectus justo, vulputate eget mollis
          sed, tempor sed magna. Nunc auctor. Nullam sapien sem, ornare ac,
          nonummy non, lobortis a enim. Quisque porta. Integer pellentesque quam
          vel velit. Etiam commodo dui eget wisi. Duis sapien nunc, commodo et,
          interdum suscipit, sollicitudin et, dolor.{" "}
        </p>
      </main>
    </article>
  );
};
