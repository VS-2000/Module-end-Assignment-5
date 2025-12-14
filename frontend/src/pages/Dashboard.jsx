import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks", config)
      .then(res => setTasks(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <button onClick={logout} className="text-red-500 font-semibold">
            Logout
          </button>
        </div>

        <TaskForm setTasks={setTasks} tasks={tasks} />

        <div className="mt-6 space-y-4">
          {tasks.map(task => (
            <TaskItem key={task._id} task={task} setTasks={setTasks} tasks={tasks} />
          ))}
        </div>
      </div>
    </div>
  );
}
