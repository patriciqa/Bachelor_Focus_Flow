import StudyMoodCheckIn from "@/component/timer/study/StudyMoodCheckIn.tsx";
import { Study } from "@/types/Timer";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Modal } from "@/component/transitions/Modal";
import { StudyComponent } from "@/types/Components";
import GoodReasons from "./causes/GoodReasons";
import BadReasons from "./causes/BadReasons";
import TimerSlider from "@/component/TimerSlider";

export const StudyView = ({
  studyEntry,
  setStudyEntry,
}: {
  studyEntry: Study;
  setStudyEntry: (s: Study) => void;
}) => {
  let [open, setOpen] = useState(false);
  let [showComponent, setShowComponent] = useState(StudyComponent.NO_COMPONENT);

  const [startTimer, setStartTimer] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  const [duration, setDuration] = useState(10);

  const showPage = (): React.ReactElement | null => {
    let component;
    switch (showComponent) {
      case StudyComponent.NO_COMPONENT:
        component = null;
        break;
      case StudyComponent.MOODCHECKIN:
        component = (
          <StudyMoodCheckIn
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
            showComponent={showComponent}
            setShowComponent={setShowComponent}
          />
        );
        break;
      case StudyComponent.GOOD_CAUSE:
        component = (
          <GoodReasons
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
            showComponent={showComponent}
            setShowComponent={setShowComponent}
          />
        );
        break;
      default:
        component = (
          <BadReasons
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
            showComponent={showComponent}
            setShowComponent={setShowComponent}
          />
        );
    }
    return component;
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <TimerSlider
        duration={duration}
        setDuration={setDuration}
        studyEntry={studyEntry}
        setStudyEntry={setStudyEntry}
      />

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
