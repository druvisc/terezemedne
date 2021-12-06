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
      <main className="px-4 flex flex-col items-center lg:flex-row">
        <div className="flex flex-1">
          <Image src="/images/uploads/tm.jpg" alt="Terēze Medne" sizes="50vw" />
        </div>

        <p className="mt-8 lg:mt-0 lg:ml-8 flex flex-1">
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
          interdum suscipit, sollicitudin et, dolor.
        </p>
      </main>
    </article>
  );
};
