import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../../business/constants";
import { SortConfig } from "../../business/types";
import TableHeader from "./TableHeader";

type TableProps = {
  keyword: string;
  pageNumber: number;
  onTableDataChange: Function;
  tableData: string[][];
};

const URL =
  "https://gist.githubusercontent.com/tiangechen/b68782efa49a16edaf07dc2cdaa855ea/raw/0c794a9717f18b094eabab2cd6a6b9a226903577/movies.csv";

const Table: React.FC<TableProps> = ({
  onTableDataChange,
  pageNumber,
  keyword,
  tableData,
}) => {
  const [tableHeader, setTableHeader] = useState<string[]>([]);
  const [tableRows, setTableRows] = useState<string[][]>([]);
  const [filteredTableRows, setFilteredTableRows] = useState<string[][]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    index: -1,
    isAsc: true,
  });

  // Fetch data from the API
  useEffect(() => {
    const arr = [...tableData];
    setTableHeader(arr.shift() || []);
    arr.length > 0 && setTableRows(arr);
  }, [tableData]);

  // Filter the table by the keyword
  useEffect(() => {
    setFilteredTableRows([
      ...tableRows.filter(
        (row) =>
          !keyword ||
          (keyword && row.some((cell) => cell.toLowerCase().includes(keyword)))
      ),
    ]);
  }, [keyword, tableRows]);

  useEffect(() => {
    onTableDataChange(filteredTableRows.length);
  }, [filteredTableRows]);

  const updateSortConfig = (index: number) => {
    const isAsc = index === sortConfig.index ? !sortConfig.isAsc : true;
    setSortConfig({ index, isAsc });
  };

  return (
    <div className="md:overflow-x-auto mb-4">
      <table className="border-collapse border border-slate-500 table-auto w-full">
        {tableHeader.length !== 0 && (
          <TableHeader
            tableHeader={tableHeader}
            sortConfig={sortConfig}
            onHeaderClick={updateSortConfig}
          />
        )}
        <tbody>
          {filteredTableRows
            .sort((a, b) => sortTable(a, b, sortConfig.index, sortConfig.isAsc))
            .slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE)
            .map((row, index) => (
              <tr
                className={`block md:table-row ${
                  index % 2 === 0 ? "" : "bg-slate-200"
                }`}
                key={"row-" + index}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={"cell-" + cellIndex}
                    className="block md:table-cell border border-slate-600 px-4"
                  >
                    <div className="flex flex-wrap">
                      <span className="md:hidden font-bold">
                        {tableHeader[cellIndex]}
                      </span>
                      <span className="ml-auto md:ml-0">
                        {renderCell(cell, keyword)}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

function sortTable(
  a: string[],
  b: string[],
  headerIndex: number,
  isAsc: boolean
) {
  if (headerIndex === -1) return 0;
  if (isAsc) return a[headerIndex] < b[headerIndex] ? -1 : 1;
  return a[headerIndex] < b[headerIndex] ? 1 : -1;
}

// Highlight the keyword in a cell
function renderCell(value: string, keyword: string) {
  if (!keyword) return value;

  const result: JSX.Element[] = [];

  while (value.length) {
    const index = value.toLowerCase().indexOf(keyword);
    if (index === -1) {
      result.push(<span key={"cell-value-" + result.length}>{value}</span>);
      break;
    }

    const end = index + keyword.length;

    result.push(
      <span key={"cell-value-" + result.length}>{value.slice(0, index)}</span>
    );

    result.push(
      <span key={"cell-value-" + result.length} className="text-orange-500">
        {value.slice(index, end)}
      </span>
    );

    value = value.slice(end);
  }

  return result;
}

export default React.memo(Table);
