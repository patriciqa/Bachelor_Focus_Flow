import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="de-ch">
      <Head>
        <link rel="icon" type="image/png" href="/mono-logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/mono-logo.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className="bg-background">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
