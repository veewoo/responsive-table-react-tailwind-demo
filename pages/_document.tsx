import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Movie Listing | Veewoo</title>
          <meta name="description" content="A website created by Veewoo" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="loading">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
