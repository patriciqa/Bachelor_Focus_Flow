import { Study } from "@/types/Timer";
import React from "react";

export default function BadCauses({
  studyEntry,
  setStudyEntry,
}: {
  studyEntry: Study;
  setStudyEntry: (s: Study) => void;
}) {
  return (
    <>
      <div>Study - {studyEntry.timer.duration}</div>
      <div>Why did it go not so well?</div>
      {/* {settings.causes.forEach((s) => {
        if (!s.goodCause) {
          <button
            onClick={() => {
              const entry = { ...studyEntry };
              entry.causes = [
                {
                  title: s.title,
                  icon: s.icon,
                  statistic: s.statistic,
                  goodCause: s.goodCause,
                  archived: s.archived,
                },
              ];
              setStudyEntry(entry);
            }}
          >
            {s.title}
          </button>;
        }
      })} */}
      <button onClick={() => {}}>complete</button>
    </>
  );
}
