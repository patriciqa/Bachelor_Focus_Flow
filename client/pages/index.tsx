import { Break, ShowPage, Study } from "@/types/Timer";
import React, { useContext, useEffect, useState } from "react";
import initDb from "@/db/InitDb";
import { BreakView } from "@/component/timer/break/BreakView";
import { getElement } from "@/db/Actions";
import CreatePhaseView from "@/component/timer/CreatePhaseView";
import { ExamContext } from "@/context/ExamPhaseContext";
import { StudyView } from "@/component/timer/study/StudyView";

const Timer = ({
  studyEntryy,
  setStudyEntryy,
  breakEntryy,
  setBreakEntryy,
  shownPage,
  setShownPage,
}: {
  studyEntryy: Study;
  setStudyEntryy: (s: Study) => void;
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
          <StudyView
            studyEntryy={studyEntryy}
            setStudyEntryy={setStudyEntryy}
          />
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
          <StudyView
            studyEntryy={studyEntryy}
            setStudyEntryy={setStudyEntryy}
          />
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
        {/* <input
        type="time"
        id="appt"
        name="appt"
        min="09:00"
        max="18:00"
        required
        onChange={() => {
          let inputValue = (document.getElementById("appt") as HTMLInputElement)
            .value;
          setState({
            time: parseInt(inputValue) - 1,
            minutes: Math.floor((parseInt(inputValue) - 1) / 60),
            seconds:
              parseInt(inputValue) -
              Math.floor((parseInt(inputValue) - 1) / 60) * 60 -
              1,
          });
          console.log(parseInt(inputValue));
        }}
      /> */}
        {showPage()}
      </>
    </div>
  );
};
export default Timer;
