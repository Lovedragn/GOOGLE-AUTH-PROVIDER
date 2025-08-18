import React, { useEffect, useState } from "react";
import Cards from "../Components/Cards";
import Form from "../Components/Form";

const Container = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showform, setshowform] = useState(false);

  useEffect(() => {
    const call = async () => {
      try {
        const datas = await fetch("http://localhost:5000/db/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sub: JSON.parse(localStorage.getItem("user")).sub,
          }),
        });
        const res = await datas.json();
        setdata(Array.isArray(res) ? res : [res]); // wrap single object if needed
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    call();
  }, []);

  return (
    <div className="flex gap-5 justify-center">
      <div>
        {showform ? (
          <div className="absolute top-0 left-0 flex justify-center bg-black/30 items-center h-screen w-full ">
            <div className="flex w-auto h-auto justify-end">
              <button
                className="btn rounded-[120%] bg-red-600 absolute z-4 top-10"
                onClick={() => setshowform(!showform)}
              >
                X
              </button>
            </div>
            <Form />
          </div>
        ) : (
          ""
        )}
        <button className="btn " onClick={() => setshowform(!showform)}>
          Add+
        </button>
      </div>
      {loading ? (
        <h1>Loading..</h1>
      ) : data.length === 0 ? (
        <h1>No tasks found</h1>
      ) : (
        data.map((item, index) => (
          <Cards
            key={index}
            title={item.title}
            desc={item.desc}
            date={item.date}
          />
        ))
      )}
    </div>
  );
};

export default Container;
