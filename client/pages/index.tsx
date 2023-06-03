import { BreakView } from "@/component/timer/break/BreakView";
import CreatePhaseView from "@/component/timer/CreatePhaseView";
import { StudyView } from "@/component/timer/study/StudyView";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { useNavbarContext } from "@/context/HideNavbarContext";
import { addElement, getElement } from "@/db/Actions";
import initDb from "@/db/InitDb";
import sToM from "@/hooks/SecondsToMinutes";
import { Break, Study, WhichTimer } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

const Timer = ({
  studyEntry,
  setStudyEntry,
  breakEntry,
  setbreakEntry,
  whichTimer,
  setWhichTimer,
}: {
  studyEntry: Study;
  setStudyEntry: (s: Study) => void;
  breakEntry: Break;
  setbreakEntry: (s: Break) => void;
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
        breakActivityId: 1,
        mood: "rather bad",
      },
      {
        timer: { duration: 3, startTime: 1684414234506 },
        studyTimer: false,
        breakActivityId: 2,
        mood: "good",
      },
      {
        timer: { duration: 3, startTime: 1684414234600 },
        studyTimer: false,
        breakActivityId: 2,
        mood: "good",
      },
    ],

    studyEntries: [
      {
        timer: { duration: 30, startTime: 1684414234506 },
        studyTimer: true,
        reasonIds: [1, 2, 6],
        mood: "rather bad",
      },
      {
        timer: { duration: 3, startTime: 1684414234506 },
        studyTimer: true,
        reasonIds: [2, 4, 5],
        mood: "good",
      },
      {
        timer: { duration: 3, startTime: 1684414234506 },
        studyTimer: true,
        reasonIds: [1, 3, 2],
        mood: "rather good",
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
            breakEntry={breakEntry}
            setbreakEntry={setbreakEntry}
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

  const getTime = (study: boolean) => {
    if (study) {
      return (
        <div className="flex w-full p-2 text-h24 text-study">
          <FontAwesomeIcon
            icon={["fas", "clock"]}
            className="pr-2 text-study"
          />
          study: {sToM(studyEntry.timer.duration)}min
        </div>
      );
    } else {
      return (
        <div className="flex p-2 text-h24 text-break">
          <FontAwesomeIcon
            icon={["fas", "clock"]}
            className="pr-2 text-break"
          />
          <p>break: {sToM(breakEntry.timer.duration)}min</p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen rw-screen bg-background">
      <>
        {/* <button onClick={() => addExample()}>add element</button> */}
        <div className={"flex justify-center w-full pt-10 px-14 pb-7 p-2	"}>
          {hideNavbar ? (
            <button
              onClick={() => setWhichTimer(WhichTimer.STUDY)}
              className={
                " " +
                (whichTimer === WhichTimer.STUDY
                  ? "text-study  "
                  : "text-break")
              }
            >
              {whichTimer === WhichTimer.STUDY ? getTime(true) : getTime(false)}
            </button>
          ) : (
            <>
              <div className="relative h-[56px] w-full">
                <button
                  onClick={() => setWhichTimer(WhichTimer.STUDY)}
                  className={
                    "w-1/2 rounded-2xl left-2 absolute text-white p-2 h-[60px] font-medium  " +
                    (whichTimer === WhichTimer.STUDY
                      ? "bg-study rounded z-10  "
                      : "bg-chartGrey")
                  }
                >
                  study
                </button>
                <button
                  onClick={() => setWhichTimer(WhichTimer.BREAK)}
                  className={
                    "w-1/2 rounded-2xl right-2 absolute text-white h-[60px] font-medium " +
                    (whichTimer === WhichTimer.BREAK
                      ? "bg-break rounded  "
                      : "bg-chartGrey")
                  }
                >
                  break
                </button>
              </div>
            </>
          )}
        </div>{" "}
        <div className="shadow-[1px_4px_16px_rgba(39,37,37,0.15)] relative bg-white rounded h-[66vh] w-11/12	">
          {showPage()}
        </div>
      </>
    </div>
  );
};
export default Timer;
