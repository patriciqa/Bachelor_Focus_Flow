import { BreakView } from "@/component/timer/break/BreakView";
import CreatePhaseView from "@/component/timer/CreatePhaseView";
import { StudyView } from "@/component/timer/study/StudyView";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { useNavbarContext } from "@/context/HideNavbarContext";
import { getElement } from "@/db/Actions";
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
        <div
          className={
            "flex justify-center w-full px-20 py-10  " +
            (hideNavbar && "invisible")
          }
        >
          <button
            onClick={() => setWhichTimer(WhichTimer.STUDY)}
            className={
              "w-1/2 rounded-l-lg text-white p-2  bg-inactiveGrey " +
              (whichTimer === WhichTimer.STUDY
                ? "bg-study rounded  "
                : "white	 ")
            }
          >
            study
          </button>
          <button
            onClick={() => setWhichTimer(WhichTimer.BREAK)}
            className={
              "w-1/2 rounded-r-lg text-white p-2  bg-inactiveGrey " +
              (whichTimer === WhichTimer.BREAK
                ? "bg-[#48B065] rounded"
                : "white	 ")
            }
          >
            break
          </button>
        </div>
        <div className="p-5 bg-white rounded h-[60vh]">{showPage()}</div>
      </>
    </div>
  );
};
export default Timer;
