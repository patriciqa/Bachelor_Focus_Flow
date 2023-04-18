import { addElement } from "@/db/Actions";
import { Break, PageComponent, Study } from "@/types/Timer";
import { useEffect, useState } from "react";
import IndexedDb from "./archive/IndexedDb";
import { BreakView } from "./break/BreakView";
import { StudyView } from "./timer/StudyView";

export default function TimerComponent({
  setShowComponent,
  setStudyEntry,
  breakEntry,
  setBreakEntry,
}: {
  setShowComponent: (d: PageComponent) => void;
  setStudyEntry: (d: Study) => void;
  breakEntry: Break;
  setBreakEntry: (d: Break) => void;
}) {
  const [studyTimer, setStudyTimer] = useState(true);
  

  return (
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
          onClick={() => setStudyTimer(true)}
          className={"w-full  " + (studyTimer ? "bg-metal " : "white	 ")}
        >
          study
        </button>
        <button
          onClick={() => setStudyTimer(false)}
          className={"w-full  " + (studyTimer ? "white " : "bg-metal ")}
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
      {studyTimer ? (
        <StudyView
          setShowComponent={setShowComponent}
          setStudyEntry={setStudyEntry}
        />
      ) : (
        <BreakView
          setShowComponent={setShowComponent}
          breakEntry={breakEntry}
          setBreakEntry={setBreakEntry}
        />
      )}
    </>
  );
}
