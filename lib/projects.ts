import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type IProject = {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly content: string;
};

class Projects {
  private _list?: IProject[];
  private readonly dir = path.join(process.cwd(), "content/projects");

  public async byId(id: IProject["id"]): Promise<IProject | null> {
    const list = await this.list;

    return list.find((project) => project.id === id) ?? null;
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
      const id = fileName.replace(/\.md$/, "");

      const fullPath = path.join(this.dir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const {
        content,
        data: { title, date },
      } = matter(fileContents);

      return {
        id,
        title,
        date,
        content,
      } as IProject;
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
