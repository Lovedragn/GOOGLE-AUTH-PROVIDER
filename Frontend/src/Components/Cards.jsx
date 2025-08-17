import React from "react";

const Cards = ({ title, desc, date }) => {
  return (
    <div className="flex flex-col bg-red-400 w-80 h-40 rounded-xl p-5">
      <div className="flex flex-col h-full justify-start">
        <h1>{title}</h1>
        <h3>{desc}</h3>
      </div>
      <p className=" text-end w-full"> {date}</p>
    </div>
  );
};

export default Cards;
