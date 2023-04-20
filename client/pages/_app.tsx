import ExamContextProvider, {
  ExamContext,
} from "@/component/context/ExamPhaseContext";
import Layout from "@/component/Layout";
import "@/pages/globals.css";
import { Break, Study } from "@/types/Timer";
import type { AppProps } from "next/app";
import { useState } from "react";
import "../component/Calendar.css";
export default function App({ Component, pageProps }: AppProps) {
  const [studyEntryy, setStudyEntryy] = useState<Study>();
  const [breakEntryy, setBreakEntryy] = useState<Break>();
  return (
    <Layout>
      <ExamContextProvider>
        <Component
          {...pageProps}
          studyEntryy={studyEntryy}
          setStudyEntryy={setStudyEntryy}
          breakEntryy={breakEntryy}
          setBreakEntryy={setBreakEntryy}
        />
      </ExamContextProvider>
    </Layout>
  );
}
