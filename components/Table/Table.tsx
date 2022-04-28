import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../../business/constants";
import { SortConfig } from "../../business/types";
import TableHeader from "./TableHeader";

type TableProps = {
  pageNumber: number;
  onTableDataChange: Function;
};

const URL =
  "https://gist.githubusercontent.com/tiangechen/b68782efa49a16edaf07dc2cdaa855ea/raw/0c794a9717f18b094eabab2cd6a6b9a226903577/movies.csv";

const Table: React.FC<TableProps> = ({ onTableDataChange, pageNumber }) => {
  const [tableHeader, setTableHeader] = useState<string[]>([]);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    index: -1,
    isAsc: true,
  });

  useEffect(() => {
    axios.get(URL).then((res) => {
      if (typeof res.data !== "string" || res.data.length === 0) return;
      const arr = res.data.split("\n").map((str) => str.split(","));
      setTableHeader(arr.shift() || []);
      arr.length > 0 && setTableData(arr);
    });
  }, []);

  useEffect(() => {
    if (typeof onTableDataChange == "function") {
      onTableDataChange(tableData.length);
    }
  }, [tableData]);

  const updateSortConfig = (index: number) => {
    const isAsc = index === sortConfig.index ? !sortConfig.isAsc : true;
    setSortConfig({ index, isAsc });
  };

  useEffect(() => {
    setTableData([
      ...tableData.sort((a, b) => {
        if (sortConfig.index === -1) return 0;
        if (sortConfig.isAsc)
          return a[sortConfig.index] < b[sortConfig.index] ? 1 : -1;
        return a[sortConfig.index] < b[sortConfig.index] ? -1 : 1;
      }),
    ]);
  }, [sortConfig]);

  return tableData.length === 0 ? null : (
    <table className="border-collapse border border-slate-500 table-auto w-full mb-4">
      <TableHeader
        tableHeader={tableHeader}
        sortConfig={sortConfig}
        onHeaderClick={updateSortConfig}
      />
      <tbody>
        {tableData
          .slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE)
          .map((row, index) => (
            <tr key={"row-" + index}>
              {row.map((cell, cellIndex) => (
                <td
                  key={"cell-" + cellIndex}
                  className="border border-slate-600 px-4"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default React.memo(Table);
