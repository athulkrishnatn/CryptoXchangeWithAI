import React from "react";

const Button = ({ text, onClick, outlined = false }) => {
  return (
    <button
      onClick={onClick}
      className={`min-w-[150px] px-4 py-2 text-lg font-semibold rounded-3xl transition-all duration-300 
        ${outlined 
          ? "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white" 
          : "bg-blue-500 text-white hover:bg-blue-600"}
      `}
    >
      {text}
    </button>
  );
};

export default Button;
