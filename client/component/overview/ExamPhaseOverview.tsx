import { getElement } from "@/db/Actions";
import { ExamPhase, PageComponent } from "@/types/Timer";
import { useContext, useEffect, useState } from "react";
import { OverviewContext } from "../context/OverviewContext";

export default function ExamPhaseOverview() {
  const [phases, setPhases] = useState<ExamPhase[]>();
  const examphases: ExamPhase[] = [];
  const { setShowComponent } = useContext(OverviewContext);

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
      <div>
        {phases !== undefined &&
          phases.map((p) => <div key={p.title}>{p.title}</div>)}
      </div>
      <button onClick={() => setShowComponent(PageComponent.EXAMPHASEINPUT)}>
        Create Phase
      </button>
    </div>
  );
}
