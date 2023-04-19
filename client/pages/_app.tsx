import Layout from "@/component/Layout";
import "@/pages/globals.css";
import type { AppProps } from "next/app";
import "../component/overview/settings/Calendar.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
