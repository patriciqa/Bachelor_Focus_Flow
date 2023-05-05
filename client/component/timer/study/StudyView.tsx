import StudyMoodCheckIn from "@/component/timer/study/StudyMoodCheckIn.tsx";
import TimerSlider from "@/component/TimerSlider";
import { Modal } from "@/component/transitions/Modal";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { useNavbarContext } from "@/context/HideNavbarContext";
import saveToDb from "@/hooks/SaveToDb";
import { StudyComponent } from "@/types/Components";
import { Study, TimerViewState, WhichTimer } from "@/types/Timer";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import ExtendTimer from "../ExtendTimer";
import Reasons from "./reasons/Reasons";

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
  const [open, setOpen] = useState(false);
  const [showComponent, setShowComponent] = useState(
    StudyComponent.NO_COMPONENT
  );

  const [runningTimer, setRunningTimer] = useState<TimerViewState>(
    TimerViewState.START
  );
  const [duration, setDuration] = useState(2);

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
      case StudyComponent.GOOD_REASON:
        component = (
          <Reasons
            good
            setWhichTimer={setWhichTimer}
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
            setShowComponent={setShowComponent}
          />
        );
        break;
      default:
        component = (
          <Reasons
            good={false}
            setWhichTimer={setWhichTimer}
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
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

  return (
    <div className="flex flex-col items-center justify-center">
      <TimerSlider
        runningTimer={runningTimer}
        setRunningTimer={setRunningTimer}
        duration={duration}
        setDuration={setDuration}
      />

      {runningTimer === TimerViewState.START && (
        <button
          onClick={() => {
            setRunningTimer(TimerViewState.RUNNING);
            setDuration(duration);
            const e = { ...studyEntry };
            e.timer.startTime = Date.now();
            e.timer.duration = duration;
            e.studyTimer = true;
            setStudyEntry(e);
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
          stop timer
        </button>
      )}

      {runningTimer === TimerViewState.FINISHED && (
        <>
          <ExtendTimer
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
            finish
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
