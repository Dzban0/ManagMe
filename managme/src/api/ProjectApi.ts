import { Project } from "../types/Project";

const STORAGE_KEY = "projects";

export class ProjectApi {
  static getAll(): Project[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getById(id: string): Project | undefined {
    return this.getAll().find((project) => project.id === id);
  }

  static create(project: Project): void {
    const projects = this.getAll();
    projects.push(project);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static update(updatedProject: Project): void {
    const projects = this.getAll().map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static delete(id: string): void {
    const projects = this.getAll().filter((project) => project.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
}