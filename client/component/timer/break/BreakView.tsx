import ModalPage from "@/component/settings/causes/ModalPage";
import TimerSlider from "@/component/TimerSlider";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { useNavbarContext } from "@/context/HideNavbarContext";
import saveToDb from "@/hooks/SaveToDb";
import { BreakComponent } from "@/types/Components";
import { Break, TimerViewState, WhichTimer } from "@/types/Timer";
import React, { useEffect, useState } from "react";
import ActivitySelection from "./ActivitySelection";
import BreakMoodCheckIn from "./BreakMoodCheckIn.tsx";
import ExtendBreak from "./ExtendBreak";

export const BreakView = ({
  whichTimer,
  setWhichTimer,
  breakEntryy,
  setBreakEntryy,
}: {
  whichTimer: WhichTimer;
  setWhichTimer: (d: WhichTimer) => void;
  breakEntryy: Break;
  setBreakEntryy: (s: Break) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [runningTimer, setRunningTimer] = useState<TimerViewState>(
    TimerViewState.START
  );
  const { examPhaseId } = useExamPhaseContext();

  const { setHideNavbar } = useNavbarContext();
  const [selected, setSelected] = useState<string>("");

  const [showComponent, setShowComponent] = useState(
    BreakComponent.NO_COMPONENT
  );
  const [duration, setDuration] = useState(3);

  const showBreakPage = (): React.ReactElement => {
    let component;
    switch (showComponent) {
      case BreakComponent.MOODCHECKIN:
        component = (
          <BreakMoodCheckIn
            setWhichTimer={setWhichTimer}
            breakEntryy={breakEntryy}
            setBreakEntryy={setBreakEntryy}
            setShowComponent={setShowComponent}
          />
        );
        break;
      case BreakComponent.EXTEND_BREAK:
        component = (
          <ExtendBreak
            breakEntryy={breakEntryy}
            whichTimer={whichTimer}
            setWhichTimer={setWhichTimer}
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
    <>
      <div>Break</div>

      {showTimer ? (
        <>
          <div className="flex flex-col items-center justify-center">
            <TimerSlider
              runningTimer={runningTimer}
              setRunningTimer={setRunningTimer}
              duration={duration}
              setDuration={setDuration}
            />
          </div>

          {runningTimer === TimerViewState.START && (
            <button
              onClick={() => {
                setRunningTimer(TimerViewState.RUNNING);
                setDuration(duration);
                const e = { ...breakEntryy };
                e.timer.startTime = Date.now();
                e.timer.duration = duration;
                e.studyTimer = false;
                e.breakActivityId = selected;
                setBreakEntryy(e);
              }}
            >
              start timer
            </button>
          )}

          {runningTimer === TimerViewState.RUNNING && (
            <button
              onClick={() => {
                setRunningTimer(TimerViewState.START);
                saveToDb(examPhaseId, breakEntryy, true);
              }}
            >
              stop timer
            </button>
          )}

          {runningTimer === TimerViewState.FINISHED && (
            <>
              <div>Welcome back!</div>
              <button
                onClick={() => {
                  setOpen(true);
                  setShowComponent(BreakComponent.MOODCHECKIN);
                  setRunningTimer(TimerViewState.START);
                }}
              >
                Finish
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <div>what would you like to do in your break?</div>
          <ActivitySelection selected={selected} setSelected={setSelected} />
          <button
            onClick={() => {
              setShowTimer(true);
              setRunningTimer(TimerViewState.START);
            }}
          >
            set timer
          </button>
        </>
      )}
      {showComponent !== null && (
        <ModalPage open={open} setOpen={setOpen} component={showBreakPage()} />
      )}
    </>
  );
};
