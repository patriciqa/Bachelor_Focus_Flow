import { Study } from "@/types/Timer";
import CircularSlider from "@fseehawer/react-circular-slider";
import { useEffect, useRef, useState } from "react";

export default function TimerSlider({
  duration,
  setDuration,
  studyEntry,
  setStudyEntry,
}: {
  duration: number;
  setDuration: (d: number) => void;
  studyEntry: Study;
  setStudyEntry: (d: Study) => void;
}) {
  const [startTimer, setStartTimer] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const [state, setState] = useState({
    time: duration,
    minutes: Math.floor(duration / 60),
    seconds: duration - Math.floor(duration / 60) * 60 - 1,
  });
  useEffect(() => {
    if (startTimer) {
      setTimeout(() => {
        if (state.time === 0) {
          setTimerFinished(true);
          return;
        }

        setState({
          time: state.time - 1,
          minutes: Math.floor((state.time - 1) / 60),
          seconds: state.time - Math.floor((state.time - 1) / 60) * 60 - 1,
        });
      }, 1000);
    }
  }, [state.time, startTimer]);

  const toMinutesSeconds = (totalSeconds: number): string => {
    const seconds = Math.floor(totalSeconds % 60);
    let minutes = Math.floor((totalSeconds - 1) / 60);
    if (minutes === -1) {
      minutes = 0;
    }
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      <div className="z-0">
        <CircularSlider
          min={0}
          max={5400}
          dataIndex={state.time}
          hideLabelValue
          labelColor="#005a58"
          labelBottom={true}
          knobColor="#005a58"
          knobSize={72}
          progressColorFrom="#00bfbd"
          progressColorTo="#005a58"
          progressSize={24}
          trackColor="#eeeeee"
          trackSize={24}
          onChange={(value: number) => {
            const e = { ...studyEntry };
            e.timer.duration = value;
            setStudyEntry(e);
            setDuration(value);
          }}
        >
          {/* <div>icon</div> */}
        </CircularSlider>
      </div>
      <div className="absolute">
        <div className="z-10 flex items-center content-center justify-center w-20 h-20 pb-10 text-4xl ">
          {toMinutesSeconds(duration)}
        </div>
      </div>
      <button
        onClick={() => {
          setStartTimer(true);
          setState({
            time: duration,
            minutes: Math.floor(duration / 60),
            seconds: duration - Math.floor(duration / 60) * 60 - 1,
          });
        }}
      >
        start timer
      </button>
    </>
  );
}
