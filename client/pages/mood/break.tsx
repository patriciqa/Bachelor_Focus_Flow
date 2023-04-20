import { addElement } from "@/db/Actions";
import Mood, { Break } from "@/types/Timer";
import Link from "next/link";

export default function BreakMoodCheckIn({
  breakEntryy,
  setBreakEntryy,
}: {
  breakEntryy: Break;
  setBreakEntryy: (s: Break) => void;
}) {
  const getLink = (): string => {
    let url = "";
    switch (breakEntryy.mood) {
      case Mood.GOOD:
        url = "/causes/good";
        break;
      case Mood.BAD:
      case Mood.NEUTRAL:
        url = "/";
        addElement("examPhases", breakEntryy);
        break;
    }
    return url;
  };
  return (
    <>
      <div>Break - {breakEntryy.timer.duration} </div>
      <div>How do you feel after {breakEntryy.breakActivity.title}? </div>
      <button
        onClick={() => {
          () => {
            const s = { ...breakEntryy };
            s.mood = Mood.GOOD;
            setBreakEntryy(s);
          };
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
          s.mood = Mood.NEUTRAL;
          setBreakEntryy(s);
        }}
      >
        bad
      </button>
      <Link href={getLink()}>continue</Link>
    </>
  );
}
