import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import saveToDb from "@/hooks/SaveToDb";
import { BreakComponent } from "@/types/Components";
import { Break, WhichTimer } from "@/types/Timer";

export default function ExtendBreak({
  breakEntryy,
  setShowComponent,
  whichTimer,
  setWhichTimer,
}: {
  breakEntryy: Break;
  setShowComponent: (d: BreakComponent) => void;
  whichTimer: WhichTimer;
  setWhichTimer: (p: WhichTimer) => void;
}) {
  const { examPhaseId, setExamPhaseId } = useExamPhaseContext();

  return (
    <div className="flex flex-col ">
      <div>Need a longer break?</div>
      <button
        onClick={() => {
          setWhichTimer(WhichTimer.BREAK);
          setShowComponent(BreakComponent.NO_COMPONENT);
        }}
      >
        extend break???
      </button>
      <button
        onClick={() => {
          setWhichTimer(WhichTimer.STUDY);
          setShowComponent(BreakComponent.NO_COMPONENT);
          saveToDb(examPhaseId, breakEntryy, false);
        }}
      >
        continue studying
      </button>
    </div>
  );
}
