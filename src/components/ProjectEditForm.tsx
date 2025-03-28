import { useState } from "react";
import { Project } from "../types/Project";
import { ProjectApi } from "../API/ProjectApi";

export function ProjectEditForm({ project, onUpdate, onCancel }: { project: Project; onUpdate: () => void; onCancel: () => void }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ProjectApi.update({ ...project, name, description });
    onUpdate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edytuj projekt</h3>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">Zapisz zmiany</button>
      <button type="button" onClick={onCancel}>Anuluj</button>
    </form>
  );
}