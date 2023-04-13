import IndexedDb from "@/pages/db/IndexedDb";
import Mood, { Break, PageComponent } from "@/types/Timer";

export default function BreakMoodCheckIn({
  db,
  breakEntry,
  setBreakEntry,
  setShowComponent,
}: {
  db: IndexedDb;
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
            if (s.breakActivity) {
              s.breakActivity.mood = Mood.GOOD;
              setBreakEntry(s);
            }
          };
        }}
      >
        good
      </button>
      <button
        onClick={() => {
          const s = { ...breakEntry };
          if (s.breakActivity) {
            s.breakActivity.mood = Mood.NEUTRAL;
          }
          setBreakEntry(s);
        }}
      >
        neutral
      </button>
      <button
        onClick={() => {
          const s = { ...breakEntry };
          if (s.breakActivity) {
            s.breakActivity.mood = Mood.NEUTRAL;
            setBreakEntry(s);
          }
        }}
      >
        bad
      </button>
      <button
        onClick={() => {
          db.putValue("study", breakEntry);
        }}
      >
        continue
      </button>
    </>
  );
}
