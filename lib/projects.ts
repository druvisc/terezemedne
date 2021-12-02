import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";

import imageMeta from "../public/images/meta.json";

export type IProjectImage = keyof typeof imageMeta;

export type IProject = {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly image: IProjectImage;
  readonly content: string;
};

// TODO: Use slug with date in filename, but listing staticpaths, map to only slug.
class Projects {
  private _data?: IProject[];
  private readonly dir = path.join(process.cwd(), "content/projects");

  public async bySlug(slug: IProject["slug"]): Promise<IProject | null> {
    const list = await this.load();

    return list.find((project) => project.slug === slug) ?? null;
  }

  public async load(): Promise<IProject[]> {
    if (!this._data) {
      this._data = await this._load();
    }

    return this._data;
  }

  private _load(): IProject[] {
    const fileNames = fs.readdirSync(this.dir);
    const projects = fileNames.map((fileName) => {
      const fullPath = path.join(this.dir, fileName);
      const source = fs.readFileSync(fullPath, "utf8");
      const slug = fileName.split(".").slice(0, -2).join(".");

      // TODO: Remove number parsing from schema.
      const {
        data: { title, date, image },
        content,
      } = matter(source, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });

      const project = {
        slug,
        title,
        date,
        image,
        content,
      } as IProject;

      return project;
    });

    return projects.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}

export default new Projects();
