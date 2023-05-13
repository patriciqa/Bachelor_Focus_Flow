import CustomButton from "@/component/CustomButton";
import ModalPage from "@/component/settings/reasons/ModalPage";
import TimerSlider from "@/component/TimerSlider";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { useNavbarContext } from "@/context/HideNavbarContext";
import saveToDb from "@/hooks/SaveToDb";
import { BreakComponent } from "@/types/Components";
import { Break, TimerViewState, WhichTimer } from "@/types/Timer";
import React, { useEffect, useState } from "react";
import MoodCheckIn from "../MoodCheckIn";
import ActivitySelection from "./ActivitySelection";
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
  const [selected, setSelected] = useState<number | null>(-1);

  const [showComponent, setShowComponent] = useState(
    BreakComponent.NO_COMPONENT
  );
  const [duration, setDuration] = useState(3);

  const showBreakPage = (): React.ReactElement => {
    let component;
    switch (showComponent) {
      case BreakComponent.MOODCHECKIN:
        component = (
          <MoodCheckIn
            isStudy={false}
            setWhichTimer={setWhichTimer}
            entry={breakEntryy}
            setEntry={setBreakEntryy}
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
            <CustomButton
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
            </CustomButton>
          )}

          {runningTimer === TimerViewState.RUNNING && (
            <CustomButton
              onClick={() => {
                setRunningTimer(TimerViewState.START);
                saveToDb(examPhaseId, breakEntryy, true);
              }}
            >
              stop timer
            </CustomButton>
          )}

          {runningTimer === TimerViewState.FINISHED && (
            <>
              <div>Welcome back!</div>
              <CustomButton
                onClick={() => {
                  setOpen(true);
                  setShowComponent(BreakComponent.MOODCHECKIN);
                  setRunningTimer(TimerViewState.START);
                }}
              >
                finish{" "}
              </CustomButton>
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex text-center text-24">
            What would you like to do <br /> in your break?
          </div>
          <p className="text-16 text-inactiveGrey">select 1 activity</p>
          <ActivitySelection selected={selected} setSelected={setSelected} />
          <CustomButton
            variant="break"
            onClick={() => {
              setShowTimer(true);
              setRunningTimer(TimerViewState.START);
            }}
          >
            set timer
          </CustomButton>
        </>
      )}
      {showComponent !== null && (
        <ModalPage
          isStudy={false}
          open={open}
          setOpen={setOpen}
          component={showBreakPage()}
        />
      )}
    </>
  );
};
