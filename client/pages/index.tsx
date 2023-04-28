import { Break, WhichTimer, Study } from "@/types/Timer";
import React, { useContext, useEffect, useState } from "react";
import initDb from "@/db/InitDb";
import { BreakView } from "@/component/timer/break/BreakView";
import { getElement } from "@/db/Actions";
import CreatePhaseView from "@/component/timer/CreatePhaseView";
import { ExamContext } from "@/context/ExamPhaseContext";
import { StudyView } from "@/component/timer/study/StudyView";
import { useNavbarContext } from "@/context/HideNavbarContext";

const Timer = ({
  studyEntry,
  setStudyEntry,
  breakEntryy,
  setBreakEntryy,
  whichTimer,
  setWhichTimer,
}: {
  studyEntry: Study;
  setStudyEntry: (s: Study) => void;
  breakEntryy: Break;
  setBreakEntryy: (s: Break) => void;
  whichTimer: WhichTimer;
  setWhichTimer: (s: WhichTimer) => void;
}) => {
  const { examPhaseId, setExamPhaseId } = useContext(ExamContext);
  const { setHideNavbar, hideNavbar } = useNavbarContext();

  useEffect(() => {
    initDb();
    getElement("examPhases", "all").then(
      (result: any) => {
        if (result.length === 0) {
          setWhichTimer(WhichTimer.EXAMPHASE);
        } else {
          // setWhichTimer(whichTimer.STUDY);
          const id = localStorage.getItem("examId");
          if (id !== null) {
            setExamPhaseId(id);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  });

  // const [settings, setSettings] = useState<Settings>({
  //   reasons: [
  //     {
  //       title: "bad sleep",
  //       icon: "sth",
  //       statistic: 3,
  //       goodReason: false,
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
    switch (whichTimer) {
      case WhichTimer.STUDY:
        component = (
          <StudyView
            setWhichTimer={setWhichTimer}
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
          />
        );
        break;
      case WhichTimer.BREAK:
        component = (
          <BreakView
            whichTimer={whichTimer}
            setWhichTimer={setWhichTimer}
            breakEntryy={breakEntryy}
            setBreakEntryy={setBreakEntryy}
          />
        );
        break;
      case WhichTimer.EXAMPHASE:
        component = <CreatePhaseView />;
        break;
      default:
        component = (
          <StudyView
            setWhichTimer={setWhichTimer}
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
          />
        );
    }
    return component;
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <>
        <div
          className={
            "flex justify-center w-full p-5  " + (hideNavbar && "invisible")
          }
        >
          <button
            onClick={() => setWhichTimer(WhichTimer.STUDY)}
            className={
              "w-full  " +
              (whichTimer === WhichTimer.STUDY ? "bg-metal " : "white	 ")
            }
          >
            study
          </button>
          <button
            onClick={() => setWhichTimer(WhichTimer.BREAK)}
            className={
              "w-full  " +
              (whichTimer === WhichTimer.BREAK ? "bg-metal " : "white ")
            }
          >
            break
          </button>
        </div>

        {showPage()}
      </>
    </div>
  );
};
export default Timer;
