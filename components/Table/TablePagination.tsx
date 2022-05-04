import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../../business/constants";
import { Button } from "../Button";

type TablePaginationProps = {
  totalItem: number;
  onPageIndexClick: Function;
};

const TablePagination: React.FC<TablePaginationProps> = ({
  totalItem,
  onPageIndexClick,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [pageIndexes, setPageIndexes] = useState<number[]>([]);
  const [filteredPageIndexes, setFilteredPageIndexes] = useState<number[]>([]);

  // Generate the index list based on the table row length
  useEffect(() => {
    const indexes: number[] = [];
    const length = Math.ceil(totalItem / PAGE_SIZE);
    if (length) {
      for (let i = 1; i <= length; i++) {
        indexes.push(i);
      }
    }

    setSelectedIndex(1);
    setPageIndexes(indexes);
  }, [totalItem]);

  // Update the filtered index list when user click to index buttons
  useEffect(() => {
    setFilteredPageIndexes(
      selectedIndex === 1
        ? pageIndexes.slice(0, 3)
        : pageIndexes.slice(selectedIndex - 2, selectedIndex + 1)
    );
  }, [selectedIndex, pageIndexes]);

  const goTo = useCallback(
    (pageIndex: number) => {
      setSelectedIndex(pageIndex);
      onPageIndexClick(pageIndex);
    },
    [onPageIndexClick]
  );

  const goToFirst = useCallback(() => {
    setSelectedIndex(1);
    onPageIndexClick(1);
  }, [onPageIndexClick]);

  const goToLast = useCallback(() => {
    setSelectedIndex(pageIndexes.length);
    onPageIndexClick(pageIndexes.length);
  }, [onPageIndexClick, pageIndexes.length]);

  return (
    <div className="flex justify-end items-end">
      <Button content="<<" onClick={goToFirst} />
      <span className="mx-2">...</span>
      <div className="index-group">
        {filteredPageIndexes.map((pageIndex) => (
          <button
            key={"pageIndex-" + pageIndex}
            className={
              "border border-slate-600 p-2" +
              (pageIndex === selectedIndex ? " bg-slate-600 text-white" : "")
            }
            onClick={() => goTo(pageIndex)}
          >
            {pageIndex}
          </button>
        ))}
      </div>
      <span className="mx-2">...</span>
      <Button content=">>" onClick={goToLast} />
    </div>
  );
};

export default TablePagination;
