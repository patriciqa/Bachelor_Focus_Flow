import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import saveToDb from "@/hooks/SaveToDb";
import { BreakComponent } from "@/types/Components";
import { Mood, Break, WhichTimer } from "@/types/Timer";

export default function BreakMoodCheckIn({
  setWhichTimer,
  setShowComponent,
  breakEntryy,
  setBreakEntryy,
}: {
  setWhichTimer: (d: WhichTimer) => void;
  setShowComponent: (p: BreakComponent) => void;
  breakEntryy: Break;
  setBreakEntryy: (s: Break) => void;
}) {
  const { examPhaseId } = useExamPhaseContext();

  return (
    <div className="flex flex-col">
      <div>Break - {breakEntryy.timer.duration} </div>
      <div>How do you feel after your break?</div>
      <button
        onClick={() => {
          const s = { ...breakEntryy };
          s.mood = Mood.GOOD;
          setBreakEntryy(s);
        }}
      >
        good
      </button>
      <button
        onClick={() => {
          const s = { ...breakEntryy };
          s.mood = Mood.NEUTRAL;
          setBreakEntryy(s);
        }}
      >
        neutral
      </button>
      <button
        onClick={() => {
          const s = { ...breakEntryy };
          s.mood = Mood.BAD;
          setBreakEntryy(s);
        }}
      >
        bad
      </button>
      <button
        onClick={() => {
          switch (breakEntryy.mood) {
            case Mood.GOOD:
            case Mood.NEUTRAL:
              setShowComponent(BreakComponent.NO_COMPONENT);
              saveToDb(examPhaseId, breakEntryy, false);
              setWhichTimer(WhichTimer.STUDY)
              break;
            case Mood.BAD:
              setShowComponent(BreakComponent.EXTEND_BREAK);
              break;
          }
        }}
      >
        continue
      </button>
    </div>
  );
}
