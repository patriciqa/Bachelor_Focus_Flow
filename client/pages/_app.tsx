import ExamContextProvider, {
  ExamContext,
} from "@/context/ExamPhaseContext";
import Layout from "@/component/Layout";
import "@/pages/globals.css";
import { Break, ShowPage, Study } from "@/types/Timer";
import type { AppProps } from "next/app";
import { useState } from "react";
import "../component/Calendar.css";
export default function App({ Component, pageProps }: AppProps) {
  const [studyEntry, setStudyEntry] = useState<Study>({
    timer: { duration: 0, startTime: 0 },
  });
  const [breakEntryy, setBreakEntryy] = useState<Break>({
    timer: { duration: 0, startTime: 0 },
  });
  const [shownPage, setShownPage] = useState<ShowPage>(ShowPage.STUDY);

  return (
    <Layout>
      <ExamContextProvider>
        <Component
          {...pageProps}
          studyEntry={studyEntry}
          setStudyEntry={setStudyEntry}
          breakEntryy={breakEntryy}
          setBreakEntryy={setBreakEntryy}
          shownPage={shownPage}
          setShownPage={setShownPage}
        />
      </ExamContextProvider>
    </Layout>
  );
}
