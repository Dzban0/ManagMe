import { useState } from "react";
import { UserService } from "../API/UserService";
import { ProjectService } from "../API/ProjectService";
import { Link } from "react-router-dom";

const AddStory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("niski");
  const [state, setState] = useState("todo");

  const user = UserService.getLoggedUser();
  const owner = `${user.firstName} ${user.lastName}`;

  const activeProjectId = ProjectService.getActive();
  const activeProject = activeProjectId
    ? ProjectService.getById(activeProjectId)
    : null;

  function handleAdd() {
    if (
      !name ||
      !description ||
      !priority ||
      !state ||
      !owner ||
      !activeProject
    ) {
      alert("Wszystkie pola muszą być uzupełnione!");
      return;
    }

    const newStory = {
      id: Date.now().toString(),
      name,
      description,
      priority,
      project: activeProject.id,
      creationDate: new Date().toISOString(),
      state,
      owner,
    };

    ProjectService.addStories(newStory);

    setName("");
    setDescription("");
    setPriority("niski");
    setState("todo");
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-semibold text-white mb-2">
        Dodaj nową historyjkę
      </h3>

      <input
        type="text"
        placeholder="Nazwa Historyjki"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Opis historyjki"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="pt-7">
        Priorytet:
        <select
          className="text-green-600 mr-6"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="niski">niski</option>
          <option value="średni">średni</option>
          <option value="wysoki">wysoki</option>
        </select>
        Stan:
        <select
          className="text-green-600"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="todo">todo</option>
          <option value="doing">doing</option>
          <option value="done">done</option>
        </select>
      </div>

      <div className="pt-10">
        <p>Autor: {owner}</p>
      </div>

      <button
        onClick={handleAdd}
        className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white font-semibold transition duration-300"
      >
        ➕ Dodaj historyjkę
      </button>
      <div className="w-20 mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold">
        <Link to={"/"}>Menu</Link>
      </div>
    </div>
  );
};

export default AddStory;
