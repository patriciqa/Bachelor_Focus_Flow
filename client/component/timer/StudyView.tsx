import { PageComponent, Study } from "@/types/Timer";
import React, { useEffect, useState } from "react";

export const StudyView = ({
  setShowComponent,
  setStudyEntry,
}: {
  setShowComponent: (s: PageComponent) => void;
  setStudyEntry: (s: Study) => void;
}) => {
  const [startTimer, setStartTimer] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  let duration = 3;

  const [state, setState] = useState({
    time: duration,
    minutes: Math.floor((duration - 1) / 60),
    seconds: duration - Math.floor((duration - 1) / 60) * 60 - 1,
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
  return (
    <div>
      <div>Study</div>
      <button
        onClick={() => {
          setStudyEntry({
            id: Date.now(),
            timer: {
              startTime: Date.now(),
              duration: state.time,
            },
          });
          setStartTimer(true);
        }}
      >
        Start
      </button>
      <div>
        {state.minutes}:
        {state.seconds <= 10 ? `0${state.seconds}` : state.seconds}
      </div>
      <button
        onClick={() => {
          setShowComponent(PageComponent.STUDYMOOD);
        }}
      >
        Take a break
      </button>
    </div>
  );
};
