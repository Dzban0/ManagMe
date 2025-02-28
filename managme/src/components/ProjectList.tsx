import { useState, useEffect } from "react";
import { Project } from "../types/Project";
import { ProjectApi } from "../api/ProjectApi";
import { ProjectEditForm } from "./ProjectEditForm";

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    setProjects(ProjectApi.getAll());
  }, []);

  const handleDelete = (id: string) => {
    ProjectApi.delete(id);
    setProjects(ProjectApi.getAll());
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleUpdate = () => {
    setEditingProject(null);
    setProjects(ProjectApi.getAll());
  };

  return (
    <div>
      <h2>Lista projektów</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.name}</strong> - {project.description}
            <button onClick={() => handleEdit(project)}>Edytuj</button>
            <button onClick={() => handleDelete(project.id)}>Usuń</button>
          </li>
        ))}
      </ul>
      {editingProject && (
        <ProjectEditForm project={editingProject} onUpdate={handleUpdate} onCancel={() => setEditingProject(null)} />
      )}
    </div>
  );
}