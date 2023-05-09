import MoodIcon from "@/component/icon/MoodIcon";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import saveToDb from "@/hooks/SaveToDb";
import sToM from "@/hooks/SecondsToMinutes";
import { BreakComponent, StudyComponent } from "@/types/Components";
import { Break, Mood, Study, WhichTimer } from "@/types/Timer";
import CustomButton from "../CustomButton";

export default function MoodCheckIn({
  isStudy,
  setWhichTimer,
  entry: entry,
  setEntry,
  setShowComponent,
  setStudyShowComponent,
}: {
  isStudy: boolean;
  setWhichTimer: (d: WhichTimer) => void;
  entry: Break | Study;
  setEntry: (s: Break | Study) => void;
  setShowComponent?: (p: BreakComponent) => void;
  setStudyShowComponent?: (p: StudyComponent) => void;
}) {
  const { examPhaseId } = useExamPhaseContext();

  return (
    <div className="flex flex-col items-center justify-center">
      {isStudy ? (
        <>
          <div>study - {sToM(entry.timer.duration)} min </div>
          <div className="text-center">How did your studying go?</div>
        </>
      ) : (
        <>
          <div>break - {sToM(entry.timer.duration)} min </div>
          <div className="text-center">
            How do you feel after <br /> this break?
          </div>
        </>
      )}
      <div className="flex flex-row">
        <MoodIcon
          isStudy={isStudy ? true : false}
          entry={entry}
          setEntry={setEntry}
        />{" "}
      </div>
      <div>{entry.mood}</div>
      <CustomButton
        size="regular"
        variant="break"
        onClick={() => {
          switch (entry.mood) {
            case Mood.GOOD:
            case Mood.RATHER_GOOD:
              if (isStudy) {
                if (setStudyShowComponent) {
                  setStudyShowComponent(StudyComponent.GOOD_REASON);
                }
              } else {
                if (setShowComponent) {
                  setShowComponent(BreakComponent.NO_COMPONENT);
                  saveToDb(examPhaseId, entry, false);
                  setWhichTimer(WhichTimer.STUDY);
                }
              }

              break;
            case Mood.BAD:
            case Mood.RATHER_BAD:
              if (isStudy) {
                if (setStudyShowComponent) {
                  setStudyShowComponent(StudyComponent.BAD_REASON);
                }
                console.log("study");
              } else {
                if (setShowComponent) {
                  setShowComponent(BreakComponent.EXTEND_BREAK);
                }
              }
              break;
          }
        }}
      >
        continue
      </CustomButton>
    </div>
  );
}
