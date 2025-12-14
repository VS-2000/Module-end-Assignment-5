import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function TaskItem({ task, tasks, setTasks }) {
  const { user } = useAuth();

  const toggleTask = async () => {
    const { data } = await axios.put(
      `http://localhost:5000/api/tasks/${task._id}`,
      { completed: !task.completed },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    setTasks(tasks.map(t => (t._id === data._id ? data : t)));
  };

  const deleteTask = async () => {
    await axios.delete(
      `http://localhost:5000/api/tasks/${task._id}`,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    setTasks(tasks.filter(t => t._id !== task._id));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <span className={task.completed ? "line-through text-gray-400" : ""}>
        {task.title}
      </span>
      <div className="flex gap-3">
        <button onClick={toggleTask} className="text-indigo-600">✓</button>
        <button onClick={deleteTask} className="text-red-500">✕</button>
      </div>
    </div>
  );
}
