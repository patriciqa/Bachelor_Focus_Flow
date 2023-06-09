import CustomButton from "@/component/CustomButton";
import ExtendTimerSlider from "@/component/ExtendTimerSlider";
import ModalPage from "@/component/settings/reasons/ModalPage";
import TimerSlider from "@/component/TimerSlider";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { useNavbarContext } from "@/context/HideNavbarContext";
import saveToDb from "@/hooks/SaveToDb";
import { StudyComponent } from "@/types/Components";
import { Study, TimerViewState, WhichTimer } from "@/types/Timer";
import React, { useEffect, useState } from "react";
import MoodCheckIn from "../MoodCheckIn";
import Reasons from "./Reasons";
import StudySummary from "./StudySummary";

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
  const [extend, setExtend] = useState<number>(0);
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
            entry={studyEntry}
            setEntry={setStudyEntry}
            setStudyShowComponent={setShowComponent}
          />
        );
        break;
      case StudyComponent.GOOD_REASON:
        component = (
          <Reasons
            good
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
            setShowComponent={setShowComponent}
          />
        );
        break;
      case StudyComponent.BAD_REASON:
        component = (
          <Reasons
            good={false}
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
            setShowComponent={setShowComponent}
          />
        );
        break;
      case StudyComponent.STUDY_SUMMARY:
        component = (
          <StudySummary
            studyEntry={studyEntry}
            setStudyEntry={setStudyEntry}
            setWhichTimer={setWhichTimer}
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
    <div className="flex flex-col items-center justify-center ">
      {runningTimer === TimerViewState.RUNNING && (
        <div className=" my-[2vh]   ">Yeah, keep going!</div>
      )}
      {runningTimer === TimerViewState.EXTEND && (
        <div className=" my-[2vh] ">Yeah, keep going!</div>
      )}
      {runningTimer === TimerViewState.START && (
        <div className=" my-[2vh] ">For how long would you like to study?</div>
      )}
      {runningTimer === TimerViewState.FINISHED && (
        <div className="flex flex-col mt-2 ml-1 mr-1 text-h16">
          In the flow? Slide to extend the timer. <br />{" "}
          <p className="pt-1 font-medium text-h14 text-chartGrey">
            (max. 20 minutes)
          </p>
        </div>
      )}
      {runningTimer === TimerViewState.START ||
      runningTimer === TimerViewState.RUNNING ? (
        <>
          <TimerSlider
            isStudy
            runningTimer={runningTimer}
            setRunningTimer={setRunningTimer}
            duration={duration}
            setDuration={setDuration}
          />
        </>
      ) : (
        <ExtendTimerSlider
          isStudy
          runningTimer={runningTimer}
          setRunningTimer={setRunningTimer}
          setExtend={setExtend}
          extend={extend}
        />
      )}
      {runningTimer === TimerViewState.START && (
        <div className="absolute bottom-10">
          <CustomButton
            variant={duration !== 0 ? "study" : "disabled"}
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
        </div>
      )}
      {runningTimer === TimerViewState.RUNNING && (
        <div className="absolute bottom-10">
          <CustomButton
            variant="study-unfilled"
            onClick={() => {
              setRunningTimer(TimerViewState.START);

              const s = { ...studyEntry };
              s.timer.duration = Math.round(
                (Date.now() - s.timer.startTime) / 1000
              );
              saveToDb(examPhaseId, s, true);
            }}
          >
            cancel timer
          </CustomButton>
        </div>
      )}
      {runningTimer === TimerViewState.EXTEND && (
        <>
          <CustomButton
            variant="study-unfilled"
            onClick={() => {
              setRunningTimer(TimerViewState.START);

              const s = { ...studyEntry };
              s.timer.duration = Math.round(
                (Date.now() - s.timer.startTime) / 1000
              );
              saveToDb(examPhaseId, s, true);
            }}
          >
            cancel timer
          </CustomButton>
        </>
      )}
      {runningTimer === TimerViewState.FINISHED && (
        <div className="absolute flex flex-col bottom-3">
          <button
            disabled={extend === 0}
            onClick={() => {
              const e = { ...studyEntry };
              if (extend !== undefined) {
                e.timer.duration += extend;
                setStudyEntry(e);
                setRunningTimer(TimerViewState.EXTEND);
              }
            }}
            className={
              " h-[8vh] p-4  rounded  flex w-full items-center justify-center text-h24 font-normal " +
              (extend !== 0
                ? " bg-study rounded text-white "
                : "text-inactiveGrey bg-white")
            }
          >
            extend by {extend / 60} mins
          </button>
          <CustomButton
            variant={extend === 0 ? "study" : "study-unfilled"}
            onClick={() => {
              setOpen(true);
              setShowComponent(StudyComponent.MOODCHECKIN);
              setRunningTimer(TimerViewState.START);
            }}
          >
            finish study session
          </CustomButton>
        </div>
      )}
      {showComponent !== null && (
        <ModalPage open={open} setOpen={setOpen} component={whichTimer()} />
      )}
    </div>
  );
};
