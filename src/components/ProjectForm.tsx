import { useState } from "react";
import { Project } from "../types/Project";
import { ProjectApi } from "../API/ProjectApi";

export function ProjectForm({ onProjectAdded }: { onProjectAdded: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = { id: crypto.randomUUID(), name, description };
    ProjectApi.create(newProject);
    setName("");
    setDescription("");
    onProjectAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nazwa projektu" value={name} onChange={(e) => setName(e.target.value)} required />
      <textarea placeholder="Opis projektu" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">Dodaj projekt</button>
    </form>
  );
}
