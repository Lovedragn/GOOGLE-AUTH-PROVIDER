const Forms = () => {
  return (
    <div className=" flex flex-col h-[50vh] w-[30vw] bg-blue-500 border-2 z-2 text-white p-10 rounded-xl justify-between">
      <h1>Form</h1>
      <div>
        <form method="POST" className="flex gap-5 flex-col">
          <input
            className="flex px-4 py-2 w-full border-white border-1 rounded-full"
            type="text"
            placeholder={"Title"}
          />
          <input
            className="flex px-4 py-2 w-full border-white border-1 rounded-full"
            type="text"
            placeholder={"Descrption"}
          />
          <input
            className="flex px-4 py-2 w-full border-white border-1 rounded-full"
            type="date"
            placeholder={"Date"}
          />
        </form>
      </div>
    </div>
  );
};

export default Forms;
