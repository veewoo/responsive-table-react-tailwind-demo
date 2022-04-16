import React, { useCallback, useMemo } from "react";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../business/constants";
import Button from "./Button";

type PaginationProps = {
  totalItem: number;
  onPageIndexClick: Function;
};

const Pagination = ({ totalItem, onPageIndexClick }: PaginationProps) => {
  const [index, setIndex] = useState<number>(1);
  const [pageIndexes, setPageIndexes] = useState<number[]>([]);

  useEffect(() => {
    const arr: any[] = [];
    const length = Math.ceil(totalItem / PAGE_SIZE);
    if (!length) return;

    for (let i = 0; i < length; i++) {
      arr.push(i + 1);
    }

    setIndex(1);
    setPageIndexes(arr);
  }, [totalItem]);

  const filteredPageIndexes = useMemo(() => {
    if (index === 1) {
      return pageIndexes.slice(0, 3);
    }
    return pageIndexes.slice(index - 2, index + 1);
  }, [index, pageIndexes]);

  const goToFirst = useCallback(() => {
    setIndex(1);
    typeof onPageIndexClick === "function" && onPageIndexClick(1);
  }, [onPageIndexClick]);

  const goToLast = useCallback(() => {
    setIndex(pageIndexes.length);
    typeof onPageIndexClick === "function" &&
      onPageIndexClick(pageIndexes.length);
  }, [onPageIndexClick, pageIndexes.length]);

  return (
    <div className="flex justify-end items-end">
      <Button content="<" onButtonClick={goToFirst} />
      <span className="mr-2">...</span>
      {filteredPageIndexes.map((o) => (
        <button
          key={"pageIndex-" + o}
          className={
            "mr-2 border border-slate-600 p-2" +
            (o === index ? " bg-slate-600 text-white" : "")
          }
          onClick={() => {
            setIndex(o);
            typeof onPageIndexClick === "function" && onPageIndexClick(o);
          }}
        >
          {o}
        </button>
      ))}
      <span className="ml-2">...</span>
      <Button content=">" onButtonClick={goToLast} />
    </div>
  );
};

export default Pagination;
