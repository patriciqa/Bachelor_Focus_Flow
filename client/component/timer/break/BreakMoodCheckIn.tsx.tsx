import { ExamContext } from "@/context/ExamPhaseContext";
import saveToDb from "@/hooks/SaveToDb";
import { BreakComponent } from "@/types/Components";
import { Mood, Break } from "@/types/Timer";
import { useContext } from "react";

export default function BreakMoodCheckIn({
  setShowComponent,
  breakEntryy,
  setBreakEntryy,
}: {
  setShowComponent: (p: BreakComponent) => void;
  breakEntryy: Break;
  setBreakEntryy: (s: Break) => void;
}) {
  const { examPhaseId } = useContext(ExamContext);

  return (
    <div className="flex flex-col">
      <div>Break - {breakEntryy.timer.duration} </div>
      <div>
        How do you feel after {breakEntryy.breakActivityId} (get title of
        activity)
      </div>
      <button
        onClick={() => {
          const s = { ...breakEntryy };
          s.mood = Mood.GOOD;
          setBreakEntryy(s);
          console.log(s);
        }}
      >
        good
      </button>
      <button
        onClick={() => {
          const s = { ...breakEntryy };
          s.mood = Mood.NEUTRAL;
          setBreakEntryy(s);
          console.log(s);
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
