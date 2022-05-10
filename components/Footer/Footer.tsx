import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-4 text-center">
      Created by{" "}
      <a
        className="text-cyan-400"
        href="https://github.com/veewoo"
        target="_black"
      >
        Veewoo
      </a>
    </footer>
  );
};

export default React.memo(Footer);
