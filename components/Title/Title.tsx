import React from "react";

const Title: React.FC = () => {
  return (
    <h1 className="text-6xl mb-6">
      Welcome to{" "}
      <a href="" className="text-green-400">
        Movie Listing
      </a>
    </h1>
  );
};

export default React.memo(Title);
