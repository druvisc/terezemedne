import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";

import { UploadSrc } from "../loaders/resizedLoader";

export type IAbout = {
  readonly fullName: string;
  readonly image: UploadSrc;
  readonly content: string;
};

class Projects {
  private _data?: IAbout;
  private readonly file = path.join(process.cwd(), "content/about.mdx");

  public async load(): Promise<IAbout> {
    if (!this._data) {
      this._data = await this._load();
    }

    return this._data;
  }

  private _load(): IAbout {
    const source = fs.readFileSync(this.file, "utf8");

    const {
      data: { fullName, image },
      content,
    } = matter(source, {
      engines: {
        yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
      },
    });

    return {
      fullName,
      image,
      content,
    };
  }
}

export default new Projects();
