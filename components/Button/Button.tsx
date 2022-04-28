import React from "react";

interface ButtonProps {
  content: string;
  onClick: Function;
}

const Button: React.FC<ButtonProps> = ({ content, onClick }) => {
  return (
    <button
      className="border border-slate-600 p-2"
      onClick={() => typeof onClick === "function" && onClick()}
    >
      {content}
    </button>
  );
};

export default React.memo(Button);
