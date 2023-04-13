import IndexedDb from "@/pages/db/IndexedDb";
import Mood, { PageComponent, Study } from "@/types/Timer";
import { useEffect } from "react";

export default function StudyMoodCheckIn({
  db,
  studyEntry,
  setStudyEntry,
  setShowComponent,
}: {
  db: IndexedDb;
  studyEntry: Study;
  setStudyEntry: (s: Study) => void;
  setShowComponent: (s: PageComponent) => void;
}) {
  return (
    <>
      <button
        onClick={() => {
          const s = { ...studyEntry };
          s.mood === Mood.GOOD;
          setStudyEntry(s);
        }}
      >
        good
      </button>
      <button
        onClick={() => {
          const s = { ...studyEntry };
          s.mood === Mood.NEUTRAL;
          setStudyEntry(s);
        }}
      >
        neutral
      </button>
      <button
        onClick={() => {
          const s = { ...studyEntry };
          s.mood === Mood.BAD;
          setStudyEntry(s);
        }}
      >
        bad
      </button>
      <button
        onClick={() => {
          if (studyEntry.mood === Mood.GOOD) {
            setShowComponent(PageComponent.GOODCAUSE);
          } else if (studyEntry.mood === Mood.BAD) {
            setShowComponent(PageComponent.BADCAUSE);
          } else {
            setShowComponent(PageComponent.BREAKTIMER);
            console.log(studyEntry);
            db.putValue("study", studyEntry);
          }
        }}
      >
        continue
      </button>
    </>
  );
}
