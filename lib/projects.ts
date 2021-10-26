import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type IProject = {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly content: string;
};

// TODO: Use slug with date in filename, but listing staticpaths, map to only slug.
class Projects {
  private _list?: IProject[];
  private readonly dir = path.join(process.cwd(), "content/projects");

  public async bySlug(slug: IProject["slug"]): Promise<IProject | null> {
    const list = await this.list;

    return list.find((project) => project.slug === slug) ?? null;
  }

  public get list() {
    return this.load();
  }

  private async load() {
    if (!this._list) {
      this._list = await this.getList();
    }

    return this._list;
  }

  private getList(): IProject[] {
    const fileNames = fs.readdirSync(this.dir);
    const projects = fileNames.map((fileName) => {
      const fullPath = path.join(this.dir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const {
        data: { slug, title, date },
        content,
      } = matter(fileContents);

      const project = {
        slug,
        title,
        date,
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
