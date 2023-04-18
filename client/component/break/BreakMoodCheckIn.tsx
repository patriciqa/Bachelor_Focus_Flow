import IndexedDb from "@/component/archive/IndexedDb";
import Mood, { Break, PageComponent } from "@/types/Timer";
import { useEffect, useState } from "react";

export default function BreakMoodCheckIn({
  breakEntry,
  setBreakEntry,
  setShowComponent,
}: {
  breakEntry: Break;
  setBreakEntry: (s: Break) => void;
  setShowComponent: (s: PageComponent) => void;
}) {
  return (
    <>
      <div>Break - </div>
      <button
        onClick={() => {
          () => {
            const s = { ...breakEntry };
            s.mood = Mood.GOOD;
            setBreakEntry(s);
          };
        }}
      >
        good
      </button>
      <button
        onClick={() => {
          const s = { ...breakEntry };
          s.mood = Mood.NEUTRAL;
          setBreakEntry(s);
        }}
      >
        neutral
      </button>
      <button
        onClick={() => {
          const s = { ...breakEntry };
          s.mood = Mood.NEUTRAL;
          setBreakEntry(s);
        }}
      >
        bad
      </button>
      <button
        onClick={() => {
          // db.putValue("study", breakEntry);
        }}
      >
        continue
      </button>
    </>
  );
}
