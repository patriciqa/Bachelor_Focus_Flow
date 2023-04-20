import { Break, Study } from "@/types/Timer";
import React, { useContext, useEffect, useState } from "react";
import initDb from "@/db/InitDb";
import { StudyView } from "@/component/timer/StudyView";
import { BreakView } from "@/component/timer/BreakView";
import { getElement } from "@/db/Actions";
import CreatePhaseView from "@/component/timer/CreatePhaseView";
import { ExamContext } from "@/component/context/ExamPhaseContext";
enum ShowPage {
  STUDY,
  BREAK,
  EXAMPHASE,
}
const Timer = ({
  studyEntryy,
  setStudyEntryy,
  breakEntryy,
  setBreakEntryy,
}: {
  studyEntryy: Study;
  setStudyEntryy: (s: Study) => void;
  breakEntryy: Break;
  setBreakEntryy: (s: Break) => void;
}) => {
  const [shownPage, setShownPage] = useState<ShowPage>(ShowPage.STUDY);
  const { examPhaseId, setExamPhaseId } = useContext(ExamContext);

  useEffect(() => {
    initDb();
    getElement("examPhases", "all").then(
      (result: any) => {
        if (result.length === 0) {
          setShownPage(ShowPage.EXAMPHASE);
        } else {
          setShownPage(ShowPage.STUDY);
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
      {/* {showPage()} */}
      <>
        {/* <button
        onClick={() =>
          addElement("activities", {
            title: "bad sleep",
            icon: "sth",
            statistic: 3,
            goodCause: false,
            archived: false,
          })
        }
      >
        eintrag
      </button> */}
        <div className="flex justify-center w-full p-5 ">
          <button
            onClick={() => setShownPage(ShowPage.STUDY)}
            className={"w-full  " + (shownPage ? "bg-metal " : "white	 ")}
          >
            study
          </button>
          <button
            onClick={() => setShownPage(ShowPage.BREAK)}
            className={"w-full  " + (shownPage ? "white " : "bg-metal ")}
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
