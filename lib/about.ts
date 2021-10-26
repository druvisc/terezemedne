import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";

export type IAbout = {
  readonly title: string;
  readonly instagram: string;
  readonly content: string;
};

class Projects {
  private _data?: IAbout;
  private readonly dir = path.join(process.cwd(), "content/about");

  public async load(): Promise<IAbout> {
    if (!this._data) {
      this._data = await this._load();
    }

    console.log("this._data:", this._data);
    return this._data;
  }

  private _load(): IAbout {
    const fileNames = fs.readdirSync(this.dir);

    // Load first file as About.
    const about = fileNames.map((fileName) => {
      const fullPath = path.join(this.dir, fileName);
      const source = fs.readFileSync(fullPath, "utf8");

      const {
        data: { title, instagram },
        content,
      } = matter(source, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });

      return {
        title,
        instagram,
        content,
      };
    })[0];

    return about;
  }
}

export default new Projects();
