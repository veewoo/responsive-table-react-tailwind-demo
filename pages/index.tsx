import type { NextPage } from "next";
import { useState } from "react";
import { Table, TablePagination } from "../components/Table";
import { Title } from "../components/Title";

const Home: NextPage = () => {
  const [total, setTotal] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  return (
    <div className="flex flex-col h-100">
      <main className="mt-14">
        <div className="container px-4">
          <Title />
        </div>
        <div className="container px-4">
          <Table pageNumber={pageNumber} onTableDataChange={setTotal} />
          <TablePagination totalItem={total} onPageIndexClick={setPageNumber} />
        </div>
      </main>
      <footer className="mt-auto text-center">Created by VeeWoo</footer>
    </div>
  );
};

export default Home;
