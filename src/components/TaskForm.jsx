import { useState } from "react";
import { api } from "../services/api";

export const TaskForm = ({ storyId, onTaskAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [estimatedTime, setEstimatedTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      name,
      description,
      priority,
      estimatedTime,
      storyId,
      state: "todo",
      createdAt: new Date().toISOString(),
      assignedUserId: null,
      startDate: null,
      endDate: null,
      workHours: null,
    };

    api.addTask(newTask);
    onTaskAdded();
    setName("");
    setDescription("");
    setPriority("medium");
    setEstimatedTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-1 gap-4">
        <input type="text" placeholder="Nazwa zadania" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        <textarea
          placeholder="Opis"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option className="dark:bg-sky-700" value="low">Niski</option>
          <option className="dark:bg-sky-700" value="medium">Średni</option>
          <option className="dark:bg-sky-700" value="high">Wysoki</option>
        </select>
        <input
          type="number"
          placeholder="Osaczony godzin"
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
          Dodaj zadanie
        </button>
      </div>
    </form>
  );
};
