import { Study, TimerViewState } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const ExtendSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#3880ff" : "#3880ff",
  height: 2,
  padding: "15px 0",
  " & .MuiSlider-thumb": {
    backgroundColor: "#5A55F4",
  },
  " & .MuiSlider-valueLabel": {
    backgroundColor: "#5A55F4",
  },
  "& .MuiSlider-valueLabel": {
    display: "none",
  },
  "& .MuiSlider-track": {
    height: "8px",
    backgroundColor: "#5A55F4",
  },
  "& .MuiSlider-rail": {
    height: "8px",
    backgroundColor: "#E5F0FF",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "transparent",
    height: 20,
    width: 1,
  },
  "& .MuiSlider-markLabel": {
    fontFamily: "Sofia Pro",
    fontSize: "18px",
    left: 8,
    paddingLeft: 10,
  },
  "& .MuiSlider-markLabelActive": {
    fontFamily: "Sofia Pro",
    fontSize: "18px",
  },
}));

const marks = [
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 15,
    label: "15",
  },
  {
    value: 20,
    label: "20",
  },
];
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
    <div className="h-[12vh] w-[83%] flex  justify-between  ">
      <div>
        <div>Extend timer:</div>
        <div className="flex w-[55vw] ">
          <ExtendSlider
            aria-label="ios slider"
            defaultValue={15}
            min={5}
            max={20}
            valueLabelDisplay="on"
            step={5}
            marks={marks}
            onChange={(extend: any) => {
              console.log(extend.target.value);
              const extenedValue = extend.target.value;
              console.log(extenedValue);

              setExtend(extenedValue * 60);
              setDuration(extenedValue * 60);
            }}
          />
        </div>
      </div>
      <div className="flex items-end justify-end p-5">
        <button
          className="border rounded-md w-[56px] h-[56px]  bg-study"
          onClick={() => {
            const e = { ...studyEntry };
            e.timer.duration += extend;
            console.log(e);
            setStudyEntry(e);
            setRunningTimer(TimerViewState.RUNNING);
          }}
        >
          <FontAwesomeIcon
            icon={["fas", "clock-rotate-left"]}
            color="white"
            size="xl"
          />
        </button>
      </div>
    </div>
  );
}
