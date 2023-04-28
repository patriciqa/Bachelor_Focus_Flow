import StudyMoodCheckIn from "@/component/timer/study/StudyMoodCheckIn.tsx";
import { WhichTimer, Study, TimerValues, TimerViewState } from "@/types/Timer";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Modal } from "@/component/transitions/Modal";
import { StudyComponent } from "@/types/Components";
import GoodReasons from "./causes/GoodReasons";
import BadReasons from "./causes/BadReasons";
import TimerSlider from "@/component/TimerSlider";
import { useNavbarContext } from "@/context/HideNavbarContext";
import ExtendTimer from "../ExtendTimer";
import saveToDb from "@/hooks/SaveToDb";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";

export const StudyView = ({
  setWhichTimer,
  studyEntry,
  setStudyEntry,
}: {
  setWhichTimer: (d: WhichTimer) => void;
  studyEntry: Study;
  setStudyEntry: (s: Study) => void;
}) => {
  const { examPhaseId } = useExamPhaseContext();
  const { setHideNavbar } = useNavbarContext();
  let [open, setOpen] = useState(false);
  let [showComponent, setShowComponent] = useState(StudyComponent.NO_COMPONENT);

  const [runningTimer, setRunningTimer] = useState<TimerViewState>(
    TimerViewState.START
  );
  const [duration, setDuration] = useState(2);
  const [state, setState] = useState<TimerValues>({
    time: duration,
    minutes: Math.floor(duration / 60),
    seconds: duration - Math.floor(duration / 60) * 60 - 1,
  });

  const whichTimer = (): React.ReactElement | null => {
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
            setWhichTimer={setWhichTimer}
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

  useEffect(() => {
    switch (runningTimer) {
      case TimerViewState.START:
        setHideNavbar(false);
        break;
      case TimerViewState.RUNNING:
      case TimerViewState.FINISHED:
        setHideNavbar(true);
    }
  }, [runningTimer]);
  // if (isStarting) {

  //   setRunningTimer(TimerViewState.);
  //   setHideNavbar(true);
  // } else {
  //   setRunningTimer(false);
  //   setHideNavbar(false);
  // }

  return (
    <div className="flex flex-col items-center justify-center">
      <TimerSlider
        runningTimer={runningTimer}
        setRunningTimer={setRunningTimer}
        duration={duration}
        setDuration={setDuration}
        studyEntry={studyEntry}
        setStudyEntry={setStudyEntry}
      />
      {/* <ExtendTimer
        state={state}
        setState={setState}
        duration={duration}
        setDuration={setDuration}
        studyEntry={studyEntry}
        setStudyEntry={setStudyEntry}
      /> */}

      {runningTimer === TimerViewState.START && (
        <button
          onClick={() => {
            // startOrStoppTimer(TimerViewState.RUNNING);
            setRunningTimer(TimerViewState.RUNNING);
            setDuration(duration);
            const e = { ...studyEntry };
            e.timer.startTime = Date.now();
            e.timer.duration = duration;
            setStudyEntry(e);
            // setDuration(value);
          }}
        >
          start timer
        </button>
      )}

      {runningTimer === TimerViewState.RUNNING && (
        <button
          onClick={() => {
            setRunningTimer(TimerViewState.START);
            saveToDb(examPhaseId, studyEntry, true);
          }}
        >
          Stop Timer
        </button>
      )}

      {runningTimer === TimerViewState.FINISHED && (
        <>
          <ExtendTimer
            duration={duration}
            setDuration={setDuration}
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
            setRunningTimer={setRunningTimer}
          />
          <button
            onClick={() => {
              setOpen(true);
              setShowComponent(StudyComponent.MOODCHECKIN);
              setRunningTimer(TimerViewState.START);
            }}
          >
            Finish
          </button>
        </>
      )}
      <AnimatePresence>
        {open && (
          <Modal onClose={() => setOpen(false)}>
            <button
              className="mr-1 text-blue-500 focus:outline-none"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            {whichTimer() !== null ? whichTimer() : setOpen(false)}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
