import { Task } from "../models/Task";
import { User, users } from "../models/User";

interface TaskListProps {
  tasks: Task[];
  updateTaskStatus: (taskId: number, status: "todo" | "doing" | "done") => void;
  assignUserToTask: (taskId: number, user: User) => void;
}

export const TaskList = ({ tasks, updateTaskStatus, assignUserToTask }: TaskListProps) => {
  return (
    <div>
      <h2>Lista zadań</h2>
      <div className="kanban">
        {["todo", "doing", "done"].map((status) => (
          <div key={status} className="kanban-column">
            <h3>{status}</h3>
            {tasks.filter((task) => task.status === status).map((task) => (
              <div key={task.id} className="task">
                <h4>{task.name}</h4>
                <p>{task.description}</p>
                <button onClick={() => updateTaskStatus(task.id, status === "doing" ? "done" : "doing")}>
                  {status === "doing" ? "Zakończ" : "Rozpocznij"}
                </button>
                {status === "todo" && (
                  <select onChange={(e) => assignUserToTask(task.id, users[parseInt(e.target.value)])}>
                    <option value="">Przypisz użytkownika</option>
                    {users.filter((user) => user.role !== "admin").map((user, index) => (
                      <option key={user.id} value={index}>
                        {user.name} ({user.role})
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};