import { useState } from "react";
import { Task } from "../models/Task";
import { User, users } from "../models/User";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

export const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [story, setStory] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      id: Date.now(),
      name,
      description,
      priority,
      story,
      estimatedTime,
      status: "todo",
      creationDate: new Date().toISOString(),
    };

    onAddTask(newTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nazwa zadania"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}>
        <option value="low">Niski</option>
        <option value="medium">Średni</option>
        <option value="high">Wysoki</option>
      </select>
      <input
        type="text"
        placeholder="Historyjka"
        value={story}
        onChange={(e) => setStory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Czas w godzinach"
        value={estimatedTime}
        onChange={(e) => setEstimatedTime(Number(e.target.value))}
      />
      <button type="submit">Dodaj zadanie</button>
    </form>
  );
};