import {  Study } from "@/types/Timer";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ExamContext } from "../context/ExamPhaseContext";

export const StudyView = ({
  studyEntryy,
  setStudyEntryy,
}: {
  studyEntryy: Study;
  setStudyEntryy: (s: Study) => void;
}) => {
  const [startTimer, setStartTimer] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const { examPhaseId, setExamPhaseId } = useContext(ExamContext);

  const [duration, setDuration] = useState(3);

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
  }, [state.time, startTimer, duration]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div>Study</div>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="duration (number)"
        required
        className="bg-silver"
        onChange={(i) => {
          const e = { ...studyEntryy };
          const d = parseInt(i.target.value);
          e.timer.duration = d;
          setStudyEntryy(e);
          setDuration(d);
        }}
      />
      <div>
        {state.minutes}:
        {state.seconds <= 10 ? `0${state.seconds}` : state.seconds}
        <p>(slider)</p>
      </div>
      <button
        onClick={() => {
          const e = { ...studyEntryy };
          e.timer.startTime = Date.now();
          setStudyEntryy(e);
        }}
      >
        start
      </button>

      <Link href="/mood/study"> finished</Link>
    </div>
  );
};
