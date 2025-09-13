import { useEffect, useState } from "react";
import Cards from "../Components/Cards";
import Form from "../Components/Form";
import { getStoredUser } from "../utils/localStorage";

const Container = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    try {
      const API_URL =await import.meta.env.VITE_APP_PORT || "http://localhost:5000";
      
      // Safely get user from localStorage
      const user = getStoredUser();
      if (!user || !user.sub) {
        console.error("No valid user data found in localStorage");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/db/get/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sub: user.sub,
        }),
      });

      const res = await response.json();
      const converted = res.title.map((_, index) => ({
        title: res.title[index],
        desc: res.desc[index],
        date: res.date[index],
      }));

      setData(converted);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskIndex) => {
    try {
      const API_URL =
        import.meta.env.VITE_APP_PORT || "http://localhost:5000";
      
      // Safely get user from localStorage
      const user = getStoredUser();
      if (!user || !user.sub) {
        console.error("No valid user data found in localStorage");
        return;
      }

      const response = await fetch(`${API_URL}/db/delete/tasks`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sub: user.sub,
          taskIndex: taskIndex,
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log("Task deleted successfully:", result.message);
        // Refresh the tasks after deletion
        await fetchTasks();
      } else {
        console.error("Failed to delete task:", result.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
 
      {showForm && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/70"></div>
          <Form close={setShowForm} />
        </div>
      )}
   
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Your Tasks</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => setShowForm(!showForm)}
        >
          Add +
        </button>
      </div>


      {loading ? (
        <h1 className="text-center text-lg">Loading...</h1>
      ) : data.length === 0 ? (
        <h1 className="text-center text-lg text-gray-500">
          No tasks found
        </h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <Cards
              key={index}
              title={item.title}
              desc={item.desc}
              date={item.date}
              taskIndex={index}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Container;
