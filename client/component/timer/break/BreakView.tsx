// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ColorType } from "@/component/CancellButton";
import CustomButton from "@/component/CustomButton";
import ModalPage from "@/component/settings/reasons/ModalPage";
import TimerSlider from "@/component/TimerSlider";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { useNavbarContext } from "@/context/HideNavbarContext";
import { getElement } from "@/db/Actions";
import saveToDb from "@/hooks/SaveToDb";
import { BreakComponent } from "@/types/Components";
import { Activity, Break, TimerViewState, WhichTimer } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import MoodCheckIn from "../MoodCheckIn";
import ActivitySelection from "./ActivitySelection";
import BreakSummary from "./BreakSummary";

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

  console.log(selected);
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
          <BreakSummary
            breakEntryy={breakEntryy}
            setBreakEntryy={setBreakEntryy}
            whichTimer={whichTimer}
            setWhichTimer={setWhichTimer}
            setShowComponent={setShowComponent}
          />
        );
        break;
      default:
        setShowComponent(null);
        component = null;
        setShowTimer(false);
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
  const [activity, setActivities] = useState<Activity>();

  const getAllActivites = async () => {
    if (selected) {
      const data: Activity = await getElement("activities", selected);
      setActivities(data);
    }
  };

  useEffect(() => {
    getAllActivites();
  }, [selected]);

  const getActivity = (): React.ReactElement => {
    let entry = undefined;
    if (activity !== undefined) {
      entry = (
        <div className="flex flex-row items-center " key={activity.id}>
          {activity.icon !== undefined && (
            <FontAwesomeIcon icon={activity.icon} className="pr-4" />
          )}
          <p className="text-dark">{activity.title}</p>
        </div>
      );
    }
    console.log(activity);
    return entry;
  };
  return (
    <>
      {showTimer ? (
        <>
          <div className="flex flex-col items-center justify-center h-[25vh] my-20 ">
            {/* <div className="h-[10vh]">Yeah, keep going!</div> */}
            {runningTimer === TimerViewState.RUNNING && (
              <div className="h-[10vh] mb-8">Enjoy your break.</div>
            )}{" "}
            {runningTimer === TimerViewState.START && (
              <div className="h-[10vh] mb-8" />
            )}
            {runningTimer === TimerViewState.FINISHED && (
              <div className="h-[10vh] mb-8">Welcome back!</div>
            )}
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
              <div className="flex flex-col items-center justify-center">
                {/* <div className="bg-transparent h-[30vh]" /> */}
                <button
                  className={
                    "w-4/6 px-4 py-2 mb-2 border rounded-full border-break text-dark"
                  }
                >
                  {getActivity() !== undefined
                    ? getActivity()
                    : "no activity selected"}
                </button>
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
              </div>
            </>
          )}

          {runningTimer === TimerViewState.RUNNING && (
            <>
              <div className="flex flex-col items-center justify-center">
                <button
                  className={
                    "w-4/6 px-4 py-2 mb-2 border rounded-full border-break bg-break text-white"
                  }
                >
                  {getActivity() !== undefined
                    ? getActivity()
                    : "no activity selected"}
                </button>
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
                  cancel timer
                </CustomButton>
              </div>
            </>
          )}

          {runningTimer === TimerViewState.FINISHED && (
            <>
              <div className="flex flex-col items-center justify-center">
                <CustomButton
                  variant="break"
                  onClick={() => {
                    setOpen(true);
                    setShowComponent(BreakComponent.MOODCHECKIN);
                    setRunningTimer(TimerViewState.START);
                    setSelected(-1);
                  }}
                >
                  finish break session
                </CustomButton>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center pt-4 text-center text-h24 ">
            What would you like to do <br /> in your break?
            <p className="pt-2 text-h14 text-inactiveGrey">select 1 activity</p>
          </div>
          <ActivitySelection selected={selected} setSelected={setSelected} />
          <div className="flex justify-center">
            <CustomButton
              variant={
                selected === null || selected !== -1 ? "break" : "disabled"
              }
              onClick={() => {
                setShowTimer(true);
                setRunningTimer(TimerViewState.START);
              }}
            >
              set timer
            </CustomButton>
          </div>
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
