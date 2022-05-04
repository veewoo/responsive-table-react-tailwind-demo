import React from "react";
import { SortConfig } from "../../business/types";

type TableHeaderProps = {
  tableHeader: string[];
  sortConfig: SortConfig;
  onHeaderClick: Function;
};

const ArrowIcon: React.FC<{ isAsc: boolean }> = ({ isAsc }) => {
  return isAsc ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={"2"}
    >
      <path
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={"2"}
    >
      <path
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        d="M5 15l7-7 7 7"
      />
    </svg>
  );
};

const TableHeader: React.FC<TableHeaderProps> = ({
  tableHeader,
  sortConfig,
  onHeaderClick,
}) => {
  return (
    <thead>
      <tr>
        {tableHeader?.map((x, i) => (
          <th
            key={"header-" + i}
            className="border border-slate-600 px-4 text-left"
            onClick={() =>
              typeof onHeaderClick === "function" && onHeaderClick(i)
            }
          >
            <a className="w-full flex justify-between cursor-pointer">
              <span>{x}</span>
              {sortConfig.index === i ? (
                <ArrowIcon isAsc={sortConfig.isAsc} />
              ) : null}
            </a>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default React.memo(TableHeader);
