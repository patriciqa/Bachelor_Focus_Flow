import { ExamContext } from "@/component/context/ExamPhaseContext";
import { editElement, getElement } from "@/db/Actions";
import saveToDb from "@/hooks/SaveToDb";
import { Mood, Break, ExamPhase } from "@/types/Timer";
import Link from "next/link";
import { useContext } from "react";

export default function BreakMoodCheckIn({
  breakEntryy,
  setBreakEntryy,
}: {
  breakEntryy: Break;
  setBreakEntryy: (s: Break) => void;
}) {
  const { examPhaseId } = useContext(ExamContext);

  const getLink = (): string => {
    let url = "";
    switch (breakEntryy.mood) {
      case Mood.BAD:
        url = "/mood/extend";
        saveToDb(breakEntryy, false);
        break;
      case Mood.GOOD:
      case Mood.NEUTRAL:
        url = "/";
        saveToDb(breakEntryy, false);
        break;
    }
    return url;
  };
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
      <Link href={getLink()}>continue</Link>
    </div>
  );
}
