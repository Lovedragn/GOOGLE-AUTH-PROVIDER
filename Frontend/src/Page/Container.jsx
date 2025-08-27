import { useEffect, useState } from "react";
import Cards from "../Components/Cards";
import Form from "../Components/Form";

const Container = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showform, setshowform] = useState(false);

  useEffect(() => {
    const call = async () => {
      try {
        const datas = await fetch(import.meta.env.VITE_APP_PORT || "https://localhost:5000/db/get/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sub: JSON.parse(localStorage.getItem("user")).sub,
          }),
        });
        const res = await datas.json();
        const convert  = res.title.map((item , index)=>({
          title : res.title[index],
          desc : res.desc[index],
          date:res.date[index]
        })) 
        setdata(convert); // wrap single object if needed

        console.log(res)
  
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
          <div className="absolute flex items-center justify-center w-full h-screen top-0 left-0">
            <div className="bg-black/70 h-screen w-full z-1 absolute"></div>
            <Form close={setshowform} />
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
