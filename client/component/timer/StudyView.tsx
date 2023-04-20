import { editElement, getElement } from "@/db/Actions";
import { ExamPhase, PageComponent, Study } from "@/types/Timer";
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
  const entry: Study = { id: 3, timer: { startTime: 30, duration: 30 } };
  return (
    <div>
      <div>Study</div>
      <button
        onClick={() => {
          const a = getElement("examPhases", examPhaseId);
          a.then((e: any) => {
            const hi: ExamPhase = { ...e };
            if (hi.studyEntries) {
              hi.studyEntries.push(entry);
            } else {
              const empty = [];
              empty.push(entry);
              hi.studyEntries = empty;
            }
            console.log(hi);
            console.log(examPhaseId);
            editElement("examPhases", examPhaseId, hi);
          });
          // editElement("examPhases");
          // editElement("examPhases", "3", entry);
        }}
      >
        start
      </button>
      <div>
        {state.minutes}:
        {state.seconds <= 10 ? `0${state.seconds}` : state.seconds}
      </div>

      <Link href="/mood/study"> finished</Link>
    </div>
  );
};
