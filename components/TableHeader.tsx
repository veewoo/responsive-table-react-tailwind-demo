import React from "react";

type TableHeaderProps = {
  tableHeader: string[];
};

const TableHeader = ({ tableHeader }: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {tableHeader?.map((x, i) => (
          <th key={"header-" + i} className="border border-slate-600 px-4 text-left">
            {x}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default React.memo(TableHeader);
