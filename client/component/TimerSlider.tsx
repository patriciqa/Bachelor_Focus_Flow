import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { useNavbarContext } from "@/context/HideNavbarContext";
import { Study, TimerValues, TimerViewState } from "@/types/Timer";
import CircularSlider from "@fseehawer/react-circular-slider";
import { useEffect } from "react";

export default function TimerSlider({
  runningTimer,
  setRunningTimer,
  duration,
  setDuration,
  studyEntry,
  setStudyEntry,
}: {
  runningTimer: TimerViewState;
  setRunningTimer: (t: TimerViewState) => void;
  duration: number;
  setDuration: (d: number) => void;
  studyEntry: Study;
  setStudyEntry: (d: Study) => void;
}) {
  useEffect(() => {
    if (runningTimer === TimerViewState.RUNNING) {
      setTimeout(() => {
        if (duration === 0) {
          setRunningTimer(TimerViewState.FINISHED);
          return;
        }

        setDuration(duration - 1);
      }, 1000);
    }
  }, [duration, runningTimer]);

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
          dataIndex={duration}
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
    </>
  );
}
