import { Project } from "../types/Project";
import { Story } from "../types/Story";

const STORAGE_KEY = "projects";
const STORAGE_KEY_2 = "stories";

export class ProjectService {
  static getAll(): Project[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getById(id: string): Project | undefined {
    return this.getAll().find((projects) => projects.id === id);
  }

  static add(project: Project): void {
    const projects = this.getAll();
    projects.push(project);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static update(updateProject: Project): void {
    let projects = this.getAll().map((project) =>
      project.id === updateProject.id ? updateProject : project
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static delete(id: string): void {
    let projects = this.getAll().filter((project) => project.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static setActive(id: string): void {
    localStorage.setItem("ActiveProject", id);
  }

  static getActive(): string | null {
    const activeId = localStorage.getItem("ActiveProject");
    return activeId;
  }

  static getAllStories(): Story[] {
    const data = localStorage.getItem(STORAGE_KEY_2);
    return data ? JSON.parse(data) : [];
  }

  static addStories(story: Story): void {
    const stories = this.getAllStories();
    stories.push(story);
    localStorage.setItem(STORAGE_KEY_2, JSON.stringify(stories));
  }
}
