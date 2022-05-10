import axios from "axios";
import type { InferGetStaticPropsType, NextPage } from "next";
import { useState } from "react";
import { Table, TablePagination, TableSearch } from "../components/Table";
import { Title } from "../components/Title";

const URL =
  "https://gist.githubusercontent.com/tiangechen/b68782efa49a16edaf07dc2cdaa855ea/raw/0c794a9717f18b094eabab2cd6a6b9a226903577/movies.csv";

export async function getStaticProps(): Promise<{
  props: { tableData: string[][] };
}> {
  const result: { props: { tableData: string[][] } } = {
    props: { tableData: [] },
  };

  const res = await axios.get(URL);
  if (typeof res.data !== "string" || res.data.length === 0) {
    return result;
  }

  result.props.tableData = res.data.split("\n").map((str) => str.split(","));
  return result;
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  tableData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [total, setTotal] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);

  return (
    <div className="flex flex-col h-100">
      <main className="mt-14">
        <div className="container px-4">
          <Title />
        </div>
        <div className="container px-4">
          <TableSearch onChange={(value) => setKeyword(value.toLowerCase())} />
          <Table
            keyword={keyword}
            tableData={tableData}
            pageNumber={pageNumber}
            onTableDataChange={setTotal}
          />
          <TablePagination totalItem={total} onPageIndexClick={setPageNumber} />
        </div>
      </main>
      <footer className="mt-auto py-4 text-center">
        Created by{" "}
        <a
          className="text-cyan-400"
          href="https://github.com/veewoo"
          target="_black"
        >
          Veewoo
        </a>
      </footer>
    </div>
  );
};

export default Home;
