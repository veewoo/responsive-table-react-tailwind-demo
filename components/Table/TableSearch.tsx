import React from "react";

type TableSearchProps = {
  onChange: (value: string) => void;
};

const TableSearch: React.FC<TableSearchProps> = ({ onChange }) => {
  return (
    <div className="flex justify-end items-end">
      <input
        type="text"
        className="border-2 p-2 mb-2"
        placeholder="Search"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TableSearch;
