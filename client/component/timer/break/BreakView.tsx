// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import CustomButton from "@/component/CustomButton";
import ModalPage from "@/component/settings/reasons/ModalPage";
import TimerSlider from "@/component/TimerSlider";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { useNavbarContext } from "@/context/HideNavbarContext";
import { getElement } from "@/db/Actions";
import saveToDb from "@/hooks/SaveToDb";
import { BreakComponent } from "@/types/Components";
import { Activity, Break, TimerViewState, WhichTimer } from "@/types/Timer";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import MoodCheckIn from "../MoodCheckIn";
import ActivitySelection from "./ActivitySelection";
import BreakSummary from "./BreakSummary";

export const BreakView = ({
  whichTimer,
  setWhichTimer,
  breakEntry,
  setbreakEntry,
}: {
  whichTimer: WhichTimer;
  setWhichTimer: (d: WhichTimer) => void;
  breakEntry: Break;
  setbreakEntry: (s: Break) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [runningTimer, setRunningTimer] = useState<TimerViewState>(
    TimerViewState.START
  );
  const { examPhaseId } = useExamPhaseContext();
  const [activity, setActivities] = useState<Activity>();

  const { setHideNavbar } = useNavbarContext();
  const [selected, setSelected] = useState<number | null>(-1);

  const [showComponent, setShowComponent] = useState<BreakComponent | null>(
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
            entry={breakEntry}
            setEntry={setbreakEntry}
            setShowComponent={setShowComponent}
          />
        );
        break;
      case BreakComponent.BREAK_SUMMARY:
        component = (
          <BreakSummary
            breakEntry={breakEntry}
            setbreakEntry={setbreakEntry}
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

  const getAllActivites = async () => {
    if (selected) {
      const data: Activity = await getElement("activities", selected);
      setActivities(data);
    } else {
      setActivities(undefined);
    }
  };

  useEffect(() => {
    getAllActivites();
  }, [selected]);

  const getActivity = (black: boolean): React.ReactElement | undefined => {
    let entry = undefined;
    if (activity !== undefined) {
      entry = (
        <div className="flex flex-row items-center " key={activity.id}>
          {activity.icon !== undefined && (
            <FontAwesomeIcon
              icon={activity.icon as IconProp}
              className={"pr-4 " + (black ? "text-white" : "text-break")}
            />
          )}
          <p className={black ? "text-white" : "text-dark"}>{activity.title}</p>
        </div>
      );
    }
    return entry;
  };

  return (
    <>
      {showTimer ? (
        <>
          <div className="flex flex-col items-center justify-center h-[25vh] my-20 ">
            {/* <div className="h-[10vh]">Yeah, keep going!</div> */}
            {runningTimer === TimerViewState.RUNNING && (
              <div className="my-[2vh] ">Enjoy your break.</div>
            )}
            {runningTimer === TimerViewState.START && (
              <div className="my-[2vh]">
                <br></br>
              </div>
            )}
            {runningTimer === TimerViewState.FINISHED && (
              <div className="my-[2vh]">Welcome back!</div>
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
              <div className="absolute flex flex-col items-center justify-center w-full bottom-2">
                {/* <div className="bg-transparent h-[30vh]" /> */}
                <button
                  className={
                    "w-5/6 px-4 py-2 mb-2 border rounded-full border-break text-dark"
                  }
                  onClick={() => {
                    setShowTimer(false);
                  }}
                >
                  {getActivity(false) !== undefined
                    ? getActivity(false)
                    : "no activity selected"}
                </button>
                <CustomButton
                  variant={duration !== 0 ? "break" : "disabled"}
                  onClick={() => {
                    setRunningTimer(TimerViewState.RUNNING);
                    setDuration(duration);
                    const e = { ...breakEntry };
                    e.timer.startTime = Date.now();
                    e.timer.duration = duration;
                    e.studyTimer = false;
                    e.breakActivityId = selected;
                    setbreakEntry(e);
                  }}
                >
                  start timer
                </CustomButton>
              </div>
            </>
          )}

          {runningTimer === TimerViewState.RUNNING && (
            <>
              <div className="absolute flex flex-col items-center justify-center w-full bottom-2">
                <button
                  className={
                    "w-4/6 px-4 py-2 mb-2 border rounded-full flex border-break bg-break text-white"
                  }
                >
                  {getActivity(true) !== undefined
                    ? getActivity(true)
                    : "no activity selected"}
                </button>
                <CustomButton
                  variant="break-unfilled"
                  onClick={() => {
                    const b = { ...breakEntry };
                    b.timer.duration = Math.round(
                      (Date.now() - b.timer.startTime) / 1000
                    );
                    setRunningTimer(TimerViewState.START);
                    saveToDb(examPhaseId, b, true);
                    // setbreakEntry(b);
                  }}
                >
                  cancel timer
                </CustomButton>
              </div>
            </>
          )}

          {runningTimer === TimerViewState.FINISHED && (
            <>
              <div className="absolute flex flex-col items-center justify-center w-full bottom-10">
                <CustomButton
                  variant="break"
                  onClick={() => {
                    setOpen(true);
                    setShowComponent(BreakComponent.MOODCHECKIN);
                    setRunningTimer(TimerViewState.START);
                    setSelected(-1);
                    setShowTimer(false);
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
            <p className="pt-2 text-h16 text-chartGrey">select 1 activity</p>
          </div>
          <ActivitySelection selected={selected} setSelected={setSelected} />
          <div className="absolute flex justify-center w-full bottom-10 ">
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
        <ModalPage open={open} setOpen={setOpen} component={showBreakPage()} />
      )}
    </>
  );
};
