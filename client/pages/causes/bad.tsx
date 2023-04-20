import { Study } from "@/types/Timer";
import Link from "next/link";
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
      <div>Why did it go not so well?</div>

      <Link href="/">complete</Link>
    </>
  );
}
