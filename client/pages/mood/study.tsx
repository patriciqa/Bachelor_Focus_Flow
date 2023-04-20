import { addElement } from "@/db/Actions";
import Mood, { PageComponent, Study } from "@/types/Timer";
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
          s.causes = [];
          setStudyEntryy(s);
        }}
      >
        bad
      </button>
      <Link href={getLink()}>Continue</Link>;
    </>
  );
}
