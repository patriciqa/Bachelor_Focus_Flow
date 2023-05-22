import { ColorType } from "@/component/CancellButton";
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
  const [duration, setDuration] = useState(5);

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
          <div className="flex flex-col items-center justify-center h-[50vh] my-20 ">
            <div className="h-[10vh]">Yeah, keep going!</div>

            <TimerSlider
              isStudy={false}
              runningTimer={runningTimer}
              setRunningTimer={setRunningTimer}
              duration={duration}
              setDuration={setDuration}
            />
          </div>

          {runningTimer === TimerViewState.START && (
            <>
              <div className="bg-transparent h-[10vh]" />
              <CustomButton
                variant="break"
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
            </>
          )}

          {runningTimer === TimerViewState.RUNNING && (
            <>
              <div className="h-[10vh]"></div>
              <CustomButton
                variant="break-unfilled"
                onClick={() => {
                  const b = { ...breakEntryy };
                  b.timer.duration = Math.round(
                    (Date.now() - b.timer.startTime) / 1000
                  );
                  setRunningTimer(TimerViewState.START);
                  saveToDb(examPhaseId, b, true);
                  // setBreakEntryy(b);
                }}
              >
                finish break session
              </CustomButton>
            </>
          )}

          {runningTimer === TimerViewState.FINISHED && (
            <>
              <CustomButton
                variant="break"
                onClick={() => {
                  setOpen(true);
                  setShowComponent(BreakComponent.MOODCHECKIN);
                  setRunningTimer(TimerViewState.START);
                }}
              >
                finish break session
              </CustomButton>
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
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
          colorType={ColorType.BREAK}
          isStudy={false}
          open={open}
          setOpen={setOpen}
          component={showBreakPage()}
        />
      )}
    </>
  );
};
