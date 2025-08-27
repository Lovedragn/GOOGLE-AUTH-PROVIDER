import { useState } from "react";

const Forms = ({ close }) => {
  const [formdata, setformdata] = useState({
    title: "",
    desc: "",
  });

  const uploads = async (e) => {
    e.preventDefault();

    try {
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(`${API_BASE}/db/add/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sub: JSON.parse(localStorage.getItem("user")).sub,
          values: formdata,
        }),
      });

      const result = await response.json();
      console.log("Server response:", result);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="flex flex-col w-[30vw] top-0 bg-blue-500 border-2 z-2 text-white p-10 rounded-xl justify-between">
      <h1>Form</h1>
      <form onSubmit={(e) => uploads(e)} className="flex gap-5 flex-col">
        <input
          className="px-4 py-2 w-full border-white border rounded-full"
          type="text"
          placeholder="Title"
          name="title"
          value={formdata.title}
          onChange={(e) =>
            setformdata((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <input
          className="px-4 py-2 w-full border-white border rounded-full"
          type="text"
          placeholder="Description"
          name="desc"
          value={formdata.desc}
          onChange={(e) =>
            setformdata((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <div className="flex justify-center items-center w-full gap-5">
          <button
            type="submit"
            className="btn flex items-center justify-center w-full h-8"
          >
            Submit
          </button>
          <button
            onClick={() => close(false)}
            className="btn w-full flex items-center h-8 justify-center"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forms;
