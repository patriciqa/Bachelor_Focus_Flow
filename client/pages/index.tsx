import BadCauses from "@/component/timer/BadCauses";
import BreakMoodCheckIn from "@/component/break/BreakMoodCheckIn";
import { Break, PageComponent, Study } from "@/types/Timer";
import React, { useEffect, useState } from "react";
import TimerComponent from "../component/TimerComponent";
import StudyMoodCheckIn from "@/component/timer/StudyMoodCheckIn";
import GoodCauses from "@/component/timer/GoodCauses";
import initDb from "@/db/InitDb";
import { getElement } from "@/db/Actions";
import CreateExamPhase from "@/component/timer/CreateExamPhase";
import ExampPhaseInput from "@/component/overview/settings/ExamPhaseInput";

const Timer = () => {
  const [showComponent, setShowComponent] = useState<PageComponent>(
    PageComponent.STUDYTIMER
  );

  useEffect(() => {
    initDb();
    // addElement("activities", {
    //   title: "Meditation",
    //   icon: "sth",
    //   archived: false,
    // });
    //  addElement("go for a walk", {
    //   title: "Meditation",
    //   icon: "sth",
    //   archived: false,
    // });
    getElement("examPhases", "all").then(
      (result: any) => {
        if (result.length === 0 && showComponent !== PageComponent.EXAMPHASEINPUT) {
          setShowComponent(PageComponent.ONBOARDINGEXAMPHASE);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  });

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

  // const [settings, setSettings] = useState<Settings>({
  //   causes: [
  //     {
  //       title: "bad sleep",
  //       icon: "sth",
  //       statistic: 3,
  //       goodCause: false,
  //       archived: false,
  //     },
  //   ],
  //   examPhases: [
  //     {
  //       startDate: 89898,
  //       endDate: 89889,
  //       title: "FS23",
  //       studyEntries: [],
  //       breakEntries: [],
  //     },
  //   ],
  //   breakActivities: [
  //     {
  //       id: 8,
  //       icon: "i",
  //       archived: false,
  //       title: "meditation",
  //     },
  //     {
  //       id: 8,
  //       icon: "i",
  //       archived: false,
  //       title: "yoga",
  //     },
  //   ],
  // });

  const showPage = (): React.ReactElement => {
    let component;
    switch (showComponent) {
      case PageComponent.ONBOARDINGEXAMPHASE:
        component = <CreateExamPhase setShowComponent={setShowComponent} />;
        break;
      case PageComponent.EXAMPHASEINPUT:
        component = <ExampPhaseInput setShowComponent={setShowComponent} />;
        break;
      case PageComponent.STUDYTIMER:
        component = (
          <TimerComponent
            setShowComponent={setShowComponent}
            breakEntry={breakEntry}
            setStudyEntry={setStudyEntry}
            setBreakEntry={setBreakEntry}
          />
        );
        break;
      case PageComponent.STUDYMOOD:
        component = (
          <StudyMoodCheckIn
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
            setShowComponent={setShowComponent}
          />
        );
        break;
      case PageComponent.BREAKTIMER:
        component = (
          <TimerComponent
            setShowComponent={setShowComponent}
            breakEntry={breakEntry}
            setStudyEntry={setStudyEntry}
            setBreakEntry={setBreakEntry}
          />
        );
        break;
      case PageComponent.BREAKMOOD:
        component = (
          <BreakMoodCheckIn
            breakEntry={breakEntry}
            setBreakEntry={setBreakEntry}
            setShowComponent={setShowComponent}
          />
        );
        break;
      case PageComponent.BADCAUSE:
        component = (
          <BadCauses studyEntry={studyEntry} setStudyEntry={setStudyEntry} />
        );
        break;
      case PageComponent.GOODCAUSE:
        component = (
          <GoodCauses studyEntry={studyEntry} setStudyEntry={setStudyEntry} />
        );
        break;
      default:
        component = (
          <TimerComponent
            setShowComponent={setShowComponent}
            setStudyEntry={setStudyEntry}
            breakEntry={breakEntry}
            setBreakEntry={setBreakEntry}
          />
        );
    }
    return component;
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen">
      {showPage()}
    </div>
  );
};
export default Timer;
