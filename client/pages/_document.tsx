import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="de-ch">
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className="bg-background">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
