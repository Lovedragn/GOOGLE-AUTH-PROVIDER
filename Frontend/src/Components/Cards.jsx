import React from "react";

const Cards = ({ title, desc, date, onDelete, taskIndex }) => {
  return (
    <div className="flex flex-col bg-red-400 w-80 h-40 rounded-xl p-5 relative">
      <div className="flex flex-col h-full justify-start">
        <h1>{title}</h1>
        <h3>{desc}</h3>
      </div>
      <p className="text-end w-full">{date}</p>

      <button
        onClick={() => onDelete(taskIndex)}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold transition-colors"
        title="Delete task"
      >
        ×
      </button>
    </div>
  );
};

export default Cards;
