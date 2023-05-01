import ExamContextProvider from "@/context/ExamPhaseContext";
import Layout from "@/component/Layout";
import "@/pages/globals.css";
import { Break, WhichTimer, Study } from "@/types/Timer";
import type { AppProps } from "next/app";
import { useState } from "react";
import "../component/Calendar.css";
import HideNavbarProvider from "@/context/HideNavbarContext";
export default function App({ Component, pageProps }: AppProps) {
  const [studyEntry, setStudyEntry] = useState<Study>({
    timer: { duration: 0, startTime: 0 },
  });
  const [breakEntryy, setBreakEntryy] = useState<Break>({
    timer: { duration: 0, startTime: 0 },
  });
  const [whichTimer, setWhichTimer] = useState<WhichTimer>(WhichTimer.STUDY);

  return (
    <HideNavbarProvider>
      <Layout>
        <ExamContextProvider>
          <Component
            {...pageProps}
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
            breakEntryy={breakEntryy}
            setBreakEntryy={setBreakEntryy}
            whichTimer={whichTimer}
            setWhichTimer={setWhichTimer}
          />
        </ExamContextProvider>
      </Layout>
    </HideNavbarProvider>
  );
}
