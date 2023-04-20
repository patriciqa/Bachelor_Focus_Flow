import { addElement } from "@/db/Actions";
import { Mood, Study } from "@/types/Timer";
import Link from "next/link";
import { useContext, useEffect } from "react";

export default function StudyMoodCheckIn({
  studyEntryy,
  setStudyEntryy,
}: {
  studyEntryy: Study;
  setStudyEntryy: (s: Study) => void;
}) {
  const getLink = (): string => {
    let url = "";
    if (studyEntryy !== undefined) {
      switch (studyEntryy.mood) {
        case Mood.GOOD:
          url = "/causes/good";
          break;
        case Mood.BAD:
          url = "/causes/bad";
          break;
        case Mood.NEUTRAL:
          url = "/";
          addElement("examPhases", studyEntryy);
          break;
      }
    }

    return url;
  };

  return (
    <>
      <div>Study - {studyEntryy.timer.duration}</div>
      <div>How did your studying go?</div>
      <div className="flex">
        <button
          onClick={() => {
            const s = { ...studyEntryy };
            s.mood = Mood.GOOD;
            setStudyEntryy(s);
          }}
        >
          good
        </button>
        <button
          onClick={() => {
            const s = { ...studyEntryy };
            s.mood = Mood.NEUTRAL;
            setStudyEntryy(s);
          }}
        >
          neutral
        </button>
        <button
          onClick={() => {
            const s = { ...studyEntryy };
            s.mood = Mood.BAD;
            s.causeIds = [];
            setStudyEntryy(s);
          }}
        >
          bad
        </button>
      </div>
      <Link href={getLink()}>Continue</Link>;
    </>
  );
}
