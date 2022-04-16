import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import Title from "../components/Title";

const Home: NextPage = () => {
  const [total, setTotal] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  return (
    <div className="flex flex-col h-100">
      <Head>
        <title>Movie Listing | Veewoo</title>
        <meta name="description" content="A website created by Veewoo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-14">
        <div className="container px-4">
          <Title />
        </div>
        <div className="container px-4">
          <Table pageNumber={pageNumber} onTableDataChange={setTotal} />
          <Pagination totalItem={total} onPageIndexClick={setPageNumber} />
        </div>
      </main>

      <footer className="mt-auto text-center">Created by VeeWoo</footer>
    </div>
  );
};

export default Home;
