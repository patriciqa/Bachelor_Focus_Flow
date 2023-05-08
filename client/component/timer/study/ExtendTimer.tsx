import { Study, TimerViewState } from "@/types/Timer";
import Slider from "@mui/material/Slider";
import { useState } from "react";

export default function ExtendTimer({
  setDuration,
  studyEntry,
  setStudyEntry,
  setRunningTimer,
}: {
  setDuration: (d: number) => void;
  studyEntry: Study;
  setStudyEntry: (d: Study) => void;
  setRunningTimer: (d: TimerViewState) => void;
}) {
  const [extend, setExtend] = useState(15);
  return (
    <>
      <div>Extend Timer:</div>
      <div className="flex w-full">
        <Slider
          aria-label="Always visible"
          defaultValue={15}
          step={5}
          marks
          min={5}
          valueLabelDisplay="on"
          max={20}
          onChange={(extend: any) => {
            const extenedValue = extend.target.value;
            setExtend(extenedValue * 60);
            setDuration(extenedValue * 60);
          }}
        />
        {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
        <button
          onClick={() => {
            const e = { ...studyEntry };
            e.timer.duration += extend;
            setStudyEntry(e);
            setRunningTimer(TimerViewState.RUNNING);
          }}
        >
          extend start
        </button>
      </div>
    </>
  );
}