import { StudyComponent } from "@/types/Components";
import { Study } from "@/types/Timer";
import React from "react";

export default function BadReasons({
  showComponent,
  setShowComponent,
  studyEntry,
  setStudyEntry,
}: {
  showComponent: StudyComponent;
  setShowComponent: (p: StudyComponent) => void;
  studyEntry: Study;
  setStudyEntry: (s: Study) => void;
}) {
  return (
    <>
      <div>Why did it go not so well?</div>

      <button onClick={() => setShowComponent(StudyComponent.NO_COMPONENT)}>
        complete
      </button>
    </>
  );
}
