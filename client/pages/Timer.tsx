import BadCauses from "@/component/timer/BadCauses";
import BreakMoodCheckIn from "@/component/break/BreakMoodCheckIn";
import Mood, { Break, PageComponent, Settings, Study } from "@/types/Timer";
import React, { useEffect, useState } from "react";
import StudyTimer from "../component/timer/StudyTimer";
import IndexedDb from "./db/IndexedDb";
import StudyMoodCheckIn from "@/component/timer/StudyMoodCheckIn";

const Timer = () => {
  let timerDb: IndexedDb;
  useEffect(() => {
    timerDb = new IndexedDb("timer");
    const runIndexDb = async () => {
      await timerDb.createObjectStore(["study"]);
    };
    runIndexDb();
  }, []);

  const [studyEntry, setStudyEntry] = useState<Study>({
    id: 0,
    timer: {
      startTime: 0,
      duration: 0,
    },
  });

  const [breakEntry, setBreakEntry] = useState<Break>({
    id: 0,
    timer: {
      startTime: 0,
      duration: 0,
    },
  });

  const [settings, setSettings] = useState<Settings>({
    causes: [
      {
        title: "bad sleep",
        icon: "sth",
        statistic: 3,
        goodCause: false,
        archived: false,
      },
    ],
    examPhases: [
      {
        startDate: 89898,
        endDate: 89889,
        title: "FS23",
        studyEntries: [],
        breakEntries: [],
      },
    ],
    breakActivities: [
      {
        title: "meditation",
        icon: "icon",
        statistic: 1,
      },
      {
        title: "yoga",
        icon: "icon",
        statistic: 1,
      },
    ],
  });

  const [showComponent, setShowComponent] = useState<PageComponent>(
    PageComponent.STUDYTIMER
  );

  const showPage = (): React.ReactElement => {
    let component;
    switch (showComponent) {
      case PageComponent.STUDYTIMER:
        component = (
          <StudyTimer
            db={timerDb}
            setShowComponent={setShowComponent}
            breakEntry={breakEntry}
            setStudyEntry={setStudyEntry}
            setBreakEntry={setBreakEntry}
            settings={settings}
          />
        );
        break;
      case PageComponent.STUDYMOOD:
        component = (
          <StudyMoodCheckIn
            db={timerDb}
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
            setShowComponent={setShowComponent}
          />
        );
        break;
      case PageComponent.BREAKTIMER:
        component = (
          <StudyTimer
            db={timerDb}
            setShowComponent={setShowComponent}
            breakEntry={breakEntry}
            setStudyEntry={setStudyEntry}
            setBreakEntry={setBreakEntry}
            settings={settings}
          />
        );
        break;
      case PageComponent.BREAKMOOD:
        component = (
          <BreakMoodCheckIn
            db={timerDb}
            breakEntry={breakEntry}
            setBreakEntry={setBreakEntry}
            setShowComponent={setShowComponent}
          />
        );
        break;
      case PageComponent.BADCAUSE:
        component = (
          <BadCauses
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
            settings={settings}
            setSettings={setSettings}
          />
        );
        break;
      default:
        component = (
          <StudyTimer
            db={timerDb}
            setShowComponent={setShowComponent}
            setStudyEntry={setStudyEntry}
            breakEntry={breakEntry}
            setBreakEntry={setBreakEntry}
            settings={settings}
          />
        );
    }
    return component;
  };

  return (
    <div className="flex w-screen justify-center flex-col	items-center">
      {showPage()}
    </div>
  );
};
export default Timer;
