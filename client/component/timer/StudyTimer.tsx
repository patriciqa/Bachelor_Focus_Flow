import { Break, PageComponent, Settings, Study } from "@/types/Timer";
import { useEffect, useState } from "react";
import IndexedDb from "../../pages/db/IndexedDb";
import { BreakView } from "../break/BreakView";
import { StudyView } from "./StudyView";

export default function StudyTimer({
  db,
  setShowComponent,
  setStudyEntry,
  breakEntry,
  setBreakEntry,
  settings,
}: {
  db: IndexedDb;
  setShowComponent: (d: PageComponent) => void;
  setStudyEntry: (d: Study) => void;
  breakEntry: Break;
  setBreakEntry: (d: Break) => void;
  settings: Settings;
}) {
  const [studyTimer, setStudyTimer] = useState(true);


  return (
    <>
      <div className="bg-violet-300 p-5">
        <button onClick={() => setStudyTimer(true)} className="bg-pink-300">
          timer
        </button>
        <button onClick={() => setStudyTimer(false)}>break</button>
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
          settings={settings}
        />
      )}
    </>
  );
}
