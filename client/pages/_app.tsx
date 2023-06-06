import Layout from "@/component/Layout";
import ExamContextProvider from "@/context/ExamPhaseContext";
import "@/pages/globals.css";
import { Break, Study, WhichTimer } from "@/types/Timer";
import type { AppProps } from "next/app";
import { useState } from "react";
import "../component/Calendar.css";
import "../component/IconPicker.css";
// import Font Awesome CSS
import HideNavbarProvider from "@/context/HideNavbarContext";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
// import icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

export default function App({ Component, pageProps }: AppProps) {
  const [studyEntry, setStudyEntry] = useState<Study>({
    timer: { duration: 0, startTime: 0 },
  });
  const [breakEntry, setbreakEntry] = useState<Break>({
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
            breakEntry={breakEntry}
            setbreakEntry={setbreakEntry}
            whichTimer={whichTimer}
            setWhichTimer={setWhichTimer}
          />
        </ExamContextProvider>
      </Layout>
    </HideNavbarProvider>
  );
}
library.add(fas);
