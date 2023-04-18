import { addElement } from "@/db/Actions";
import Mood, { PageComponent, Study } from "@/types/Timer";
import { useEffect } from "react";

export default function StudyMoodCheckIn({
  studyEntry,
  setStudyEntry,
  setShowComponent,
}: {
  studyEntry: Study;
  setStudyEntry: (s: Study) => void;
  setShowComponent: (s: PageComponent) => void;
}) {
  useEffect(() => {});

  return (
    <>
      <button
        onClick={() => {
          const s = { ...studyEntry };
          s.mood = Mood.GOOD;
          setStudyEntry(s);
        }}
      >
        good
      </button>
      <button
        onClick={() => {
          const s = { ...studyEntry };
          s.mood = Mood.NEUTRAL;
          setStudyEntry(s);
        }}
      >
        neutral
      </button>
      <button
        onClick={() => {
          const s = { ...studyEntry };
          s.mood = Mood.BAD;
          s.causes = [];
          setStudyEntry(s);
        }}
      >
        bad
      </button>
      <button
        onClick={() => {
          console.log(studyEntry);
          switch (studyEntry.mood) {
            case Mood.GOOD:
              setShowComponent(PageComponent.GOODCAUSE);
              break;
            case Mood.BAD:
              setShowComponent(PageComponent.BADCAUSE);
              break;
            case Mood.NEUTRAL:
              setShowComponent(PageComponent.BREAKTIMER);
              addElement("examPhases", studyEntry);
              break;
          }
        }}
      >
        continue
      </button>
    </>
  );
}
