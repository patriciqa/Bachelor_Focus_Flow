import { ColorType } from "@/component/CancellButton";
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
            setWhichTimer={setWhichTimer}
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
            setWhichTimer={setWhichTimer}
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
            setWhichTimer={setWhichTimer}
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
            // setShowComponent={setShowComponent}
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
    <div className="flex flex-col items-center justify-center h-[50vh] my-10 relative">
      {runningTimer === TimerViewState.RUNNING && (
        <div className="h-[10vh] mb-8">Yeah, keep going!</div>
      )}{" "}
      {runningTimer === TimerViewState.EXTEND && (
        <div className="h-[10vh] mb-8">Yeah, keep going!</div>
      )}{" "}
      {runningTimer === TimerViewState.START && (
        <div className="h-[10vh] mb-8" />
      )}
      {runningTimer === TimerViewState.FINISHED && (
        <div className="h-[10vh] mb-8 text-h16">
          In the flow? Slide to extend the timer. <br />{" "}
          <p className="pt-1 text-h14 text-chartGrey">(max. 20 minutes)</p>
        </div>
      )}
      {runningTimer === TimerViewState.START ||
      runningTimer === TimerViewState.RUNNING ? (
        <TimerSlider
          isStudy
          runningTimer={runningTimer}
          setRunningTimer={setRunningTimer}
          duration={duration}
          setDuration={setDuration}
        />
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
        <>
          <div className="bg-transparent h-[10vh]" />
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
        </>
      )}
      {runningTimer === TimerViewState.RUNNING && (
        <>
          <div className="h-[10vh]"></div>
          <CustomButton
            size="regular"
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
      {runningTimer === TimerViewState.EXTEND && (
        <>
          <div className="h-[10vh]"></div>
          <CustomButton
            size="regular"
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
        <>
          <button
            onClick={() => {
              const e = { ...studyEntry };
              if (extend !== undefined) {
                e.timer.duration += extend;
                console.log(e);
                setStudyEntry(e);
                setRunningTimer(TimerViewState.EXTEND);
              }
            }}
            className={
              " h-[56px] p-4 m-2 rounded  flex w-5/6 items-center  justify-center text-h24 font-normal " +
              (extend !== 0
                ? " bg-study rounded text-white "
                : "text-chartGrey bg-white")
            }
          >
            extend by {extend / 60} mins
          </button>
          <CustomButton
            size="regular"
            variant={extend === 0 ? "study" : "study-unfilled"}
            onClick={() => {
              setOpen(true);
              setShowComponent(StudyComponent.MOODCHECKIN);
              setRunningTimer(TimerViewState.START);
            }}
          >
            finish study session
          </CustomButton>
        </>
      )}
      {showComponent !== null && (
        <ModalPage
          colorType={ColorType.STUDY}
          isStudy
          open={open}
          setOpen={setOpen}
          component={whichTimer()}
        />
      )}
    </div>
  );
};
