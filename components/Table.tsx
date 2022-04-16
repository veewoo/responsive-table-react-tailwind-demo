import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../business/constants";
import TableHeader from "./TableHeader";

type TableProps = {
  pageNumber: number;
  onTableDataChange: Function;
};

type TableRow = {
  film: string;
  genre: string;
  leadStudio: string;
  audienceScore: string;
  profitability: string;
  rottenTomatoes: string;
  worldwideGross: string;
  year: string;
};

const ITEM_PROP_MAPPING: any = {
  0: "film",
  1: "genre",
  2: "leadStudio",
  3: "audienceScore",
  4: "profitability",
  5: "rottenTomatoes",
  6: "worldwideGross",
  7: "year",
};

const URL =
  "https://gist.githubusercontent.com/tiangechen/b68782efa49a16edaf07dc2cdaa855ea/raw/0c794a9717f18b094eabab2cd6a6b9a226903577/movies.csv";

const Table = ({ onTableDataChange, pageNumber }: TableProps) => {
  const [tableHeader, setTableHeader] = useState<string[]>([]);
  const [tableData, setTableData] = useState<TableRow[]>([]);

  useEffect(() => {
    axios.get(URL).then((res) => {
      if (typeof res.data !== "string" || res.data.length === 0) return;

      const headerResult = getHeader(res.data);
      if (headerResult.headers.length > 0) {
        setTableHeader(headerResult.headers);
      }

      if (headerResult.restOfString.length > 0) {
        const dataResult = getTableRows(headerResult.restOfString);
        setTableData(dataResult);
      }
    });
  }, []);

  useEffect(() => {
    typeof onTableDataChange == "function" &&
      onTableDataChange(tableData.length);
  }, [tableData]);

  return (
    <table className="border-collapse border border-slate-500 table-auto w-full mb-4">
      <TableHeader tableHeader={tableHeader} />
      <tbody>
        {tableData
          ?.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE)
          .map((x, i) => (
            <tr key={"row-" + i}>
              <td className="border border-slate-600 px-4">{x.film}</td>
              <td className="border border-slate-600 px-4">{x.genre}</td>
              <td className="border border-slate-600 px-4">{x.leadStudio}</td>
              <td className="border border-slate-600 px-4 text-right">
                {x.audienceScore}
              </td>
              <td className="border border-slate-600 px-4 text-right">
                {x.profitability}
              </td>
              <td className="border border-slate-600 px-4 text-right">
                {x.rottenTomatoes}
              </td>
              <td className="border border-slate-600 px-4 text-right">
                {x.worldwideGross}
              </td>
              <td className="border border-slate-600 px-4 text-right">
                {x.year}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

function getHeader(str: string) {
  const result: { restOfString: string; headers: string[] } = {
    restOfString: "",
    headers: [],
  };

  if (!str) return result;

  const firstRowIndex = str.indexOf("\n");
  if (firstRowIndex === -1) return result;

  result.restOfString = str.substring(firstRowIndex + 1, str.length);
  result.headers = str.substring(0, firstRowIndex).split(",");

  return result;
}

function getTableRows(str: string): TableRow[] {
  const result: TableRow[] = [];
  if (!str) return result;

  let itemIndex = 0;
  let itemPropIndex = 0;
  let itemPropValue = "";
  let item: TableRow = getNewItem();

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\n") {
      assignValue(item, itemPropIndex, itemPropValue);
      result.push(item);
      item = getNewItem();
      itemIndex++;
      itemPropIndex = 0;
      itemPropValue = "";
    } else if (str[i] === ",") {
      assignValue(item, itemPropIndex, itemPropValue);
      itemPropIndex++;
      itemPropValue = "";
    } else {
      itemPropValue += str[i];
    }
  }

  result.push(item);

  return result;
}

function assignValue(obj: any, itemPropIndex: number, value: string) {
  if (typeof obj[ITEM_PROP_MAPPING[itemPropIndex]] === "string") {
    obj[ITEM_PROP_MAPPING[itemPropIndex]] = value;
  }
}

function getNewItem(): TableRow {
  return {
    film: "",
    genre: "",
    leadStudio: "",
    audienceScore: "",
    profitability: "",
    rottenTomatoes: "",
    worldwideGross: "",
    year: "",
  };
}

export default React.memo(Table);
