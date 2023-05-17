import { getElement } from "@/db/Actions";
import { SettingComponent } from "@/types/Components";
import { ExamPhase, WhichTimer } from "@/types/Timer";
import { useEffect, useState } from "react";
import CreateExamPhase from "./CreateExamPhase";
import EditPhaseView from "./EditPhaseView";
import ModalPage from "./reasons/ModalPage";

export default function ExamPhaseOverview({
  setShowComponent,
  setWhichTimer,
}: {
  setShowComponent: (c: SettingComponent) => void;
  setWhichTimer: (d: WhichTimer) => void;
}) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [phases, setPhases] = useState<ExamPhase[]>();
  const [examPhaseTitle, setExamPhaseTitle] = useState<string | null>();
  const [activePhase, setActivePhase] = useState<ExamPhase>();
  const examphases: ExamPhase[] = [];

  const getPhases = async (): Promise<ExamPhase[]> => {
    const a = (await getElement("examPhases", "all").then((result) => {
      return result;
    })) as ExamPhase[];
    return a;
  };

  useEffect(() => {
    getPhases().then((phase: ExamPhase[]) => {
      phase.forEach((p: any) => {
        examphases.push(p);
        setPhases(phase);
        const today = Math.floor(Date.now());

        if (p.id !== undefined && today > p.startDate && p.endDate > today) {
          localStorage.setItem("examId", p.id.toString());
        }
      });
    });
    const id = localStorage.getItem("examId");
    console.log(id);

    if (id !== "") {
      console.log(id);
      if (id !== null)
        getElement("examPhases", parseInt(id)).then((result: any) => {
          setExamPhaseTitle(result.title);
        });
    }
  }, [phases]); //todo renders too much

  return (
    <div className="flex flex-col">
      <div className="bg-tahiti">
        active:
        {examPhaseTitle !== undefined ? examPhaseTitle : "no active exam phase"}
      </div>
      <div className="flex flex-col">
        {phases !== undefined &&
          phases.map((p) => (
            <button
              key={p.title}
              onClick={() => {
                setActivePhase(p);
                setEditOpen(true);
              }}
            >
              {p.title}
            </button>
          ))}
      </div>
      <button onClick={() => setOpen(true)}>Create Phase</button>
      <ModalPage
        isStudy={false}
        open={open}
        setOpen={setOpen}
        component={
          <CreateExamPhase
            setOpen={setOpen}
            phases={phases}
            setShowComponent={setShowComponent}
            setWhichTimer={setWhichTimer}
          />
        }
      />{" "}
      {activePhase !== undefined && (
        <ModalPage
          isStudy={false}
          open={editOpen}
          setOpen={setEditOpen}
          component={
            <EditPhaseView setOpen={setEditOpen} activePhase={activePhase} />
          }
        />
      )}
    </div>
  );
}
