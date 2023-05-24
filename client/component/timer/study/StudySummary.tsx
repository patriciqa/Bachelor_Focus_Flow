import CustomButton from "@/component/CustomButton";
import Tag from "@/component/overview/Tag";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import saveToDb from "@/hooks/SaveToDb";
import { Study, WhichTimer } from "@/types/Timer";

export default function StudySummary({
  studyEntry,
  setStudyEntry,
  // setShowComponent,
  setWhichTimer,
}: {
  studyEntry: Study;
  setStudyEntry: (d: Study) => void;
  // setShowComponent: (d: BreakComponent) => void;
  setWhichTimer: (p: WhichTimer) => void;
}) {
  const { examPhaseId, setExamPhaseId } = useExamPhaseContext();

  return (
    <div className="relative flex flex-col items-center h-full pt-20 ">
      <div className="w-[80vw] text-h14 text-pieGrey pb-4">
        Seems like your studying didn't go well. You should consider taking a
        longer break and do something you enjoy.
      </div>
      <div className="flex justify-center">
        <Tag entry={studyEntry} />
      </div>
      <div className="absolute flex flex-col items-center justify-end bottom-20 ">
        <CustomButton
          variant="study"
          onClick={() => {
            setWhichTimer(WhichTimer.BREAK);
            // setShowComponent(BreakComponent.NO_COMPONENT);
            saveToDb(examPhaseId, studyEntry, false);
            setStudyEntry({ timer: { startTime: 0, duration: 0 } });
            // setWhichTimer(WhichTimer.BREAK);
            // setShowComponent(BreakComponent.NO_COMPONENT);
            // saveToDb(examPhaseId, breakEntryy, false);
            // setBreakEntryy({ timer: { startTime: 0, duration: 0 } });
          }}
        >
          take a break
        </CustomButton>
      </div>
    </div>
  );
}
