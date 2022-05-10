import React from "react";

const Title: React.FC = () => {
  return (
    <div className="mb-6">
      <h1 className="text-6xl mb-2">
        Welcome to{" "}
        <a href="" className="text-green-400">
          Movie Listing
        </a>
      </h1>
      <h2 className="text-xl">
        A demo responsive table with searching, pagination, and sorting
        functions. <br />
        Styled by{" "}
        <a
          className="text-cyan-400"
          href="https://tailwindcss.com/"
          target="_blank"
        >
          Tailwindcss
        </a>{" "}
        and fetched the data via{" "}
        <a
          className="text-cyan-400"
          href="https://gist.github.com/tiangechen/b68782efa49a16edaf07dc2cdaa855ea"
          target="_blank"
        >
          tiangechen's movies.csv
        </a>
        .
      </h2>
    </div>
  );
};

export default React.memo(Title);
