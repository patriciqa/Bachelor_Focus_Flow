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
    title: "FS23",
    startDate: 1686038409000,
    endDate: 1688139082000,
    breakEntries: [
      {
        timer: { duration: 300, startTime: 1686038409000 }, //6.6 10am
        studyTimer: false,
        breakActivityId: 7,
        mood: "rather bad",
      },
      {
        timer: { duration: 600, startTime: 1686039900000 }, //10.25
        studyTimer: false,
        breakActivityId: 3,
        mood: "good",
      },
      {
        timer: { duration: 300, startTime: 1684414234600 },
        studyTimer: false,
        breakActivityId: 8,
        mood: null,
      },
      {
        timer: { duration: 300, startTime: 1686058560000 }, //6.6 15.36
        studyTimer: false,
        breakActivityId: 7,
        mood: "rather bad",
      },
      {
        timer: { duration: 600, startTime: 1686060480000 }, //16.08
        studyTimer: false,
        breakActivityId: 1,
        mood: "rather good",
      },
      {
        timer: { duration: 300, startTime: 1684414234600 },
        studyTimer: false,
        breakActivityId: 9,
        mood: "bad",
      },
    ],

    studyEntries: [
      {
        timer: { duration: 3600, startTime: 1686034809000 }, //6.6. 9am
        studyTimer: true,
        reasonIds: [1, 2, 3],
        mood: "rather bad",
      },
      {
        timer: { duration: 1200, startTime: 1686038700000 }, //6.6. 10.05am
        studyTimer: true,
        reasonIds: [9, 1, 12],
        mood: "good",
      },
      {
        timer: { duration: 3600, startTime: 1686040560000 }, //6.6 10.36
        studyTimer: true,
        reasonIds: [2, 1, 6],
        mood: "rather bad",
      },
      {
        timer: { duration: 3600, startTime: 1686054960000 }, //6.6. 2pm
        studyTimer: true,
        reasonIds: [4, 2, 5],
        mood: "bad",
      },
      {
        timer: { duration: 1200, startTime: 1686059220000 }, //6.6. 15.47am
        studyTimer: true,
        reasonIds: [8, 12, 13],
        mood: "good",
      },
      {
        timer: { duration: 3600, startTime: 1686061800000 }, //6.6 16.30
        studyTimer: true,
        reasonIds: [13, 10],
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
    <div className="flex flex-col items-center w-screen h-screen rw-screen bg-background">
      <>
        <button onClick={() => addExample()}>add element</button>
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
        </div>{" "}
        <div className="shadow-[1px_4px_16px_rgba(39,37,37,0.15)] relative bg-white rounded h-[66vh] w-11/12	">
          {showPage()}
        </div>
      </>
    </div>
  );
};
export default Timer;
