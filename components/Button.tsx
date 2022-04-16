import React from "react";

interface ButtonProps {
  content: string;
  onButtonClick: Function;
}

const Button = ({ content, onButtonClick }: ButtonProps) => {
  return (
    <button
      className="ml-2 border border-slate-600 p-2"
      onClick={() => {
        typeof onButtonClick === "function" && onButtonClick();
      }}
    >
      {content}
    </button>
  );
};

export default React.memo(Button);
