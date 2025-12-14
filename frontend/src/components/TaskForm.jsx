import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function TaskForm({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const { user } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "http://localhost:5000/api/tasks",
      { title },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    setTasks([...tasks, data]);
    setTitle("");
  };

  return (
    <form onSubmit={submitHandler} className="flex gap-3">
      <input
        className="flex-1 p-3 border rounded-lg"
        placeholder="Add new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button className="bg-indigo-600 text-white px-5 rounded-lg">
        Add
      </button>
    </form>
  );
}
