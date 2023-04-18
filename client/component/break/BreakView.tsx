import { Break, PageComponent, Study } from "@/types/Timer";
import React, { useEffect, useState } from "react";

export const BreakView = ({
  setShowComponent,
  breakEntry,
  setBreakEntry,
}: {
  setShowComponent: (s: PageComponent) => void;
  breakEntry: Break;
  setBreakEntry: (s: Break) => void;
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
    <>
      <div>Break</div>
      <div>
        {state.minutes}:
        {state.seconds <= 10 ? `0${state.seconds}` : state.seconds}
      </div>

      {/* {settings.breakActivities.map((c) => (
        <div>
          <button
            onClick={() => {
              const s = { ...breakEntry };
              s.breakActivity = { activity: c };
              console.log(s);
              setBreakEntry(s);
            }}
          >
            {c.title}
          </button>
        </div>
      ))} */}
      <button
        onClick={() => {
          setBreakEntry({
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

      <button
        onClick={() => {
          setShowComponent(PageComponent.BREAKMOOD);
        }}
      >
        Finish
      </button>
    </>
  );
};
