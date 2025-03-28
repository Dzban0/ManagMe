import { useState, useEffect } from "react";
import { Project } from "../types/Project";
import { ProjectService } from "../API/ProjectService";
import AddProject from "./AddProject";
import DeleteProject from "./DeleteProject";
import { useNavigate } from "react-router";

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setProjects(ProjectService.getAll());
  }, []);

  function refreshProjects() {
    setProjects(ProjectService.getAll());
  }

  function startEditing(project: Project) {
    setEditingId(project.id);
    setEditName(project.name);
    setEditDescription(project.description);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  }

  function setActive(project: Project) {
    ProjectService.setActive(project.id);
    navigate("/ShowActiveProject");
  }

  function saveEdit() {
    if (editName === "" || editDescription === "" || editingId === null) {
      return;
    }

    const updatedProject: Project = {
      id: editingId,
      name: editName,
      description: editDescription,
    };

    ProjectService.update(updatedProject);
    cancelEditing();
    refreshProjects();
  }

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          📂 Lista projektów
        </h2>

        <AddProject onProjectAdded={refreshProjects} />

        <ul className="mt-4 space-y-4">
          {projects.map((project) => {
            if (editingId === project.id) {
              return (
                <li
                  key={project.id}
                  className="p-4 bg-gray-800 rounded-lg shadow-md flex flex-col space-y-2"
                >
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white font-semibold"
                    >
                      ✅ Zapisz
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-white font-semibold"
                    >
                      ❌ Anuluj
                    </button>
                  </div>
                </li>
              );
            } else {
              return (
                <li
                  key={project.id}
                  className="p-4 bg-gray-800 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <span className="font-semibold">{project.name}</span>
                    <p className="text-gray-400 text-sm">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(project)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold"
                    >
                      ✏️ Edytuj
                    </button>
                    <DeleteProject
                      id={project.id}
                      onProjectDeleted={refreshProjects}
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => setActive(project)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold"
                    >
                      Aktywny
                    </button>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;
