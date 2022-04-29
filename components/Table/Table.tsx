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
};

const URL =
  "https://gist.githubusercontent.com/tiangechen/b68782efa49a16edaf07dc2cdaa855ea/raw/0c794a9717f18b094eabab2cd6a6b9a226903577/movies.csv";

const Table: React.FC<TableProps> = ({
  onTableDataChange,
  pageNumber,
  keyword,
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
    axios.get(URL).then((res) => {
      if (typeof res.data !== "string" || res.data.length === 0) return;
      const arr = res.data.split("\n").map((str) => str.split(","));
      setTableHeader(arr.shift() || []);
      arr.length > 0 && setTableRows(arr);
    });
  }, []);

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

  return tableRows.length === 0 ? null : (
    <table className="border-collapse border border-slate-500 table-auto w-full mb-4">
      <TableHeader
        tableHeader={tableHeader}
        sortConfig={sortConfig}
        onHeaderClick={updateSortConfig}
      />
      <tbody>
        {filteredTableRows
          .sort((a, b) => sortTable(a, b, sortConfig.index, sortConfig.isAsc))
          .slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE)
          .map((row, index) => (
            <tr key={"row-" + index}>
              {row.map((cell, cellIndex) => (
                <td
                  key={"cell-" + cellIndex}
                  className="border border-slate-600 px-4"
                >
                  {renderCell(cell, keyword)}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
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

function renderCell(value: string, keyword: string) {
  if (!keyword) return value;

  const subStrings: { isKeyword: boolean; value: string }[] = [];

  while (value.length) {
    const index = value.toLowerCase().indexOf(keyword);
    if (index === -1) {
      subStrings.push({ isKeyword: false, value });
      break;
    }

    const end = index + keyword.length;
    subStrings.push({ isKeyword: false, value: value.slice(0, index) });
    subStrings.push({ isKeyword: true, value: value.slice(index, end) });
    value = value.slice(end);
  }

  return subStrings.map((item) => (
    <span className={item.isKeyword ? "text-orange-500" : ""}>
      {item.value}
    </span>
  ));
}

export default React.memo(Table);
