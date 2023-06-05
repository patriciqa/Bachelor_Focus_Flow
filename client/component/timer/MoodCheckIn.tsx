import MoodIcon from "@/component/icon/MoodIcon";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import sToM from "@/hooks/SecondsToMinutes";
import { BreakComponent, StudyComponent } from "@/types/Components";
import { Break, Mood, Study, WhichTimer } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomButton, { buttonVariant } from "../CustomButton";

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
  const getVariant = (): buttonVariant => {
    if (entry.mood === undefined) {
      return "disabled";
    } else {
      if (isStudy) {
        return "study";
      } else {
        return "break";
      }
    }
  };
  return (
    <div className="relative flex flex-col items-center h-full">
      {isStudy ? (
        <>
          <div className="mb-6 text-h16 font-light text-pieGrey pt-[10vh]">
            <FontAwesomeIcon
              icon={["fas", "clock"]}
              className=" text-pieGrey"
            />{" "}
            study {sToM(entry.timer.duration)}min
          </div>
          <div className="text-center pb-[10%]">How did your studying go?</div>
        </>
      ) : (
        <>
          <div className="mb-6 text-h16 font-light text-pieGrey pt-[10vh]">
            <FontAwesomeIcon icon={["fas", "clock"]} className="text-pieGrey" />{" "}
            break {sToM(entry.timer.duration)}min
          </div>
          <div className="text-center pb-14">
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
      <div className="text-h36 pt-[5vh]">{entry.mood}</div>
      <div className="absolute bottom-[5%]">
        <CustomButton
          variant={getVariant() as buttonVariant}
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
                    setShowComponent(BreakComponent.EXTEND_BREAK);
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
            if (setShowComponent) {
              setShowComponent(BreakComponent.EXTEND_BREAK);
            }
          }}
        >
          continue
        </CustomButton>
      </div>
    </div>
  );
}
