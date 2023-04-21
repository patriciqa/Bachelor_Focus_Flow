import { getElement } from "@/db/Actions";
import { ExamPhase } from "@/types/Timer";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function ExamPhaseOverview() {
  const [phases, setPhases] = useState<ExamPhase[]>();
  const examphases: ExamPhase[] = [];

  const getPhases = async (): Promise<ExamPhase[]> => {
    const a = (await getElement("examPhases", "all").then((result) => {
      return result;
    })) as ExamPhase[];
    return a;
  };

  useEffect(() => {
    getPhases().then((phase: ExamPhase[]) => {
      phase.forEach((p) => {
        examphases.push(p);
        setPhases(phase);
      });
    });
  });

  return (
    <div>
      <div className="bg-tahiti">active:{localStorage.getItem("examId")}</div>
      <div>
        {phases !== undefined &&
          phases.map((p) => <div key={p.title}>{p.title}</div>)}
      </div>
      {/* <button onClick={() => setShowComponent(PageComponent.EXAMPHASEINPUT)}>
        Create Phase TODO
      </button> */}
      
      {/* <Link href="/settings/exam-phase/create">Create Phase</Link> */}
    </div>
  );
}
