import { useState } from "react";
import { Task, TaskStatus } from "./models/Task";
import { User, users } from "./models/User";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loggedInUser, setLoggedInUser] = useState(users[0]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTaskStatus = (taskId: number, status: TaskStatus) => {
    setTasks(tasks.map((task) => task.id === taskId ? { ...task, status } : task));
  };

  const assignUserToTask = (taskId: number, user: User) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = {
            ...task,
            assignedUser: user,
            startDate: user ? new Date().toISOString() : task.startDate,
            status: "doing", // Zmieniamy status na "doing"
          };
          return updatedTask;
        }
        return task;
      })
    );
  };

  return (
    <div>
      <h1>ManagMe - Zarządzanie Projektami</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList 
        tasks={tasks} 
        updateTaskStatus={updateTaskStatus} 
        assignUserToTask={assignUserToTask} 
      />
    </div>
  );
}

export default App;