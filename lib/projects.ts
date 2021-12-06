import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";

import { ImageSrc } from "../components/Image";

export type IProject = {
  readonly slug: string;
  readonly title: string;
  readonly order?: number;
  readonly date: string;
  readonly image: ImageSrc;
  readonly youtubeId?: string;
  readonly technique?: string;
  readonly content: string;
};

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

      const slug = fileName.split(".").slice(0, -1).join(".");

      const {
        data: {
          title,
          order = null,
          date,
          image,
          youtubeId = null,
          technique = null,
        },
        content,
      } = matter(source, {
        engines: {
          // TODO: Remove number parsing from schema.
          // TODO: Shitty engine doesn't change undefined to null.
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });

      const project = {
        slug,
        title,
        order,
        date,
        image,
        youtubeId,
        technique,
        content,
      } as IProject;

      return project;
    });

    return projects.sort((a, b) => {
      if (a.order && b.order) return a.order - b.order;
      if (a.order || b.order) return 1;

      if (a.date < b.date) return 1;

      return -1;
    });
  }
}

export default new Projects();
