import { BreakView } from "@/component/timer/break/BreakView";
import CreatePhaseView from "@/component/timer/CreatePhaseView";
import { StudyView } from "@/component/timer/study/StudyView";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { useNavbarContext } from "@/context/HideNavbarContext";
import { addElement, getElement } from "@/db/Actions";
import initDb from "@/db/InitDb";
import { Break, Study, WhichTimer } from "@/types/Timer";
import React, { useEffect } from "react";

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
  const { setExamPhaseId } = useExamPhaseContext();
  const { hideNavbar } = useNavbarContext();

  useEffect(() => {
    initDb();
    getElement("examPhases", "all").then((result: any) => {
      const today = Math.floor(Date.now());
      let current = false;
      result.forEach((e: any) => {
        if (result.length === 0 || today < e.startDate || e.endDate < today) {
          return;
        }

        current = true;
        localStorage.setItem("examId", e.id.toString());
        setExamPhaseId(e.id);
      });

      if (!current) {
        setWhichTimer(WhichTimer.EXAMPHASE);
      }
    });
  });
  const hi = {
    title: "example",
    startDate: 1685138400000,
    endDate: 1685570399999,
    breakEntries: [
      {
        timer: { duration: 3, startTime: 1684414234506 },
        studyTimer: false,
        breakActivityId: 11,
        mood: "rather bad",
      },
      {
        timer: { duration: 3, startTime: 1684414234506 },
        studyTimer: false,
        breakActivityId: 7,
        mood: "good",
      },
    ],

    studyEntries: [
      {
        timer: { duration: 30, startTime: 1684414234506 },
        studyTimer: true,
        reasonIds: [10, 19, 7],
        mood: "rather bad",
      },
      {
        timer: { duration: 3, startTime: 1684414234506 },
        studyTimer: true,
        reasonIds: [7, 10, 20],
        mood: "good",
      },
    ],
  };

  const addExample = () => {
    addElement("examPhases", hi);
  };

  const showPage = (): React.ReactElement => {
    let component;
    switch (whichTimer) {
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
        component = <CreatePhaseView setWhichTimer={setWhichTimer} />;
        break;
      default:
      case WhichTimer.STUDY:
        component = (
          <StudyView
            setWhichTimer={setWhichTimer}
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
          />
        );
        break;
    }
    return component;
  };

  return (
    <div className="flex flex-col items-center h-screen rw-screen bg-background">
      <>
        {/* <Toggle /> */}
        <button onClick={() => addExample()}>add element</button>
        <div
          className={
            "flex justify-center w-full pt-10 px-14 pb-12	" +
            (hideNavbar && "invisible")
          }
        >
          <button
            onClick={() => setWhichTimer(WhichTimer.STUDY)}
            className={
              "w-1/2 rounded-l-lg text-white p-2  bg-inactiveGrey " +
              (whichTimer === WhichTimer.STUDY && "bg-study rounded  ")
            }
          >
            study
          </button>
          <button
            onClick={() => setWhichTimer(WhichTimer.BREAK)}
            className={
              "w-1/2 rounded-r-lg text-white p-2  bg-inactiveGrey " +
              (whichTimer === WhichTimer.BREAK && "bg-opposite rounded  ")
            }
          >
            break
          </button>
        </div>
        <div className="shadow-[1px_4px_16px_rgba(39,37,37,0.15)] bg-white rounded h-[63vh] w-[90vw]">
          {showPage()}
        </div>
      </>
    </div>
  );
};
export default Timer;
