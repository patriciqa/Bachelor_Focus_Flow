import StudyMoodCheckIn from "@/component/timer/study/StudyMoodCheckIn.tsx";
import { Study } from "@/types/Timer";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, {  useEffect, useState } from "react";
import { Modal } from "@/component/Modal";
import { StudyComponent } from "@/types/Components";
import GoodReasons from "./causes/GoodReasons";
import BadReasons from "./causes/BadReasons";

export const StudyView = ({
  studyEntryy,
  setStudyEntryy,
}: {
  studyEntryy: Study;
  setStudyEntryy: (s: Study) => void;
}) => {
  let [open, setOpen] = useState(false);
  let [showComponent, setShowComponent] = useState(StudyComponent.NO_COMPONENT);

  const [startTimer, setStartTimer] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

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

  const showPage = (): React.ReactElement | null => {
    let component;
    switch (showComponent) {
      case StudyComponent.NO_COMPONENT:
        component = null;
        break;
      case StudyComponent.MOODCHECKIN:
        component = (
          <StudyMoodCheckIn
            studyEntryy={studyEntryy}
            setStudyEntryy={setStudyEntryy}
            showComponent={showComponent}
            setShowComponent={setShowComponent}
          />
        );
        break;
      case StudyComponent.GOOD_CAUSE:
        component = (
          <GoodReasons
            studyEntryy={studyEntryy}
            setStudyEntryy={setStudyEntryy}
            showComponent={showComponent}
            setShowComponent={setShowComponent}
          />
        );
        break;
      default:
        component = (
          <BadReasons
            studyEntryy={studyEntryy}
            setStudyEntryy={setStudyEntryy}
            showComponent={showComponent}
            setShowComponent={setShowComponent}
          />
        );
    }
    return component;
  };
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
      <button
        onClick={() => {
          setOpen(true);
          setShowComponent(StudyComponent.MOODCHECKIN);
        }}
      >
        modal
      </button>
      <AnimatePresence>
        {open && (
          <Modal onClose={() => setOpen(false)}>
            <button
              className="mr-1 text-blue-500 focus:outline-none"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            {showPage() !== null ? showPage() : setOpen(false)}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
