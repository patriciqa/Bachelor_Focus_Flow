import { Break, ShowPage, Study } from "@/types/Timer";
import React, { useContext, useEffect, useState } from "react";
import initDb from "@/db/InitDb";
import { BreakView } from "@/component/timer/break/BreakView";
import { getElement } from "@/db/Actions";
import CreatePhaseView from "@/component/timer/CreatePhaseView";
import { ExamContext } from "@/context/ExamPhaseContext";
import { StudyView } from "@/component/timer/study/StudyView";

const Timer = ({
  studyEntry,
  setStudyEntry,
  breakEntryy,
  setBreakEntryy,
  shownPage,
  setShownPage,
}: {
  studyEntry: Study;
  setStudyEntry: (s: Study) => void;
  breakEntryy: Break;
  setBreakEntryy: (s: Break) => void;
  shownPage: ShowPage;
  setShownPage: (s: ShowPage) => void;
}) => {
  const { examPhaseId, setExamPhaseId } = useContext(ExamContext);

  useEffect(() => {
    initDb();
    getElement("examPhases", "all").then(
      (result: any) => {
        if (result.length === 0) {
          setShownPage(ShowPage.EXAMPHASE);
        } else {
          // setShownPage(ShowPage.STUDY);
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
    switch (shownPage) {
      case ShowPage.STUDY:
        component = (
          <StudyView studyEntry={studyEntry} setStudyEntry={setStudyEntry} />
        );
        break;
      case ShowPage.BREAK:
        component = (
          <BreakView
            shownPage={shownPage}
            setShownPage={setShownPage}
            breakEntryy={breakEntryy}
            setBreakEntryy={setBreakEntryy}
          />
        );
        break;
      case ShowPage.EXAMPHASE:
        component = <CreatePhaseView />;
        break;
      default:
        component = (
          <StudyView studyEntry={studyEntry} setStudyEntry={setStudyEntry} />
        );
    }
    return component;
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <>
        <div className="flex justify-center w-full p-5 ">
          <button
            onClick={() => setShownPage(ShowPage.STUDY)}
            className={
              "w-full  " +
              (shownPage === ShowPage.STUDY ? "bg-metal " : "white	 ")
            }
          >
            study
          </button>
          <button
            onClick={() => setShownPage(ShowPage.BREAK)}
            className={
              "w-full  " +
              (shownPage === ShowPage.BREAK ? "bg-metal " : "white ")
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
