import { BreakView } from "@/component/timer/break/BreakView";
import CreatePhaseView from "@/component/timer/CreatePhaseView";
import { StudyView } from "@/component/timer/study/StudyView";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { useNavbarContext } from "@/context/HideNavbarContext";
import { getElement } from "@/db/Actions";
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
          study: {sToM(studyEntry.timer.duration)}
        </div>
      );
    } else {
      return (
        <div className="flex p-2 text-h24 text-break">
          <FontAwesomeIcon
            icon={["fas", "clock"]}
            className="pr-2 text-break"
          />
          <p>break: {sToM(breakEntry.timer.duration)}</p>
        </div>
      );
    }
  };

  return (
    <div className="min-[361px]:fixed flex flex-col items-center w-screen h-screen rw-screen bg-background">
      <>
        <div className={"flex justify-center w-full pt-6 px-12 pb-7 p-2	"}>
          {hideNavbar ? (
            <button
              onClick={() => setWhichTimer(WhichTimer.STUDY)}
              className={
                " h-[58px] " +
                (whichTimer === WhichTimer.STUDY
                  ? "text-study  "
                  : "text-break")
              }
            >
              {whichTimer === WhichTimer.STUDY ? getTime(true) : getTime(false)}
            </button>
          ) : (
            <>
              <div className="relative h-[58px] w-full flex justify-center items-center bg-chartGrey rounded-2xl">
                <button
                  onClick={() => setWhichTimer(WhichTimer.STUDY)}
                  className={
                    "w-[52%] rounded-2xl left-0  absolute text-white text-h24 pb-1  h-[60px] font-medium  " +
                    (whichTimer === WhichTimer.STUDY &&
                      "bg-study rounded z-10  ")
                  }
                >
                  study
                </button>
                <button
                  onClick={() => setWhichTimer(WhichTimer.BREAK)}
                  className={
                    "w-[52%] rounded-2xl right-0 absolute items-center text-h24 justify-center pb-1 flex text-white h-[60px] font-medium " +
                    (whichTimer === WhichTimer.BREAK && "bg-break rounded  ")
                  }
                >
                  break
                </button>
              </div>
            </>
          )}
        </div>
        <div className="shadow-[1px_4px_16px_rgba(39,37,37,0.15)] relative bg-white rounded h-[66vh] w-11/12	">
          {showPage()}
        </div>
      </>
    </div>
  );
};
export default Timer;
