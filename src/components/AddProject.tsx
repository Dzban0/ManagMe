import { useState } from "react";
import { ProjectService } from "../API/ProjectService";
import { Project } from "../types/Project";

interface AddProjectProps {
  onProjectAdded: () => void;
}

const AddProject = (props: AddProjectProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleAdd() {
    if (name === "" || description === "") {
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: name,
      description: description,
    };

    ProjectService.add(newProject);

    setName("");
    setDescription("");
    props.onProjectAdded();
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-semibold text-white mb-2">
        Dodaj nowy projekt
      </h3>
      <input
        type="text"
        placeholder="Nazwa projektu"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Opis projektu"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAdd}
        className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white font-semibold transition duration-300"
      >
        ➕ Dodaj projekt
      </button>
    </div>
  );
};

export default AddProject;
