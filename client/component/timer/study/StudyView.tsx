import CustomButton from "@/component/CustomButton";
import ModalPage from "@/component/settings/reasons/ModalPage";
import TimerSlider from "@/component/TimerSlider";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { useNavbarContext } from "@/context/HideNavbarContext";
import saveToDb from "@/hooks/SaveToDb";
import { StudyComponent } from "@/types/Components";
import { Study, TimerViewState, WhichTimer } from "@/types/Timer";
import React, { useEffect, useState } from "react";
import MoodCheckIn from "../MoodCheckIn";
import ExtendTimer from "./ExtendTimer";
import Reasons from "./Reasons";

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

  const whichTimer = (): React.ReactElement => {
    let component;
    switch (showComponent) {
      case StudyComponent.MOODCHECKIN:
        component = (
          <MoodCheckIn
            isStudy={true}
            setWhichTimer={setWhichTimer}
            entry={studyEntry}
            setEntry={setStudyEntry}
            setStudyShowComponent={setShowComponent}
          />
          // <StudyMoodCheckIn
          //   studyEntry={studyEntry}
          //   setStudyEntry={setStudyEntry}
          //   showComponent={showComponent}
          //   setShowComponent={setShowComponent}
          // />
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
        component = <div />;
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
        <CustomButton
          size="regular"
          variant="study"
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
        </CustomButton>
      )}

      {runningTimer === TimerViewState.RUNNING && (
        <CustomButton
          size="regular"
          variant="study"
          onClick={() => {
            setRunningTimer(TimerViewState.START);
            saveToDb(examPhaseId, studyEntry, true);
          }}
        >
          stop timer
        </CustomButton>
      )}

      {runningTimer === TimerViewState.FINISHED && (
        <>
          <ExtendTimer
            setDuration={setDuration}
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
            setRunningTimer={setRunningTimer}
          />
          <CustomButton
            size="regular"
            variant="study"
            onClick={() => {
              setOpen(true);
              setShowComponent(StudyComponent.MOODCHECKIN);
              setRunningTimer(TimerViewState.START);
            }}
          >
            finish
          </CustomButton>
        </>
      )}
      {showComponent !== null && (
        <ModalPage
          isStudy
          open={open}
          setOpen={setOpen}
          component={whichTimer()}
        />
      )}
    </div>
  );
};
